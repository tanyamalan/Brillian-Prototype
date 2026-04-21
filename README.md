# Brillian prototype

SMB valuation dashboard + onboarding flow. **Not production** — built to validate the UX with the team.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173. Node 20+.

## Stack

React 19 · Vite · Chakra UI v3 · lucide-react · TypeScript

## Where things live

```
src/
├── App.tsx                       # Routes between Dashboard and Onboarding page; mounts the
│                                 # slide-up onboarding form as a Chakra Drawer overlay.
├── main.tsx                      # React entry + AppProvider (Chakra system).
├── theme/
│   ├── system.ts                 # Colors, spacing, shadows, radii, button recipe.
│   └── Provider.tsx              # ChakraProvider wrapper.
├── components/
│   ├── shared/
│   │   ├── AppShell.tsx          # Two-column layout (sidebar + content).
│   │   ├── AppSidebar.tsx        # Left nav with expandable sub-items.
│   │   ├── AppTopbar.tsx         # Search, notifications, user avatar.
│   │   └── navConfig.ts          # Nav items data (icons, labels, children).
│   ├── Dashboard/
│   │   ├── Dashboard.tsx         # Composes the four sections below.
│   │   ├── GoalBanner.tsx        # Goal + progress bar + "Complete Setup" CTA.
│   │   ├── ValuationCard.tsx     # $2.4M headline + 3 KPI metric cards.
│   │   ├── OpportunitiesCard.tsx # Top gaps list with annual/EV values.
│   │   └── BenchmarksGrid.tsx    # 3 peer-comparison cards with bar charts.
│   ├── OnboardingPage/
│   │   └── OnboardingPage.tsx    # "Get started" screen — 5 step cards.
│   ├── Onboarding/               # Multi-step setup form (opened as a Drawer).
│   │   ├── Onboarding.tsx        # State, validity, topbar, footer, mobile drawer.
│   │   ├── OnboardingRail.tsx    # Left progress rail (8 steps with dots).
│   │   ├── DidYouKnow.tsx        # Collapsible sidebar tip card.
│   │   ├── ExitDialog.tsx        # "Save & exit?" confirmation modal.
│   │   ├── checkValidity.ts      # DOM-scraping validator for "Save and continue".
│   │   └── steps/                # The 8 step forms (BusinessBasics, RevenueProfit, …).
│   └── ui/                       # Shared primitives.
│       ├── Card.tsx              # White card with our shadow + radius.
│       ├── CurrencyInput.tsx     # Input with "$" prefix.
│       ├── RadioCardGrid.tsx     # Grid of selectable radio cards.
│       ├── CheckboxGrid.tsx      # Grid of checkbox cards.
│       └── StepLayout.tsx        # FormCard + FormField + StepHeader helpers.
```

## Known limits

- Validity check on the onboarding form uses live DOM scraping rather than controlled form state.
- No client-side router; views switch via local state in `App.tsx`.
- No persistence; refreshing loses all entered data.
- Mock data throughout — no API calls.

## Deploying

```bash
npm run build
```

Output goes to `dist/`. Drag-and-drop to Vercel, Netlify, or any static host.
