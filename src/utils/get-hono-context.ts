import type { Context } from "hono";
import { getContext } from "#/waku/hono-enhancer";

export function getHonoContext(): null | Context<{ Bindings: Env }> {
  const ctx = getContext();
  if (!ctx) {
    return null;
  }
  return ctx as unknown as Context<{ Bindings: Env }>;
}
