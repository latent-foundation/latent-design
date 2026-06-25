# latent. knowledge architecture — phased plan

How knowledge about the latent. ecosystem gets centralized, and the path from
"docs in a repo" to "queryable live state over MCP." Written to live in
`latent-design` because that repo is the brand/knowledge anchor — this document
is itself the first artifact of the canon it describes.

**TL;DR:** The win is *one canonical location*, not the delivery mechanism. Do
Phase 0 now (free, mostly done). Build the MCP only when you have *dynamic* data
worth querying — which arrives with ido and logos, not with static design docs.

---

## The core distinction

Everything below hinges on splitting "latent. knowledge" into two kinds:

| Kind | Examples | Right delivery |
|---|---|---|
| **Static** | architecture, conventions, design tokens, "how to bootstrap a new app" | flat markdown + CLAUDE.md + skills — the harness reads these for free |
| **Dynamic** | ido tasks/notes, logos market data, "status of X", "what changed last week" | MCP server (tools + resources) |

An MCP server adds **nothing** for static docs *inside Claude Code* — it would
re-deliver text the harness already loads. MCP earns its keep only for the
dynamic half, and only once that half exists.

---

## Phase 0 — single source of truth *(do this regardless)*

**Goal:** one canonical location for ecosystem knowledge. Per-app `CLAUDE.md`
files **point at it** instead of restating it. Zero infrastructure.

**Status:** ~80% done. Knowledge currently lives in:
- `latent.foundation/CLAUDE.md` + `README.md`
- `latent-design/README.md` + `SKILL.md`
- `latent-ui/README.md` + `SKILL.md`
- Claude Code memory (`project-architecture.md`)

The problem isn't missing knowledge — it's that it's **smeared and duplicated**,
so it drifts.

### Target structure

Canon lives in `latent-design` under `docs/` (this file is the first entry):

```
latent-design/
  docs/
    knowledge-architecture.md   ← this file (the meta-plan)
    ecosystem.md                ← the 3-layer model, repos, how sharing works
    conventions.md              ← Rust/Leptos/Trunk conventions, formatting, CI
    bootstrap-new-app.md        ← step-by-step: stand up a new latent. app
    glossary.md                 ← what ido / logos / latent. each mean
  README.md                     ← design system usage (already good)
  SKILL.md                      ← /latent-design skill (already good)
  tokens.css  components.css  fonts/  assets/
```

### The "point, don't restate" rule

Each app's `CLAUDE.md` keeps only what is **specific to that app** and links the
rest. Pattern:

```md
## Architecture
This app follows the latent. ecosystem conventions. The canonical reference is
`latent-design/docs/ecosystem.md` (vendored at `vendor/latent-design/docs/`).

App-specific notes:
- <only the things unique to this repo>
```

Because `latent-design` is already vendored into each app as the
`vendor/latent-design` submodule, the canon ships into every app automatically —
`vendor/latent-design/docs/*.md` is right there in the working tree, readable by
any model or human, no extra wiring.

### Work items

1. Create `latent-design/docs/` with the files above.
2. Move the ecosystem/architecture prose out of each `CLAUDE.md` into
   `docs/ecosystem.md`; replace it in each app with a 3-line pointer.
3. Fold the memory file `project-architecture.md` into `docs/ecosystem.md` so the
   canon — not my private memory — is the source of truth. Keep a one-line memory
   pointer ("ecosystem canon lives in latent-design/docs/").
4. Add a `docs/` reference line to `latent-design/README.md` and `SKILL.md`.

### Why this is enough for a while

Claude Code reads `CLAUDE.md` and vendored files natively. A second engineer,
a fresh clone, or a cold model all get the full picture from flat files in git.
No server to run, nothing to keep alive.

---

## Phase 1 — local stdio MCP *(when dynamic queries appear)*

**Trigger:** you want a model to answer questions that flat docs can't —
"what are my open ido tasks", "what did logos ingest today", "list every project
and its status." That's live state, not canon.

**Shape:** a small MCP server, **stdio transport, no auth, no hosting**, registered
per-project in `.mcp.json`. Runs on demand when an MCP client launches it.

