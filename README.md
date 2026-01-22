# HexOS Documentation

This repository contains the official HexOS documentation including guides, install scripts, and more.

## Table of Contents

- [HexOS Documentation](#hexos-documentation)
  - [Table of Contents](#table-of-contents)
  - [Quick Start](#quick-start)
  - [Build](#build)
  - [Contributing](#contributing)
    - [Contributing Guide](#contributing-guide)
      - [Setup](#setup)
      - [Making Changes](#making-changes)
      - [Submitting Your Contribution](#submitting-your-contribution)
      - [Project Structure](#project-structure)
      - [Guidelines](#guidelines)
  - [Get Help](#get-help)

## Quick Start

```js
npm install
npm run docs:dev
```

## Build 

```js
npm run docs:build
```

## Contributing

**Interested in contributing?**  
We'd love your help improving the HexOS documentation!

### Contributing Guide

We welcome contributions to the HexOS documentation!  
Here's how to get started:

#### Setup

1. **Fork this repository** - Click the "Fork" button in the top right
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

#### Making Changes

1. Make your changes to the documentation
2. Test locally with `npm run docs:dev`
3. Test your changes don't break the build with `npm run docs:build`
4. Commit your changes with a clear message:
   ```bash
   git add .
   git commit -m "add detailed information for feature/bug fix"
   ```

#### Submitting Your Contribution

1. **Push to your fork**:
   ```bash
   git push origin your-feature-name
   ```

2. **Open a Pull Request** against the `dev` branch (not `main`)
3. Fill out the PR template with details about your changes
4. Wait for review and address any feedback

#### Project Structure

```
docs/
├── about-hexos/             # About HexOS documentation
├── blog/                    # Blog posts and updates
├── community/               # Community guides and contribution info
├── features/                # Feature documentation
├── getting-started/         # Getting started guides
├── release-notes/           # Release notes and changelogs
├── troubleshooting/         # Troubleshooting guides
└── index.md                 # Homepage
```

#### Guidelines

- Keep documentation clear
- Test all code examples before submitting
- Follow the existing documentation structure and style
- Create issues for major changes before starting work


## Get Help

- **Found a bug in the docs?** [Open an issue](https://github.com/Eshtek/hexos-docs/issues)
- **Need help with HexOS?** Visit the [HexOS Community](https://hub.hexos.com/) or contact support directly at support@hexos.com
