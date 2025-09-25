# HexOS Documentation
This repo contains the docs for guides, install scripts, and more. 

## Quick start
```bash
npm i
npm run docs:dev
```

## Build
```bash
npm run docs:build
```

## Contributing

We welcome contributions to the HexOS documentation!  
Here's how to get started:

### Setup

1. **Fork this repository** - Click the "Fork" button in the top right
2. **Clone your fork locally**:

    ```bash
   git clone https://github.com/YOUR_USERNAME/hexos-docs.git
   cd hexos-docs
   ```

4. **Install dependencies**:

   ```bash
   npm i
   ```

5. **Create a new branch** from `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b your-feature-name
   ```

### Making Changes

1. Make your changes to the documentation
2. Test locally with `npm run docs:dev`
3. Commit your changes with a clear message:
 
   ```bash
   git add .
   git commit -m "Add guide for XYZ feature"
   ```

### Submitting Your Contribution

1. **Push to your fork**:

    ```bash
   git push origin your-feature-name
   ```

3. **Open a Pull Request** against the `dev` branch (not `main`)
4. Fill out the PR template with details about your changes
5. Wait for review and address any feedback

Questions? Open an issue or reach out to the [@cole](https://hub.hexos.com/profile/27801-csmanel/)!
