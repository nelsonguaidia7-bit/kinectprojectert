# Releases

1. Ensure `Studentportfoliositecommunity-main/package.json` version matches the tag (e.g. `1.0.0` → tag `v1.0.0`).
2. Commit and push `main`.
3. Create and push the tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The **Release site** workflow builds the Vite app, attaches `kinectproject-site-<tag>.zip` and `build-info.json` to the GitHub Release, and generates release notes.
