---
title: Servers
layout: main-layout.11ty.tsx
contentClass: prose
---

# Servers

A list of servers/public APIs I run. Some of these are for personal use and may be password protected, but aside from that, feel free to use them (responsibly!)

## Call of Duty: Modern Warfare 2

Requires the [IW4x](https://iw4x.io/){.external} client.

| Type             | Hostname                                                                                 | Notes         |
|------------------|------------------------------------------------------------------------------------------|---------------|
| Domination       | [bscott-mw2-dom.tuns.sh:28960](iw4x://bscott-mw2-dom.tuns.sh:28960){.external}           |               |
| Domination       | [bscott-mw2-dom-hard.tuns.sh:28963](iw4x://bscott-mw2-dom-hard.tuns.sh:28963){.external} | Hard bots |
| Team Deathmatch  | [bscott-mw2-tdm.tuns.sh:28961](iw4x://bscott-mw2-tdm.tuns.sh:28961){.external}           |               |
| Search & Destroy | [bscott-mw2-sd.tuns.sh:28962](iw4x://bscott-mw2-sd.tuns.sh:28962){.external}             |               |

You can connect to these servers by using the in-game console with the `connect` command, i.e. `connect bscott-mw2-dom.tuns.sh:28960`. The in-game UI might not allow you to type the full hostname and port to favorite, so you'll have to add these entries to the `favorites.json` file manually. *TODO: add full path to this file*