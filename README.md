# HELLCAT — Nine Lives

An original cat-themed retro browser FPS with three sectors and a final boss.

## Project layout

- `dist/`: complete static website, with entry point `dist/index.html`.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.
- `COPILOT-HANDOFF.md`: project-specific migration instructions.
- `PROJECT-NOTES.md`: original implementation and validation notes.

Website: dist/index.html, style.css, app.js, engine.js, render.js, and cover.png. Preserve three sectors, boss, weapons, catnip secrets, pickups, scoring, difficulty, pause, restart, touch controls, and sound. Keep the original project art and code. Do not substitute DOOM assets or claim this contains the original DOOM game. No runtime dependencies, backend, or account sync. Keep pointer-lock mouse look and its drag fallback; pointer lock and audio must start through user interaction.

## Run locally

From this folder with Python 3 installed:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:8000/. On Windows, use `py` instead of `python` if needed. Any static HTTP server works. Do not rely on opening JavaScript modules via file://. There is no npm install, build step, or server API.

## Publish with GitHub Pages

Use a public repository named `hellcat-nine-lives` with default branch `main`. Choose **Settings → Pages → Source: GitHub Actions**. Push the complete folder contents, including the hidden .github directory. The included workflow deploys only dist/. Its deployment environment reports the real website URL after a successful run. Subsequent pushes to main update the site.

The source repository includes supporting work; Pages serves the website folder. Old ChatGPT Sites metadata is intentionally omitted. No credentials are bundled or required as repository secrets.

## Checks

From repository root run node test-game.mjs. In the browser verify starting a campaign, movement, shooting, interactions, mouse-look fallback, pause/retry, and mobile controls. Confirm automated campaigns reach victory and the cover image loads from the repository subpath.

## Deployment reference

[GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
