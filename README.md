# MGP

[English](README.md) | [中文](README-zh.md)

A backup for personal CSS and JS files on MGP.

- Personal CSS and JS files for all skins and counterparts, including Vector, MoeSkin and Minerva (removed);
- JS tools.

Now manually syncing with versions on the site.

## How to use
For scripts in [/js](/js), please see [User:GuoPC/js on MGP](https://zh.moegirl.org.cn/User:GuoPC/js) (in Chinese) for more information.

- Through jsDelivr: `https://cdn.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/<filepath>`
  - e.g.: For [/js/BgInfo.js](/js/BgInfo.js):
    - `https://cdn.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/BgInfo.js` for original version;
    - `https://cdn.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/BgInfo.min.js` for minified version.
  - Note: If you cannot access `cdn.jsdelivr.net`, try `fastly.jsdelivr.net` instead, or load through MGP as follows.
- Through MGP: `https://zh.moegirl.org.cn/index.php?title=User:GuoPC/<filepath>&action=raw&ctype=text/javascript` for JS, `https://zh.moegirl.org.cn/index.php?title=User:GuoPC/<filepath>&action=raw&ctype=text/css` for CSS.
