# Snyk Security Scan GitHub Action

This workflow (`snyk-scan.yml`) runs Snyk security scans on every pull request to detect vulnerabilities in both your code and dependencies. It uploads the results to GitHub's Security tab for review.

## What It Does

- **Checks out the repository code**
- **Installs Node.js dependencies**
- **Runs Snyk code test**: Static code analysis for security vulnerabilities
- **Runs Snyk test**: Scans dependencies for known vulnerabilities
- **Normalizes SARIF output**: Ensures license findings have a defined severity
- **Uploads results**: Sends both code and dependency scan results to GitHub Code Scanning

## How to Use

1. Ensure your repository has a Snyk account and a `SNYK_TOKEN` secret set in GitHub Actions secrets.
2. The workflow will run automatically on every pull request.
3. Review security findings in the GitHub Security tab.

## File Reference

- **Workflow file:** `.github/workflows/snyk-scan.yml`
- **Runs on:** `pull_request`
- **SARIF outputs:** `snyk-code.sarif` (code), `snyk-deps.sarif` (dependencies)

## Customization

- To run on other events (e.g., `push`), edit the `on:` field in the workflow file.
- To add autofix or issue creation, see the project root for additional workflow examples.

---

For more details, see [Snyk documentation](https://docs.snyk.io/) and [GitHub Code Scanning](https://docs.github.com/en/code-security/code-scanning).