**Language:** Rust, via [`rmcp`](https://github.com/modelcontextprotocol/rust-sdk)
(the official Rust MCP SDK) — fits the Rust-everything ethos and lets the server
share data-access code with the apps it reads from.

### What it exposes

- **Resources** — read-only knowledge addressable by URI. The Phase 0 canon docs
  (`latent://doc/ecosystem`, `latent://doc/conventions`), plus per-project
  snapshots.
- **Tools** — callable queries/actions:
  - `list_projects()` → name, layer, status, repo
  - `get_project_status(name)` → branch, last commit, open work
  - `list_conventions(area)` → the relevant slice of canon
  - *(later)* `query_ido_tasks(filter)`, `search_notes(q)`, `logos_latest(symbol)`

### Registration

```jsonc
// .mcp.json (per repo, or user-level for all of them)
{
  "mcpServers": {
    "latent": {
      "command": "latent-mcp",          // the compiled rmcp binary
      "args": ["--root", "."],
      "transport": "stdio"
    }
  }
}
```

### Effort

A weekend afternoon for the skeleton (resources serving the canon + 2–3 read
tools). The server is just a program — it does not change the apps; it reads them.

---

## Phase 2 — remote, with auth *(only on a concrete trigger)*

**Triggers (any one):** a second device, a non-Claude-Code client, a teammate, or
wanting to hit ido/logos data from your phone.

**Key architectural point:** a stdio server and a remote server **share the same
tool/resource code**. Only two things change:
- **transport** — stdio → Streamable HTTP (SSE transport is deprecated)
- **auth** — none → OAuth 2.1 (the expensive part of "remote")

So Phase 1 is **not throwaway** — it is the core of Phase 2 with a different
wrapper. Don't pay for transport + auth until something forces it.

### Where to host

You already deploy `latent.foundation` to **Cloudflare Pages**. Cloudflare has
the strongest remote-MCP story: Workers + the `agents` framework + a built-in
OAuth provider library that absorbs most of the auth burden. If you go remote,
that's the natural home — it collapses Phase 2 from "stand up an OAuth server"
to "configure one."

### Cost honesty

Remote means: Streamable HTTP transport, an OAuth 2.1 authorization layer, TLS,
a domain, uptime, and keeping the served knowledge in sync. Most of the effort is
auth and ops, not tool code. Worth it only when a real second client exists.

---

## How Phase 0 fits ido — and ido as an MCP server

ido is the local-first **notes / wiki / tasks** app (Tauri + Leptos). It is the
single most natural place in the whole ecosystem for MCP, because **ido's job is
to hold a queryable body of knowledge** — exactly what an MCP server exposes.

### Two convergences

**1. ido's note store *is* the Phase 1 dynamic data.**
The hypothetical `query_ido_tasks` / `search_notes` tools from Phase 1 are really
"ido exposes an MCP server over its own store." Because ido is Tauri, its backend
is already Rust with a data layer over the notes/tasks. An `rmcp` server can sit
**inside or beside that backend and share the exact data-access code** — no second
implementation. ido being local-first means the server is naturally local stdio:
a textbook Phase 1 fit.

**2. The canon could eventually live *in* ido.**
Phase 0's "single source of truth" and ido's wiki are the same shape — a body of
linked markdown. End-state: the latent. canon becomes a set of ido notes, and
ido's MCP serves them. That unifies Phase 0 (static canon) and the ido MCP
(dynamic store) into one surface. **Aspirational, not now** — ido doesn't exist
yet, and bootstrapping canon into a not-yet-built app is a chicken-and-egg. Keep
canon as flat markdown in `latent-design/docs/` until ido is real and trusted.

### ido MCP surface (when ido exists)

Expose the note/wiki/task store as MCP. Sketch:

| Kind | Name | Purpose |
|---|---|---|
| Resource | `ido://note/{id}` | a single note as addressable content |
| Resource | `ido://wiki/{slug}` | a wiki page |
| Tool | `search_notes(query, tags?)` | full-text / tag search over the store |
| Tool | `get_note(id)` | fetch one note + its backlinks |
| Tool | `list_tasks(status?, project?)` | open/done tasks, filterable |
| Tool | `create_note(title, body, tags?)` | write a new note |
| Tool | `link_notes(from, to)` | create a wiki link / backlink |

**Read-only first.** Ship `search_notes` / `get_note` / `list_tasks` before any
write tool — a model that can *read* your wiki is immediately useful and carries
no risk of corrupting the store. Add `create_note` / `link_notes` only once the
read path is trusted, and gate writes behind explicit confirmation.

### Server vs client — don't conflate

- **ido as MCP server** *(this section)* — ido exposes its store so Claude / any
  MCP client can read and eventually write your knowledge base. **This is the
  valuable one.**
- **ido as MCP client** — ido's own in-app AI features call out to external MCP
  tools. Separate, later concern; not part of this plan.

### Sequencing for ido

1. Build ido's core (notes/wiki/tasks, local-first store) — its own track.
2. Add a read-only `rmcp` server over the store → this *is* Phase 1, dogfooded.
3. Register it in `.mcp.json`; query your own wiki from Claude Code.
4. Add gated write tools once read is trusted.
5. *(Aspirational)* migrate the `latent-design/docs/` canon into ido notes; ido's
   MCP now serves both canon and live state. Phase 0 and Phase 1 converge.
6. *(Phase 2, if ever)* wrap the same server in Streamable HTTP + OAuth on
   Cloudflare to reach ido's knowledge from other devices.

---

## Decision summary

| Question | Answer |
|---|---|
| Centralize knowledge? | **Yes, now.** Phase 0, flat markdown in `latent-design/docs/`. |
| Build an MCP for the docs? | **No.** Static canon needs no server inside Claude Code. |
| Build an MCP at all? | **Yes — when dynamic data exists.** First home is ido's store. |
| Self-hosted (stdio) or web (remote+auth)? | **stdio first.** Remote only on a concrete second-client trigger. |
| Language? | **Rust / `rmcp`**, sharing data-access code with the apps. |
| Where does ido fit? | ido's note store is the canonical Phase 1 data source; its MCP server is Phase 1 dogfooded. |

**Order of operations:** Phase 0 now → build ido → ido read-only MCP (= Phase 1)
→ ido write tools → converge canon into ido → remote only if forced.
