// Coach's admin dashboard: signs in to Coach's Supabase with email and password, then asks the `admin` Edge Function
// (coach repo, supabase/functions/admin) for the overview. Only accounts in app_admins get an answer. The URL and key
// below are public by design; the function checks who is asking.
(function () {
  "use strict";

  // Coach's Supabase through this site (next.config.ts): some Indian networks can't look up supabase.co.
  const SUPABASE = "/coach/supabase";
  const KEY = "sb_publishable_GsGoA8-eqGQXW-1iKbl41Q_eXLAzNHi";
  const STORE = "coach-admin-session";

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // ---- Session, kept in this browser only. Storage can throw in private windows; then it lasts the tab.
  let session = null;
  function load() {
    try { session = JSON.parse(localStorage.getItem(STORE) || "null"); } catch { session = null; }
  }
  function save(s) {
    session = s;
    try { s ? localStorage.setItem(STORE, JSON.stringify(s)) : localStorage.removeItem(STORE); } catch { /* the tab keeps it */ }
  }

  // A request that never reached the server says so plainly, not as the browser's "Failed to fetch".
  async function reach(url, init) {
    try { return await fetch(url, init); } catch { throw new Error("Couldn't reach Coach's server. Check the connection and try again."); }
  }

  async function auth(grant, body) {
    const res = await reach(`${SUPABASE}/auth/v1/token?grant_type=${grant}`, {
      method: "POST",
      headers: { apikey: KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error_description || json.msg || "That email and password don't match.");
    return { access: json.access_token, refresh: json.refresh_token, expiresAt: Date.now() + (json.expires_in || 3600) * 1000, email: json.user?.email || "" };
  }

  async function token() {
    if (!session) return null;
    if (Date.now() < session.expiresAt - 60_000) return session.access;
    try {
      save({ ...(await auth("refresh_token", { refresh_token: session.refresh })), email: session.email });
      return session.access;
    } catch {
      save(null);
      return null;
    }
  }

  async function call(body) {
    const t = await token();
    if (!t) { show(); throw new Error("Sign in again."); }
    const res = await reach(`${SUPABASE}/functions/v1/admin`, {
      method: "POST",
      headers: { apikey: KEY, Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (res.status === 403) throw new Error("This account isn't an admin. Add it to app_admins in the SQL editor.");
    if (!res.ok) throw new Error(json.error?.message || `The server answered ${res.status}.`);
    return json;
  }

  // ---- Formatting
  const usd = (n, d = 2) => `$${Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })}`;
  const int = (n) => Number(n || 0).toLocaleString("en-IN");
  const day = (iso) => iso ? new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: iso.length === 10 ? "UTC" : undefined }) : "";
  // RevenueCat's money figures are MRR and revenue. The rest are counts.
  const MONEY = ["mrr", "revenue"];
  const money = (m, currency) => {
    if (!m) return "—";
    if (MONEY.includes(m.id)) return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD", maximumFractionDigits: 0 }).format(m.value);
    return int(m.value);
  };

  const STATE = {
    none: "Not started",
    trial: "Trial",
    comp: "Free Pro",
    active: "Paying",
    grace: "Payment retrying",
    hold: "On hold",
    free: "Free",
  };

  function stateText(u) {
    const name = u.state === "trial" && u.beta ? "Tester's free Pro" : STATE[u.state] || u.state;
    if (u.state === "comp" && !u.endsAt) return `${name}, no end`;
    if (!u.endsAt) return name;
    const left = Math.ceil((new Date(u.endsAt) - Date.now()) / 86_400_000);
    if (u.state === "active") return `${name}, ${u.willRenew === false ? "ends" : "renews"} ${day(u.endsAt)}`;
    return left > 0 ? `${name}, ${left} days left` : name;
  }

  // ---- Views
  function show() {
    const signedIn = !!session;
    $("signin").hidden = signedIn;
    $("board").hidden = !signedIn;
    $("signout").hidden = !signedIn;
    $("refresh").hidden = !signedIn;
    $("who").textContent = signedIn ? session.email : "";
  }

  function tile(label, value, note) {
    return `<div class="tile"><div class="label">${esc(label)}</div><div class="value">${esc(value)}</div>${note ? `<div class="note">${esc(note)}</div>` : ""}</div>`;
  }

  let data = null;

  function renderMoney(d) {
    const days28 = d.spend.days.slice(-28).reduce((s, x) => s + x.costUsd, 0);
    const rc = d.revenue;
    const m = rc?.metrics || {};
    const revenue = m.revenue?.value ?? null;
    const net = revenue === null ? null : revenue - days28;
    $("hero").innerHTML =
      `<div class="label">Revenue minus AI spend</div><div class="hero-value">${net === null ? "—" : esc(new Intl.NumberFormat("en-US", { style: "currency", currency: rc.currency || "USD", maximumFractionDigits: 2 }).format(net))}</div>` +
      `<div class="note">${revenue === null ? "Revenue isn't set up yet." : `Revenue ${esc(money({ ...m.revenue, id: "revenue" }, rc.currency))} less ${esc(usd(days28))} of AI.`}</div>`;
    const known = ["mrr", "active_subscriptions", "active_trials", "new_customers", "active_users"];
    $("tiles").innerHTML =
      known.filter((k) => m[k]).map((k) => tile(m[k].name, money({ ...m[k], id: k }, rc.currency))).join("") +
      tile("AI spend this month", usd(d.spend.monthUsd), `Last month ${usd(d.spend.previousMonthUsd)}`) +
      tile("AI spend a user this month", usd(d.counts.activeThisMonth ? d.spend.monthUsd / d.counts.activeThisMonth : 0), `${d.counts.activeThisMonth} active`);
    $("revenue-note").textContent = d.revenueError
      ? `Revenue: ${d.revenueError}. Add REVENUECAT_V2_KEY and REVENUECAT_PROJECT_ID to the Supabase function secrets.`
      : rc ? `Revenue figures from RevenueCat, in ${rc.currency}.` : "";
  }

  function renderSpend(d) {
    const days = d.spend.days;
    const max = Math.max(0.01, ...days.map((x) => x.costUsd));
    const nice = niceMax(max);
    // Drawn at the box's own width, so its text stays at its real size on a phone.
    const W = Math.max(300, Math.round($("spend-chart").clientWidth - 24)), H = 220, L = 44, B = 24, T = 8;
    const plotW = W - L - 8, plotH = H - B - T;
    const slot = plotW / days.length;
    const bw = Math.min(24, Math.max(2, slot - 2));
    const y = (v) => T + plotH - (v / nice) * plotH;
    const ticks = [0, nice / 2, nice];
    let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="AI spend a day for the last 60 days">`;
    for (const t of ticks) {
      svg += `<line class="grid" x1="${L}" x2="${W - 8}" y1="${y(t)}" y2="${y(t)}"/><text class="axis" x="${L - 6}" y="${y(t) + 4}" text-anchor="end">${esc(usd(t, t < 1 ? 2 : 0))}</text>`;
    }
    days.forEach((x, i) => {
      const cx = L + i * slot + slot / 2;
      const h = Math.max(0, (x.costUsd / nice) * plotH);
      if (h > 0) {
        const top = T + plotH - h, r = Math.min(4, h, bw / 2), x0 = cx - bw / 2;
        // Rounded at the data end, square at the baseline.
        svg += `<path class="bar" d="M${x0},${T + plotH} V${top + r} Q${x0},${top} ${x0 + r},${top} H${x0 + bw - r} Q${x0 + bw},${top} ${x0 + bw},${top + r} V${T + plotH} Z"/>`;
      }
      svg += `<rect class="hit" x="${L + i * slot}" y="${T}" width="${slot}" height="${plotH}" data-i="${i}"/>`;
      if (i === 0 || i === days.length - 1 || i === Math.floor(days.length / 2)) {
        svg += `<text class="axis" x="${cx}" y="${H - 6}" text-anchor="${i === 0 ? "start" : i === days.length - 1 ? "end" : "middle"}">${esc(day(x.day))}</text>`;
      }
    });
    svg += `<line class="base" x1="${L}" x2="${W - 8}" y1="${T + plotH}" y2="${T + plotH}"/></svg>`;
    $("spend-chart").innerHTML = svg;
    $("spend-chart").querySelectorAll(".hit").forEach((r) => {
      const at = (e) => {
        const x = days[Number(r.dataset.i)];
        tip(`${day(x.day)}<br><strong>${usd(x.costUsd, 4)}</strong> · ${int(x.calls)} calls`, e);
      };
      r.addEventListener("mousemove", at);
      r.addEventListener("click", at);
      r.addEventListener("mouseleave", () => ($("tip").hidden = true));
    });
    $("spend-table").innerHTML = `<table class="users"><thead><tr><th>Day</th><th class="num">Spend</th><th class="num">Calls</th></tr></thead><tbody>${days.slice().reverse().map((x) => `<tr><td>${esc(day(x.day))}</td><td class="num">${esc(usd(x.costUsd, 4))}</td><td class="num">${esc(int(x.calls))}</td></tr>`).join("")}</tbody></table>`;
    const models = Object.entries(d.spend.byModelThisMonth).sort((a, b) => b[1] - a[1]);
    $("models").innerHTML = models.length ? models.map(([k, v]) => tile(k.replace(/^claude-/, ""), usd(v), "This month")).join("") : "";
  }

  function niceMax(v) {
    const p = 10 ** Math.floor(Math.log10(v));
    for (const m of [1, 2, 2.5, 5, 10]) if (m * p >= v) return m * p;
    return 10 * p;
  }

  function tip(html, e) {
    const t = $("tip");
    t.innerHTML = html;
    t.hidden = false;
    const x = Math.min(window.innerWidth - t.offsetWidth - 8, e.clientX + 12);
    t.style.left = `${Math.max(8, x)}px`;
    t.style.top = `${e.clientY + 12}px`;
  }

  function renderCounts(d) {
    const c = d.counts, s = c.byState;
    $("counts").innerHTML =
      tile("Users", int(c.users), `${c.newThisMonth} new this month`) +
      tile("Active this month", int(c.activeThisMonth), "Used the coach") +
      tile("Paying", int(s.active + s.grace), s.hold ? `${s.hold} on hold` : "") +
      tile("Trial or tester", int(s.trial + s.none), `${s.none} not started`) +
      tile("Free Pro", int(s.comp)) +
      tile("Free", int(s.free));
  }

  function renderUsers() {
    if (!data) return;
    const q = $("search").value.trim().toLowerCase();
    const rows = data.users.filter((u) => !q || u.email.toLowerCase().includes(q) || (u.username || "").toLowerCase().includes(q));
    $("users").querySelector("tbody").innerHTML = rows.map((u) =>
      `<tr><td><div>${esc(u.email)}</div>${u.username ? `<div class="sub">@${esc(u.username)}</div>` : ""}<div class="sub">Joined ${esc(day(u.joinedAt))}</div></td>` +
      `<td data-label="State">${esc(stateText(u))}</td><td class="num" data-label="Messages">${esc(int(u.monthMessages))}${u.monthPhotos ? ` <span class="sub">+${esc(u.monthPhotos)} photos</span>` : ""}</td>` +
      `<td class="num" data-label="AI cost">${esc(usd(u.monthCostUsd, 3))}</td><td data-label="Last active">${esc(u.lastActiveDay ? day(u.lastActiveDay) : "—")}</td>` +
      `<td class="actions"><select data-id="${esc(u.id)}" aria-label="Free Pro for ${esc(u.email)}"><option value="">Free Pro…</option><option value="60">Give 60 days</option><option value="90">Give 90 days</option><option value="infinity">Give with no end</option>${u.state === "comp" ? `<option value="remove">Take it away</option>` : ""}</select></td></tr>`
    ).join("") || `<tr><td colspan="6" class="sub">No one matches.</td></tr>`;
    $("users").querySelectorAll("select").forEach((s) => s.addEventListener("change", async () => {
      const v = s.value;
      if (!v) return;
      const u = data.users.find((x) => x.id === s.dataset.id);
      const what = v === "remove" ? "take free Pro away from" : v === "infinity" ? "give free Pro with no end to" : `give ${v} days of free Pro to`;
      if (!confirm(`${what[0].toUpperCase()}${what.slice(1)} ${u.email}?`)) { s.value = ""; return; }
      s.disabled = true;
      try {
        await call({ action: "set_pro", user_id: u.id, until: v === "remove" ? null : v === "infinity" ? "infinity" : Number(v) });
        await refresh();
      } catch (e) {
        alert(e.message);
        s.disabled = false;
        s.value = "";
      }
    }));
  }

  const FIELDS = [
    ["pro_enforced", "Paywall on", "bool", "Off, everyone has Pro. Turning it on gives every trial 14 days from now first."],
    ["beta", "Beta", "bool", "On, each new account gets the beta's days of Pro at sign-in. Turn it off at the production launch."],
    ["beta_days", "Beta's days of Pro", "int"],
    ["trial_days", "Trial's days", "int"],
    ["coach_day_messages", "Messages a day", "int"],
    ["coach_day_photos", "Photos a day", "int"],
  ];

  function renderConfig(d) {
    const c = d.config || {};
    $("config").innerHTML = FIELDS.map(([k, label, kind, note]) => kind === "bool"
      ? `<label class="switch"><input type="checkbox" name="${k}" ${c[k] ? "checked" : ""}> ${esc(label)}${note ? `<span class="sub">${esc(note)}</span>` : ""}</label>`
      : `<label>${esc(label)}<input type="number" name="${k}" min="0" value="${esc(c[k] ?? "")}"></label>`).join("") +
      `<div class="full"><button class="pill" type="submit">Save switches</button></div>`;
  }

  async function saveConfig(e) {
    e.preventDefault();
    const c = data?.config || {};
    const change = {};
    for (const [k, , kind] of FIELDS) {
      const el = $("config").elements[k];
      const v = kind === "bool" ? el.checked : Number(el.value);
      if (v !== c[k]) change[k] = v;
    }
    if (!Object.keys(change).length) { $("config-note").textContent = "Nothing changed."; return; }
    if (change.pro_enforced === true && !confirm("Turn the paywall on? Free users lose Pro features past one use a month.")) return;
    try {
      await call({ action: "set_config", change });
      $("config-note").textContent = "";
      await refresh();
    } catch (err) {
      $("config-note").textContent = err.message;
    }
  }

  function render(d) {
    data = d;
    $("generated").textContent = `As of ${new Date(d.generatedAt).toLocaleString("en-GB")}.`;
    renderMoney(d);
    renderSpend(d);
    renderCounts(d);
    renderUsers();
    renderConfig(d);
  }

  async function refresh() {
    $("board-error").textContent = "";
    try {
      render(await call({ action: "overview" }));
    } catch (e) {
      $("board-error").textContent = e.message;
    }
  }

  // ---- Wiring
  $("signin-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    $("signin-error").textContent = "";
    try {
      save(await auth("password", { email: $("email").value.trim(), password: $("password").value }));
      $("password").value = "";
      show();
      await refresh();
    } catch (err) {
      $("signin-error").textContent = err.message;
    }
  });
  $("signout").addEventListener("click", () => { save(null); data = null; show(); });
  $("refresh").addEventListener("click", refresh);
  $("search").addEventListener("input", renderUsers);
  $("config").addEventListener("submit", saveConfig);
  let resized = 0;
  window.addEventListener("resize", () => { clearTimeout(resized); resized = setTimeout(() => data && renderSpend(data), 150); });

  // A preview with made-up figures, for working on the page: window.coachAdminPreview(overview).
  window.coachAdminPreview = (d) => { session = { email: "preview", access: "", refresh: "", expiresAt: Infinity }; show(); render(d); };

  load();
  show();
  if (session) refresh();
})();
