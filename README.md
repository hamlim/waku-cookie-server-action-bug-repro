# Waku Cookie Server Action Bug

Get started with:

- `bun i` to install deps
- `bun run dev` to start the development server

Bug reproduction:

- Visit `localhost:3000`
- Interact with the button
- You should be redirected to `/foo`
- You should see a cookie titled `test` with a value of `test` set


This works as expected if downgraded to v0.25.0