# Portfolio Improvement Checklist

Review date: 2026-09-19

This checklist covers all six `qakaio` portfolio repositories. Items are limited to changes that affect security, clone usability, reproducibility, or CI/CD reliability.

## Critical Security

- [ ] Revoke the exposed GitHub personal access token and create a replacement with the minimum required scopes.
- [x] Remove credential-bearing GitHub URL rewrite rules from the local Git configuration.
- [ ] Confirm no replacement token, API key, session cookie, or password is committed to any repository history.
- [ ] Keep `.env` files, test credentials, browser state, reports, and traces ignored in every repository.

## CI/CD Gate

- [x] API testing: recent workflow runs were passing before this review.
- [x] Pentest: recent test and Pages deployment runs were passing before this review.
- [x] Performance testing: repair and verify the JMeter test-file mapping. The corrected workflow passed JMeter, Allure generation, and Pages deployment in run `35440350410`.
- [ ] Playwright: verify the active Chromium workflow completes successfully after the cleanup push; recent scheduled runs were cancelled.
- [ ] AI Playwright testing: verify the active workflow completes after removing the empty Allure environment block and making Ruff rules explicit. The test and Allure jobs passed in the prior run; the new lint-gate run is still in progress.
- [x] Selenium: recent workflow runs were passing before this review.
- [ ] Re-run every workflow from `main` after fixes and require a successful conclusion before calling the portfolio green.
- [ ] Keep report publication jobs dependent on successful test jobs and upload artifacts with `if: always()` only when the result exists.

## Repository-Specific Critical Improvements

### API Testing

- [ ] Align the README project tree and test-count claims with the files actually tracked in the repository.
- [ ] Stop ignoring `package-lock.json`; commit and enforce it with `npm ci` for reproducible installs.
- [ ] Add an explicit contract-test job or remove claims for contract tests that are not present.

### DVWA SQL Injection Pentest

- [ ] Make the test suite skip cleanly when the local DVWA lab is unavailable instead of failing unrelated CI runs.
- [ ] Ensure session identifiers and lab credentials are supplied only through environment variables or local setup, never source files.
- [ ] Keep the README's exploitation scope explicitly limited to the local DVWA target.

### JMeter Performance Testing

- [x] Map workflow inputs to the actual tracked JMX files: smoke, load, and stress.
- [x] Align the npm scripts with the actual JMX filenames.
- [ ] Add a lightweight smoke validation before long load or stress runs and fail with a clear missing-file message.
- [ ] Publish the generated Allure results artifact before report generation and verify the Pages deployment input is non-empty.

### Playwright Automation

- [ ] Verify the active Chromium smoke workflow and eliminate scheduled-run cancellations or document the concurrency policy.
- [ ] Keep browser installation and CI browser selection consistent between the workflow and Playwright configuration.
- [ ] Align README claims with the actual tracked tests and generated report locations.

### AI Playwright Testing

- [ ] Make tests that require `GROQ_API_KEY` skip with a clear message when the secret is unavailable; keep deterministic UI tests runnable without external AI access.
- [ ] Pin Python dependencies with a lock or constraints file for reproducible CI installs.
- [ ] Verify the Allure job receives a non-empty results directory after the test job.

### Selenium

- [ ] Stop ignoring `package-lock.json`; enforce reproducible installs with `npm ci`.
- [ ] Verify browser-driver setup remains self-contained on a clean runner.
- [ ] Align README report and test-count claims with the tracked implementation.

## Release Gate

- [x] All six repositories have clean working trees.
- [ ] All six `main` branches have successful latest CI runs.
- [x] No credential-bearing remote URLs remain in local Git configuration.
- [ ] Token rotation is complete.
- [ ] This checklist is committed to the central Playwright portfolio repository.
