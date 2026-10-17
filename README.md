# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Production Deployment

This frontend-only site is deployed to the shared DigitalOcean droplet by `.github/workflows/deploy.yml` from `master`. The stable site ID and Compose project are `personal-webpage`; the exact hostname is `www.bzl.no`; the container listens on `127.0.0.1:18080`. The workflow publishes an amd64 image to GHCR by digest and deploys only the release bundle. There is no API, runtime secret, persistent volume, upload store, external service, or database migration for this static site.

Before enabling deployment, configure the GitHub `production` environment with required reviewers and add these repository secrets: `DEPLOY_HOST` (droplet IP), `DEPLOY_SSH_KEY` (private key for the `deploy` account), and `DEPLOY_KNOWN_HOSTS` (the verified SSH host-key line). Set the `DEPLOY_PUBLIC_CHECKS` repository variable explicitly to `true` for normal deployments; `false` is diagnostic mode and skips public smoke tests. The droplet operator must authorize its registry identity to pull the GHCR package and verify port `18080` is unused.

For first issuance, point the `www.bzl.no` A/AAAA records at the droplet and wait for propagation before deployment. Ensure public TCP ports 80 and 443 reach the host Nginx and that no stale AAAA record or proxy/CDN intercepts HTTP-01 validation. The shared host deployment helper, Nginx snippets, TLS provisioning, firewall, and backups are operator-managed; this repository does not bootstrap or modify them. Initial certificate issuance and DNS cutover have not been run from this repository.
