# Install Scripts Overview

We have consolidated the curation of apps from our codebase to an install script format.  Install scripts let you describe storage, permissions, and app values in one JSON.  We have also brought an interface to the HexOS frontend to help iterate on these apps and allow the community to supply their own curations or amend existing if they would like.  The tools are available now on dev-deck.  Enable dev mode from preferences and you will have access to the "Custom Script" option for installing apps.  You can modify existing curations or create new ones.  Once you are happy, submit it as a PR here https://github.com/eshtek/hexos-docs/tree/main/docs/public/install-scripts.  

**Note**: We're developing a UI for post-install configuration editing.  That piece is depenedent on our Local UI still in active development and will be made avialable then.

See:
- [Quickstart](/install-scripts/quickstart)
- [Authoring Guide](/install-scripts/contributing)
- [Reference: Schema](/install-scripts/reference/schema)
- [Reference: Macros](/install-scripts/reference/macros)
- [Reference: Validation Pipeline](/install-scripts/reference/pipeline)
- [Apps (Curated Scripts)](/install-scripts/curated/)
