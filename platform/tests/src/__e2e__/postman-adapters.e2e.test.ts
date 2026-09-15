/**
 * Postman-collection 1:1 Vitest tests for adapters (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  lbrEndpointId: "",
  learnerId: "",
  ledgerAdapterId: "",
  limit: "",
  status: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / adapters (1:1 generated)", () => {

  it("listLbrEndpoints", async () => {
    const url = sub("{{baseUrl}}/v1/lbr-endpoints?cursor={{cursor}}&limit={{limit}}&status={{status}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createLbrEndpoint", async () => {
    const url = sub("{{baseUrl}}/v1/lbr-endpoints");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"name\": \"Newman Test\",\n  \"baseUrl\": \"\",\n  \"kind\": \"managed\",\n  \"version\": \"\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['lbrEndpointId'] = j.data.id;
  });

  it("getLbrEndpoint", async () => {
    const url = sub("{{baseUrl}}/v1/lbr-endpoints/{{lbrEndpointId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("updateLbrEndpoint", async () => {
    const url = sub("{{baseUrl}}/v1/lbr-endpoints/{{lbrEndpointId}}");
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"name\": \"Newman Test\",\n  \"baseUrl\": \"\",\n  \"kind\": \"managed\",\n  \"status\": \"healthy\",\n  \"version\": \"\"\n}"),
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("listLedgerAdapters", async () => {
    const url = sub("{{baseUrl}}/v1/ledger-adapters?cursor={{cursor}}&limit={{limit}}&status={{status}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("createLedgerAdapter", async () => {
    const url = sub("{{baseUrl}}/v1/ledger-adapters");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"name\": \"Newman Test\",\n  \"version\": \"\",\n  \"networkId\": \"newman_networkId\",\n  \"commitmentsOnly\": true,\n  \"patchPlaybook\": null\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
    if (j?.data?.id) vars['ledgerAdapterId'] = j.data.id;
  });

  it("getLedgerAdapter", async () => {
    const url = sub("{{baseUrl}}/v1/ledger-adapters/{{ledgerAdapterId}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("getLearnerLbrLinkage", async () => {
    const url = sub("{{baseUrl}}/v1/learners/{{learnerId}}/lbr-linkage");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("setLearnerLbrLinkage", async () => {
    const url = sub("{{baseUrl}}/v1/learners/{{learnerId}}/lbr-linkage");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"lbrEndpointId\": \"lbr_01HZYXK8J0M0W5N6P7Q8R9S0T1U2\",\n  \"platformCustodyNoticeAck\": true,\n  \"runConnectionTest\": true\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
