# @veritrace/openapi-core

OpenAPI 3.1 contracts for Veritrace.

| Domain | Spec | Notes |
|--------|------|-------|
| identity | `src/identity.yaml` | Shared auth blueprint |
| spaces | `src/spaces.yaml` | Spaces + necessity + DPIA |
| blocks | `src/blocks.yaml` | Learning blocks + deletion |
| commitments | `src/commitments.yaml` | Opaque chain anchors |
| consents | `src/consents.yaml` | Grants + access requests |
| verifications | `src/verifications.yaml` | Verify + tamper events |
| exports | `src/exports.yaml` | Research ethics exports |
| adapters | `src/adapters.yaml` | LBR + ledger adapters |

```bash
pnpm lint:openapi
pnpm bundle:openapi
```
