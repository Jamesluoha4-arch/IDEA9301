# AI Second Self Prototype

This is a GitHub Pages-ready copy of the interactive iPhone prototype.

## Local preview

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload or push this folder's contents to the repository.
3. In GitHub, go to **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Push to the `main` branch.

The included workflow at `.github/workflows/deploy-pages.yml` will build and publish the static site automatically.

## Notes

- The original project folder was not modified.
- This copy uses a pure Vite static entry so it can be hosted on GitHub Pages.
- The deployed build uses relative asset paths, so it works under a repository subpath such as `https://username.github.io/repo-name/`.
