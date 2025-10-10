# How to Contribute

We welcome contributions to the HexOS documentation!  
Whether you have a new guide, found an error you want to correct, here's how to get started:

## Setup

1. **Fork this repository** - Click the "Fork" button in the top right

   <img src="/assets/screenshots/nav-fork.png" alt="Fork button location" width="1000">

2. **Clone your fork locally**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/hexos-docs.git
   cd hexos-docs
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a new branch** from `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b your-feature-name
   ```

## Making Changes

1. Make your changes to the documentation

2. Test locally with `npm run docs:dev`

3. Test your changes don't break the build with `npm run docs:build`

4. Commit your changes with a clear message:
   ```bash
   git add .
   git commit -m "add detailed information for feature/bug fix"
   ```

## Submitting Your Contribution

1. **Push to your fork**:
   ```bash
   git push origin your-feature-name
   ```

2. **Open a Pull Request** against the `dev` branch (not `main`)

3. Fill out the PR template with details about your changes

4. Wait for review and address any feedback

   > **Note:** It may take time for our team to review contributions, so don't worry if your pull request isn't immediately accepted. We appreciate your patience!

## Using GitHub in the Browser

If you prefer to make contributions directly in your browser without cloning the repository, here are some helpful tips:

### Switch to the Dev Branch

Before making any changes, make sure you're working on the `dev` branch:

<img src="/assets/screenshots/branch-select-dev.png" alt="Branch selection dropdown" width="300">

Click the branch selector and choose `dev` before creating or editing files.

### Preview Your Changes with PullPreview

When you open a pull request, our repository automatically generates a live preview of your changes using PullPreview. This lets you see exactly how your changes will look on the live site before they're merged.

#### How to Access Your Preview

1. After opening your pull request, scroll down to the checks section at the bottom
2. Look for the **PullPreview** check in the list
3. Click on **Details** next to the PullPreview check

   <img src="/assets/screenshots/pullpreview-select.png" alt="PullPreview check in PR" width="300">

4. Once the preview is ready, you'll see a success message with a link to your preview site

   <img src="/assets/screenshots/pullpreview-success.png" alt="PullPreview success with link" width="800">

5. Click the **preview link** to open your live preview in a new tab

   <img src="/assets/screenshots/pullpreview-link.png" alt="Click the preview link" width="800">

#### If the Preview Build Fails

Sometimes the preview build might fail. This is usually due to broken links or build errors. Here's how to troubleshoot:

1. Click **Details** on the failed PullPreview check

   <img src="/assets/screenshots/failed-pullpreview-click.png" alt="Failed PullPreview check" width="800">

2. Review the error logs to identify the issue. Common problems include:
   - **Broken links**: Links pointing to pages that don't exist
   - **Dead links**: External URLs that are no longer valid
   - **Build errors**: Syntax errors in markdown or configuration

   <img src="/assets/screenshots/failed-build-dead-links.png" alt="Build failure showing dead links" width="800">

3. Fix the issues in your pull request by making additional commits
4. The preview will automatically rebuild once you push new changes

::: tip
PullPreview can take a minute or two to build. Be patient! If it's taking longer than expected, check the logs by clicking **Details** on the check.
:::

## Need Help?

If you have any questions or need assistance, be sure to check out the [HexOS Community forums](https://hub.hexos.com/) where you can get help from other contributors and the HexOS team.