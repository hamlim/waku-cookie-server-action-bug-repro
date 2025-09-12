import type { Hono } from "hono";
import { contextStorage, getContext } from "hono/context-storage";

export { getContext };

export default function honoEnhancer(createApp: (app: Hono) => Hono) {
  if (import.meta.env && !import.meta.env.PROD) {
    let handlerPromise = import("./cloudflare-dev-server").then(
      ({ cloudflareDevServer }) =>
        cloudflareDevServer({
          // Optional config settings for the Cloudflare dev server (wrangler proxy)
          // https://developers.cloudflare.com/workers/wrangler/api/#parameters-1
          persist: {
            path: ".wrangler/state/v3",
          },
        }),
    );
    return (appToCreate: Hono) => {
      appToCreate.use(contextStorage());
      let app = createApp(appToCreate);
      return {
        fetch: async (req: Request) => {
          let devHandler = await handlerPromise;
          return devHandler(req, app);
        },
      };
    };
  }
  return (appToCreate: Hono) => {
    appToCreate.use(contextStorage());
    return createApp(appToCreate);
  };
}
