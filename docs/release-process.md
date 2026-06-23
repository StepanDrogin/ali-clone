# Release Process

Market Express uses semver tags and GitHub Releases. The release workflow builds the app, runs the audit gate, creates a GitHub Release and triggers the Netlify production build hook.

## Before a Release

1. Merge the release candidate into `main`.
2. Confirm `CI / CD` is green.
3. Run production checks locally when the release touches Prisma, Stripe, auth or deployment code:

```bash
npm install
npm run ci:check
```

4. Add curated notes in `docs/releases/vX.Y.Z.md` when the release deserves a hand-written summary.

## Release by Tag

```bash
git checkout main
git pull
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0
```

The `Release` workflow will create the GitHub Release from the tag.

## Release from GitHub Actions

1. Open GitHub Actions.
2. Select the `Release` workflow.
3. Run workflow from `main`.
4. Enter a version such as `1.1.0` or `v1.1.0`.

The workflow creates the tag if it does not already exist.

## Version Notes

- Use `vMAJOR.MINOR.PATCH`.
- Use prerelease tags such as `v1.1.0-rc.1` only when the release is not meant to be latest stable.
- Keep `CHANGELOG.md` updated with an `Unreleased` section before cutting a release.

## After a Release

Verify:

```text
/
/api/health
/api/prisma/get-all-products
/robots.txt
/sitemap.xml
```

Then confirm the Netlify deploy is marked healthy in the Netlify dashboard.
