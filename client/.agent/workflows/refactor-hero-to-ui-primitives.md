---
description: Frontend UI Goals
---

Goal: Refactor Hero.jsx to use src/ui primitives while keeping UI identical.

Context:
- Stack: React + Vite + JS + Tailwind + DaisyUI
- Router: React Router v7 (Link from 'react-router')
- Existing Hero uses DaisyUI classes and react-icons.
- Must preserve layout, spacing, and visuals.

Steps:
1) Check if these files exist; if not, create minimal versions first:
   - src/ui/Button.jsx (supports `to` prop -> renders Link from 'react-router'; supports variant/size/className)
   - src/ui/Badge.jsx (DaisyUI badge wrapper)
   - src/ui/StatCard.jsx (value + label)
2) Update Hero.jsx:
   - Replace inline badge span with <Badge variant="primary" className="gap-2">...</Badge>
   - Replace the two RouterLink buttons with <Button to="...">...</Button>
   - Replace stats map content with <StatCard value= label= />
   - Remove RouterLink import if no longer needed
3) Ensure the app builds and no imports break.
4) Show a concise diff summary (files changed and what changed).