# Introduction

A HexOS **Install Script** is a JSON document that:
1. Ensures application directories exist (with optional `network_share` and `posix` flags).
2. Applies filesystem permissions (ACL/POSIX).
3. Supplies the final `app_values` object passed into TrueNAS `app.create`.

This makes installs repeatable, portable, and easy to review.
