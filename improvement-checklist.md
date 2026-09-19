# Recruiter-Ready Portfolio Checklist

Review date: 2026-09-19

Scope: local working copies of all six repositories. The goal is a portfolio that is easy to clone, easy to review, honest about its coverage, and polished enough to demonstrate senior QA engineering judgment.

Repositories in scope:

- `Kaio-QA-portfolio-API-testing`
- `Kaio-QA-portfolio-pentest-dvwa-sql-injection`
- `Kaio-QA-portfolio-performance-test-jmeter`
- `Kaio-QA-portfolio-playwright`
- `Kaio-QA-portfolio-playwright-AI-testing`
- `Kaio-QA-portfolio-selenium`

## Done Locally

- [x] Clone all six repositories into this workspace.
- [x] Remove the Playwright backup config and empty Pages placeholder.
- [x] Remove credential-bearing Git URL rewrites from local Git configuration.
- [x] Confirm all six working trees are clean.
- [x] Repair and verify JMeter file mappings, npm scripts, report conversion, and Java setup.
- [x] Make AI Playwright Ruff rules explicit; tests, lint, Allure, and Pages passed in the verified run.
- [x] Add this checklist to the central Playwright repository.
- [x] Add a consistent `.editorconfig` to all six repositories.
- [x] Add concurrency cancellation and read-only default permissions to all six CI workflows.
- [x] Correct the API README project tree and replace unsupported coverage counts with factual coverage areas.
- [x] Make the Playwright CI smoke job run only `tests/ci-smoke.spec.js`; keep the full suite available for manual runs.
- [x] Give Playwright Pages jobs explicit write permission while keeping the workflow default read-only.
- [x] Run Playwright Allure generation from the bounded smoke suite and serialize Pages deployments.

## Shared Best Practices

### Clone and Run Experience

- [ ] Make every README pass the 60-second test: purpose, prerequisites, install, one test command, expected result, and report command.
- [ ] Add a consistent `Getting Started` section and a small architecture diagram to every repository.
- [ ] Use the repository's committed lockfile and `npm ci` or a pinned Python dependency set in every CI workflow.
- [ ] Add `.env.example` wherever configuration is required; document which values are optional and never commit real secrets.
- [ ] Make test commands work from a clean clone without undocumented global tools.
- [ ] Keep filenames, test names, package names, and README examples consistent.

### Code Quality

- [ ] Remove dead helpers, duplicate fixtures, backup files, placeholder files, unused npm scripts, and stale report directories.
- [ ] Remove commented-out code and replace magic URLs, credentials, timeouts, and selectors with named configuration.
- [ ] Add linting and formatting commands that are deterministic and pass locally and in CI.
- [ ] Prefer focused helpers and page/service objects over repeated setup code.
- [ ] Replace broad exception handling with specific exceptions or documented fallback behavior.
- [ ] Add type checking where the language and framework support it.
- [ ] Keep test data separate from test behavior and make destructive actions explicit.

### Test Engineering

- [ ] Label tests as smoke, functional, contract, security, performance, or exploratory.
- [ ] Add stable assertions for status, schema, business behavior, and useful failure diagnostics.
- [ ] Avoid tests that pass only because failures are swallowed or skipped silently.
- [ ] Quarantine genuinely flaky tests with an issue link and an owner; do not hide ordinary failures with retries.
- [ ] Add negative cases and boundary cases where they demonstrate engineering judgment.
- [ ] Publish concise test evidence: counts, duration, browser/environment, and known limitations.

### CI/CD and Security

- [ ] Pin action major versions deliberately and migrate deprecated Node 20-based actions and `setup-java@v4` warnings.
- [x] Add least-privilege `permissions` blocks to every workflow.
- [x] Use concurrency cancellation for superseded branch runs and document scheduled-run behavior.
- [ ] Upload reports only when they exist; make report publication depend on successful test jobs.
- [ ] Run secret scanning and dependency auditing on every repository.
- [ ] Confirm no API keys, session cookies, passwords, or personal tokens exist in source or Git history.
- [ ] Rotate the exposed GitHub token outside this workspace and use a new minimum-scope credential.

