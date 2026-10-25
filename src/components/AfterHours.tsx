import type { Entry } from "@/lib/content";

const DEVANAGARI = /[ऀ-ॿ]/;

export const hasHindi = (text: string) => DEVANAGARI.test(text);

export const pieceHref = (e: Entry) => `/after-hours/${e.kind}/${e.slug}`;
