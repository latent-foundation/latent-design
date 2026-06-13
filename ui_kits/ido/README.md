# UI Kit — ido (井戸)

> *A quiet well for thought.*

A local-first knowledge system: notes, wiki, tasks, and goals. The kanji 井戸 ("a water
well") is used architecturally and subtly — depth held quietly below, drawn up on
demand. **This is an interpretation of the brand brief** — the `ido` repo has no
implementation yet, so treat these screens as a design proposal grounded in the
foundations, not a recreation.

## Run
Open `index.html`. Switch sections in the sidebar (`Notes` / `Tasks` / `Goals`),
click notes in the folder tree, follow **linked notes** at the bottom of a note, and
check tasks off in the Tasks view.

## Screens
- **Notes** — sidebar folder tree + reading/editing view with mono metadata, hashtags,
  and bidirectional "linked notes".
- **Tasks** — a task is "a note with a state and a horizon": checkable rows tied to goals.
- **Goals** — milestone cards with quiet progress rails.

## Components
`Icon` (Lucide wrapper), `Sidebar`, `NoteView`, `TaskView`, `GoalView`. Note/task/goal
data lives in `NOTES` / `TASKS` constants in `components.jsx`.

## Brand fidelity notes
- Defaults to the **light (stone/paper) theme** — ido is a writing/knowledge surface,
  the brief's home for the MUJI-adjacent palette. (Swap `data-theme="dark"` on `<html>`
  for the graphite variant.)
- Desktop two-pane app; flat surfaces, hairline borders, no shadows.
- Lucide icons at 1.6 stroke in muted/secondary tones (accent only for the active item).
- Kanji used symbolically, never decoratively; no Japan-theme styling.
- Accent (sand/olive) reserved for active nav, progress, checkbox fill.
- "local · synced" status uses the muted success dot — calm, not chromey.

> Icon substitution: Lucide is a chosen substitute (no icon set exists in the repos) —
> see ICONOGRAPHY in the root README.
