# Avatar generation backend

GitHub Pages can open the camera, but it cannot safely call an image-generation API directly because API keys would be exposed in the browser.

Use `openai-avatar-worker.js` as a small Cloudflare Worker or adapt it for any serverless host.

## Frontend configuration

Set the deployed Worker URL as:

```bash
VITE_AVATAR_API_URL=https://your-worker-url.example.workers.dev
```

For quick browser testing, you can also open DevTools on the deployed site and run:

```js
localStorage.setItem("avatarApiUrl", "https://your-worker-url.example.workers.dev");
```

Then refresh the page.

## Worker secret

Configure this secret in your Worker platform:

```bash
OPENAI_API_KEY=your_api_key
```
