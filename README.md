# Nourish — AI Food Planner

A responsive meal planning app built with Next.js, TypeScript, Tailwind CSS, and a server-side OpenAI API route. It works without an API key using a realistic sample meal plan. Profile and meal choices are saved in browser local storage in this development version.

## Start locally

Install Node.js 18.17 or newer, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To enable personalized AI plans, create `.env.local` in the project root:

```env
OPENAI_API_KEY=your_key_here
```

The key is read only by `app/api/plan/route.ts`; never add it to a `NEXT_PUBLIC_` variable. Without it, the API returns the built-in sample plan. The route validates model output with Zod before returning it.

## Included

- Dashboard, daily plan, weekly view, grocery list, and editable profile
- Calorie estimate using Mifflin–St Jeor BMR, activity level, and goal adjustment
- Per-meal refresh, save and completion controls, grocery checkboxes, and water tracking
- Mocked sign-in gate for a no-setup development experience
- Responsive layouts for mobile, tablet, and desktop

The calorie target is an estimate and is not medical advice. People with medical conditions, eating disorders, pregnancy, or specific nutrition needs should consult a qualified healthcare professional.

## Persistence and data

This starter stores editable profile and meal plan data in local storage, so it is suitable for a single-user development experience. Authentication is mocked. For multi-user deployment, replace local storage with authenticated persistence and migrations. `prisma/schema.prisma` documents the intended relational SQLite model for users, profiles, plans, meals, grocery lists, items, and saved meals.
