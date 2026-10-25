---
title: "Git Merge: A to Z"
date: "2025-04-02"
summary: "Learn the essentials of Git merging, including when to merge vs rebase, handling conflicts, and preserving history for smoother version control"
tags: ["GitHub","Git","GitLab","merge-conflict"]
canonical: "https://tech.anantdubey.com/git-merge"
---

Merging in Git sounds simple, and it _can_ be…but if you've ever ended up in a weird conflict, a detached HEAD, or a tangled rebase, you know it's not always smooth.

This post is a practical guide to **merging in Git**, covering what it actually does, when to use it, how it compares to rebase, and what to do when things go wrong.

## What is a Merge, really? 🤨

In Git, merging is how you take changes from one branch and combine them into another.

```
git checkout main
git merge feature/login-page
```

This tells Git: “Take everything from `feature/login-page` and bring it into `main`.”

Behind the scenes, Git tries to find a **common ancestor** of the two branches, figures out the differences, and applies the changes. If nothing conflicts — you're golden.

* * *

## Types of Merges

### 1\. Fast-Forward Merge

Happens when the branch you're merging into is directly behind the other one. No actual “merge commit” is needed.

```
# main is behind feature
git checkout main
git merge feature
```

Result: `main` just moves its pointer forward. That’s it.

> 🔍 Tip: You can force Git to _not_ fast-forward and create a merge commit:

```
git merge --no-ff feature
```

Useful for preserving the branch history explicitly.

💡

**Preserving branch history** means keeping a clear, visible record of where a branch came from and how it was merged into the main codebase, usually by creating a merge commit instead of squashing or fast-forwarding, so the full development path stays in the Git log.

### 2\. **Three-Way Merge**

If the target branch has diverged, Git creates a merge commit. This is what you usually see in shared repos:

```
git checkout main
git merge feature
# creates a merge commit
```

This merge commit has **two parents**, connecting the branches.

**A bit more on three-way merge in detail:**

When you do a **three-way merge** in Git, it means the two branches you're trying to combine, for example, `main` and `feature`, have diverged. They’ve both had new commits since their common ancestor.

Git then performs a three-way comparison:

1.  The common ancestor commits
    
2.  The latest commit on `main`
    
3.  The latest commit on `feature`
    

It uses these to generate a new commit that brings both branches together. This is the **merge commit**, and it has **two parent commits**: one from `main`, one from `feature`.

This merge commit acts as a clear record in the Git history that the two lines of development were combined at that point, preserving the full history of both branches. This is especially useful in collaborative projects, where seeing the origin of a feature or bugfix matters later on.

It’s the opposite of a **fast-forward merge**, which just moves the pointer forward and skips the merge commit because there was no divergence.

* * *

## Merge 🆚 Rebase

### What is Rebase (Really)?

`git rebase` lets you **move the base of your current branch to a new starting point**, usually to sync with the latest changes from another branch like `main`.

Instead of merging and creating a new commit that combines both histories (like `git merge`), rebase **replays your commits one by one** on top of the latest changes.

### Example

Let’s say your branch history looks like this:

```
A---B---C  (main)
     \
      D---E---F  (feature)
```

You run:

```
git checkout feature
git rebase main
```

Now Git will:

1.  Take your commits `D`, `E`, and `F`
    
2.  “Replay” them on top of `C` (the latest on `main`)
    

Result:

```
A---B---C---D'---E'---F'  (feature)
```

Your feature branch is now cleaner and sits _on top_ of `main`, as if you started from the latest `main` from the beginning.

_Let’s clear this up ——— same goal, different methods:_

**Command**

**What It Does**

**History**

`git merge`

Combines branches with a new merge commit

Keeps both branch histories

`git rebase`

Moves your commits on top of another branch

Creates linear history, rewrites commit

### **Why Rebase?**

*   **Keeps history clean** and linear
    
*   **No extra merge commits**
    
*   Makes it look like your work was built on top of the latest code all along
    

Great for personal branches or PRs you haven’t pushed yet.

💡

Rebasing **changes commit hashes**, because it’s creating _new_ commits with the same changes. So: 1. Never rebase a branch that other people are already working off of or have pulled. 2. Use it for local cleanup, not for shared history.

* * *

## Handling Merge Conflicts 🧨

You’ll eventually hit this:

```
CONFLICT (content): Merge conflict in lib/ui.dart
Automatic merge failed; fix conflicts and commit the result.
```

### Steps:

Git marks conflict areas like this:

```
<<<<<<< HEAD
code from current branch
=======
code from merging branch
>>>>>>> feature-branch
```

Manually fix the file.

```
# Stage it:
git add lib/ui.dart
# Complete the merge:
git commit
```

**!** You can also abort a merge entirely:

```
git merge --abort
```

### Merge Strategy Options

Rarely used, but good to know:

*   `--strategy=recursive` (default)
    
*   `--strategy=ours` – Favor your branch in conflicts
    
*   `--strategy=theirs` – Favor incoming branch (use with caution)
    

Example:

```
git merge feature --strategy=ours
```

* * *

## Merge Workflows in Real Projects

### 🚀 Feature Branch Flow

*   Devs create a feature branch
    
*   Open PRs
    
*   Merge to `main` (with `--no-ff` or via GitHub squash/merge)
    

This keeps `main` clean and stable.

### 📦 Release Branch Flow

*   Merge `main` into `release-v1.0`
    
*   Cherry-pick hotfixes into both `main` and `release-v1.0`
    

* * *

## Merge vs Squash vs Rebase in PRs

On GitHub, you’ll see:

*   **Merge Commit**: Keeps full branch history
    
*   **Squash and Merge**: Combines all feature branch commits into one
    
*   **Rebase and Merge**: Replays commits for linear history
    

Each has trade-offs. Squashing keeps history clean but loses individual commits. Rebase keeps order but changes hashes.

* * *

## Merge Mistakes and How to Fix

### 1\. **Merged the wrong branch?**

```
git reset HEAD~1
```

### 2\. **Conflict hell?**

```
git merge --abort
```

Or nuke and pull fresh:

```
git reset --hard origin/main
```

### 3\. **Stuck in merge with uncommitted changes?**

```
git stash
git merge branch
```

* * *

## Here’s a complementary Git Cheat Sheet 🎀

[![Git Cheat Sheet](https://cdn.hashnode.com/res/hashnode/image/upload/v1743532126046/60449ea3-1251-4741-ad60-eb1816535aeb.jpeg)](https://education.github.com/git-cheat-sheet-education.pdf)

[![Git Cheat Sheet](https://cdn.hashnode.com/res/hashnode/image/upload/v1743532167579/cf65973c-aa22-41f2-8ed2-11ad8ceb82e0.jpeg)](https://education.github.com/git-cheat-sheet-education.pdf)

[Link](https://education.github.com/git-cheat-sheet-education.pdf) 👈 to the original PDF in case these images don’t load.

## Final Thoughts

Merging in Git isn’t rocket science…but it gets tricky fast when you're juggling branches, features, hotfixes, and multiple devs.

If you keep these things in mind:

*   Know when to merge vs rebase
    
*   Don’t fear merge conflicts, just learn to resolve them
    
*   Use `--no-ff` to make merge history explicit
    
*   And always keep your `main` branch clean and deployable
    

…you’ll be fine.

**Got a Git horror story or a tip? Drop it in the comments.**

Happy merging 👊

* * *

## **Thank you**

Did you reach the bottom? **_Thank you for reading!_**

Feel free to [**connect with me**](https://www.anantdubey.com/). 👋