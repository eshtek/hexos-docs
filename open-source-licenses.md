---
title: Open Source Licenses
description: Where to get the source code for open source software that HexOS ships in modified form.
published: true
date: 2026-11-26T00:00:00.000Z
tags:
editor: markdown
dateCreated: 2026-11-26T00:00:00.000Z
---

# Open Source Licenses

HexOS includes open source software. When we ship a modified copy of a program licensed under the GNU General Public License (GPL), we publish the exact source code it was built from.

## Memtest86+

The memory test in HexOS runs [Memtest86+](https://memtest.org), licensed under the GPL version 2. HexOS ships a modified build. It adds a way to save the test result where HexOS can read it after the server restarts, and a way to stop after a set number of passes.

| | |
| --- | --- |
| Version | 9.00-hexos.6 |
| Source code | [memtest86plus-9.00-hexos.6-source.tar.gz](https://downloads.hexos.com/memtest/memtest86plus-9.00-hexos.6-source.tar.gz) |
| SHA-256 | `01836ce49ff04451f8314d0789e68fd85444b12f5a6322089c42ad75a102d5cb` |
| Repository | [github.com/eshtek/memtest86plus](https://github.com/eshtek/memtest86plus), tag `v9.00-hexos.6` |

The archive is the output of `git archive v9.00-hexos.6` from that repository. The original, unmodified Memtest86+ is available from [memtest.org](https://memtest.org).
