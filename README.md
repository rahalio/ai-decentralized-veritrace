# Veritrace

Privacy-preserving learning-analytics integrity layer: learners keep activity traces in their own Learning Block Repository (LBR); researchers verify untampered data against optional on-chain hash commitments.

**Product specs:** [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

Package scope: **`@veritrace/*`**

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  → generated API clients + feature scaffolds
```

## Prerequisites

- Node ≥ 20, pnpm ≥ 9
- Local `.codegen/` synced from `zero-apps-codegen-scaffold` (never committed — see `.cursor/rules/`)

```bash
rsync -a --exclude node_modules --exclude .git \
  /path/to/zero-apps-codegen-scaffold/.codegen/ ./.codegen/
```

## Quick start

```bash
pnpm install
pnpm codegen:paths
pnpm lint:openapi && pnpm bundle:openapi
pnpm build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: veritrace_demo_local_dev_key
```

Optional Dynamo Local:

```bash
docker compose up -d
TABLE_NAME=veritrace-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules

1. **New domain** → full multi-layer `generate --domain X` (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.

See `.cursor/skills/` and `docs/CODEGEN.md`.
