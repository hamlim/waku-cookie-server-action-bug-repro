import "../styles.css";
import { setCookie } from "hono/cookie";
import { unstable_redirect as redirect } from "waku/router/server";
import { getHonoContext } from "#/utils/get-hono-context";

async function setCookieAndRedirectAction() {
  "use server";

  let ctx = getHonoContext();

  if (!ctx) {
    throw new Error("Context is null");
  }

  console.log("Setting cookie...");
  setCookie(ctx, "test", "test");
  console.log("Redirecting to /foo...");
  redirect("/foo");
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Home</h2>
      <p>This is the home page.</p>
      <form action={setCookieAndRedirectAction}>
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Set Cookie and Redirect
        </button>
      </form>
    </div>
  );
}

export function getConfig() {
  return {
    render: "dynamic",
  };
}
