---
description: Refactor to UI Primitives
---

Refactor the selected component file to use UI primitives from src/ui/.

Steps:
1. Identify all inline buttons, badges, inputs, cards
2. Replace with appropriate primitives:
   - Buttons → <Button variant size to/href>
   - Badges/labels → <Badge variant>
   - Stats/metrics → <StatCard value label>
   - Form inputs → <Input label error>
   - Containers → <Card variant>
3. Preserve all styling, layout, functionality
4. Update imports
5. Show diff for review

Do NOT change unrelated code. Keep DaisyUI theme classes intact.
