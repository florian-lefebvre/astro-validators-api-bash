# Astro validator playground

This repository is a runnable starter for experimenting with the validator APIs in [Astro PR #17892](https://github.com/withastro/astro/pull/17892) and [roadmap PR #1438](https://github.com/withastro/roadmap/pull/1438). It includes content collections that use Zod and Valibot, examples of image and reference helpers, JSON Schema generation, and action input parsing.

## Run the starter

You need Node.js 22.23.4 or later and npm.

1. Install dependencies with `npm install`.
2. Generate the content types with `npm run astro sync`.
3. Start the site with `npm run dev`.
4. Open the local URL printed by Astro.

## Explore the examples

- `src/content.config.ts` defines the collections. Compare Zod and Valibot schemas, the transform-based `image()` and `reference()` helpers, and the legacy Zod schema signatures.
- `.astro/content.d.ts` shows the generated content types. Run `npm run astro sync` to create it. The file maps each collection name to inferred data instead of declaring the full content API.
- `src/content/` contains sample entries for each collection. Edit a field or add an entry to try validation and type inference.
- `src/actions/index.ts` defines JSON and form actions. The JSON action uses Valibot. Compare the form action that parses `FormData` with the preview `parseFormData()` helper and the deprecated Zod `input` schema.
- `src/pages/index.astro` renders entries from each collection and forms that call the sample form actions. These actions return parsed data. They do not store or send feedback.
- `settings` is a JSON-backed collection. Zod, Valibot, and other validators can expose JSON Schema through Standard Schema's JSON Schema capability. Astro generates `.astro/collections/settings.schema.json` for this Zod schema. The Valibot schemas in `authors` and `valibotPosts` demonstrate that validation works even when the validator does not provide JSON Schema generation.

## Share feedback

These APIs are proposals and can change before release. To share feedback, open a comment on [Astro PR #17892](https://github.com/withastro/astro/pull/17892). Include the validator, the example you tried, what you expected, and what happened. A small reproduction helps identify API and type inference issues.

See the [validator RFC](https://github.com/withastro/roadmap/pull/1438) for the proposal and open questions.