## Repository Cleanup and Improvements

### API Testing

- [x] Reconcile the API README project tree and coverage claims with tracked files.
- [x] Restore `package-lock.json` as an enforced reproducibility contract rather than ignoring it.
- [ ] Either add the claimed contract-test files and schemas or remove unsupported claims.
- [ ] Add one shared API client and schema fixture layer if repeated request setup appears in the tests.
- [ ] Keep Postman evidence, screenshots, and reports only when the README links to them and explains their value.

### DVWA SQL Injection Pentest

- [x] Make the DVWA URL configurable with a request timeout and explicit HTTP failure handling.
- [ ] Add a safe lab preflight that clearly skips when local DVWA is unavailable.
- [ ] Keep session identifiers and credentials environment-only, with a documented local setup path.
- [ ] Separate detection, exploitation evidence, impact, and remediation into an auditable report structure.
- [ ] Add explicit scope and authorization warnings to every executable entry point.
- [ ] Remove any duplicated payload examples or report content that does not support a conclusion.

### JMeter Performance Testing

- [x] Keep smoke, load, and stress inputs mapped to the actual JMX files.
- [x] Generate the HTML dashboard that CI uploads instead of emitting an empty artifact warning.
- [ ] Add a short smoke validation before long runs and fail with a clear missing-file message.
- [ ] Define measurable pass criteria such as error rate, throughput, and percentile latency.
- [ ] Remove the unused Node/npm layer if it does not add value, or make its scripts the supported local entry point.
- [x] Fix the optional `reports/` artifact warning by generating the dashboard.
- [ ] Explain test data volume, environment limits, and why the chosen load profile is representative.

### Playwright Automation

- [x] Remove the unused backup config and empty Pages placeholder.
- [x] Confirm the Chromium smoke workflow passes after restricting it to `tests/ci-smoke.spec.js` and document the reason for running only Chromium in CI. Run `35442187784` passed smoke, Allure, and both Pages deployments.
- [x] Add concurrency control so scheduled runs do not overlap or cancel without explanation.
- [ ] Replace duplicated selectors and actions with a small, clearly named page-object layer.
- [ ] Align README test counts, browser claims, report paths, and live Pages links with the repository.
- [ ] Keep one intentionally failing demonstration test only if it is isolated from the normal CI suite and clearly labeled.

### AI Playwright Testing

- [x] Keep deterministic UI tests and AI-dependent showcase tests distinguishable.
- [ ] Skip AI-dependent cases with a clear reason when `GROQ_API_KEY` is absent; never turn missing credentials into silent passes.
- [ ] Add a pinned Python lock or constraints file and document the supported Python version.
- [ ] Move model name, timeout, and retry policy into typed configuration.
- [ ] Add tests for malformed model output, rate limits, empty responses, and fallback selectors.
- [ ] Remove showcase code that duplicates production helpers or does not demonstrate a measurable AI benefit.

### Selenium

- [x] Restore and enforce `package-lock.json` for `npm ci` reproducibility.
- [ ] Verify browser and driver setup on a clean runner without hidden local dependencies.
- [ ] Extract repeated login, navigation, and cleanup behavior into page objects or fixtures.
- [ ] Add explicit waits for state changes and remove arbitrary sleeps.
- [ ] Align README claims, screenshots, report links, and test counts with tracked implementation.

## Recruiter Presentation Gate

- [ ] Every repository has one obvious value proposition in the first README paragraph.
- [ ] Every repository shows the engineering pattern it demonstrates, not just a list of tools.
- [ ] Every repository includes one representative test walkthrough and one failure/debugging example.
- [ ] Every repository has honest limitations and a clear next improvement.
- [ ] No repository contains visible personal data, tokens, stale generated output, or unexplained placeholders.
- [ ] A recruiter can clone any repository and reach a meaningful test result using only the README.
- [ ] CI badges, test counts, and report links are current and truthful.

## Final Local Gate

- [ ] All six repositories have clean working trees.
- [ ] All six primary CI workflows have successful latest runs.
- [ ] Local remotes contain no credentials.
- [ ] Secret rotation is complete.
- [ ] README, code, tests, and CI tell the same story.
