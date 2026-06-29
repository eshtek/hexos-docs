---
title: How to Contribute
description: 
published: true
date: 2026-06-29T03:27:40.307Z
tags: 
editor: markdown
dateCreated: 2026-06-08T15:39:34.804Z
---

# How to Contribute

We welcome contributions to the HexOS documentation!  
Whether you have a new guide, found an error you want to correct, here's how to get started:

## Setup

1. **Fork this repository** - Click the "Fork" button in the top right

![nav-fork.png](/nav-fork.png)

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
![0.png](/how to contribute/0.png)

### Edit on the Dev Branch

Before making any changes, make sure you're working on the `dev` branch. This should be automatic if you have clicked the edit link as described above.

![1.png](/how to contribute/1.png)

If not, Click the branch selector and choose `dev` before creating or editing files.

![2.png](/how to contribute/2.png)

### Make your edit

Edits are done in [markdown](https://www.markdownguide.org/cheat-sheet/) which is a simple way to format text with things like headings and links. When you have made your changes, you can preview using the preview button.

![3.png](/how to contribute/3.png)

This will show you roughly what the edit will look like when published, but not everything will be exactly the same, for example some links won't work and image alignment might be different.

![4.png](/how to contribute/4.png)

### Make a pull request

Click make a pull request. This will create a new branch (a version) of the docs on your github.

![5.png](/how to contribute/5.png)

After proposing changes, GitHub will show you the pull request form. Fill out a description of what you have changed and click "Create pull request" to submit it to the HexOS team.

![6.png](/how to contribute/6.png)





### Preview Your Changes with PullPreview

When you open a pull request, our repository automatically generates a live preview of your changes using PullPreview. This lets you see exactly how your changes will look on the live site before they're merged.

#### How to Access Your Preview

1. After opening your pull request, scroll down to the checks section at the bottom
2. Look for the **PullPreview** check in the list
3. Click on **Details** next to the PullPreview check

![7.png](/how to contribute/7.png)

4. Once the preview is ready, you'll see a success message with a link to your preview site

![8.png](/how to contribute/8.png)

5. Click the **preview link** to open your live preview in a new tab

![9.png](/how to contribute/9.png)

#### If the Preview Build Fails

Sometimes the preview build might fail. This is usually due to broken links or build errors. Here's how to troubleshoot:

1. Click **Details** on the failed PullPreview check

![10.png](/how to contribute/10.png)

2. Review the error logs to identify the issue. Common problems include:
   - **Broken links**: Links pointing to pages that don't exist
   - **Dead links**: External URLs that are no longer valid
   - **Build errors**: Syntax errors in markdown or configuration

![11.png](/how to contribute/11.png)

3. Fix the issues in your pull request by making additional commits
4. The preview will automatically rebuild once you push new changes

::: tip
PullPreview can take a minute or two to build. Be patient! If it's taking longer than expected, check the logs by clicking **Details** on the check.
:::

## Need Help?

If you have any questions or need assistance, be sure to check out the [HexOS Discord Community](https://discord.gg/fCW2htvYdz) where you can get help from other contributors and the HexOS team.
