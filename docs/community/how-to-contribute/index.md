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

If you prefer to make contributions directly in your browser without cloning the repository, this is the method to contribute. You will need an account on Github and to be logged in.

Click the edit link at the bottom of the docs page

<img width="1674" height="467" alt="Screenshot From 2025-10-20 13-01-32" src="https://github.com/user-attachments/assets/9d12a38e-fa08-4f83-bf7f-39a91c9090a0" />

### Edit on the Dev Branch

Before making any changes, make sure you're working on the `dev` branch. This sould be automatic if you have clicked the edit link as described above.

<img width="753" height="251" alt="Screenshot From 2025-10-20 13-12-49" src="https://github.com/user-attachments/assets/7aee2389-dc8a-43eb-a9f8-c90d6d3dc323" />

If not, Click the branch selector and choose `dev` before creating or editing files.

<img src="/assets/screenshots/branch-select-dev.png" alt="Branch selection dropdown" width="300">

### Make your edit

Edits are done in [markdown](https://www.markdownguide.org/cheat-sheet/) which is a simple way to format text with things like headings and links. When you have made your changes, you can preview using the preview button.

<img width="433" height="249" alt="Screenshot From 2025-10-20 13-08-08" src="https://github.com/user-attachments/assets/cc5a7c1a-f446-4288-9001-063c2744bfe6" />

This will show you roughly what the edit will look like when published, but not everything will be exactly the same, for example some links won't work and image alignment might be different.


<img width="1041" height="765" alt="Screenshot From 2025-10-20 13-08-16" src="https://github.com/user-attachments/assets/89ae341d-c856-4067-a019-ffddde37e28f" />

### Make a pull request

Click make a pull request. This will create a new branch (a version) of the docs on your github.

<img width="646" height="375" alt="Screenshot From 2025-10-20 13-17-54" src="https://github.com/user-attachments/assets/2b819c4b-b1e1-4526-a58d-aafcef3eae42" />

Fill out a description of what you have changed

<img width="1025" height="927" alt="Screenshot From 2025-10-20 13-18-48" src="https://github.com/user-attachments/assets/fc85308d-72ac-4766-a4dd-223e378ef2cf" />

Then create a pull request to the HexOS team

<img width="690" height="390" alt="Screenshot From 2025-10-20 13-20-25" src="https://github.com/user-attachments/assets/6941de9c-f166-4f3b-b9eb-e4b1ab3fac3a" />

The details should automatically be filled out this time

<img width="1570" height="1339" alt="Screenshot From 2025-10-20 13-21-24" src="https://github.com/user-attachments/assets/e365d57c-c398-4b94-b4b1-6671b2a9a5b5" />





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
