---
name: veritrace-codegen-local
description: >-
  Keep .codegen local-only for Veritrace. Use when cloning, syncing zero-codegen,
  running pnpm codegen:*, or before git commit/push involving codegen.
---

# Veritrace — `.codegen` is local only

## Never commit or push `.codegen/`

The zero-codegen Python tool under `.codegen/` is **not** part of the GitHub repo. It is listed in `.gitignore` and enforced by `.cursor/rules/codegen-not-committed.mdc`.

## Sync from scaffold

```bash
rsync -a --exclude node_modules --exclude .git \
  /path/to/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
# Apply product scope patches if needed (@veritrace), then:
pnpm codegen:paths
```

## After OpenAPI edits

1. `pnpm lint:openapi && pnpm bundle:openapi`
2. Mode B: `pnpm codegen:core` then handwrite platform layers
3. Mode A (new domain only): full `generate --domain X`
4. Never stage `.codegen/` or `packages/openapi-core/src/.bundled/`
