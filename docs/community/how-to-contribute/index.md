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

## Need Help?

If you have any questions or need assistance, be sure to check out the [HexOS Community forums](https://hub.hexos.com/) where you can get help from other contributors and the HexOS team.