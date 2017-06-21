<div align="center">
  <a href="https://github.com/sebastianvera/nosey">
    <img width="200" heigth="200" src="https://github.com/sebastianvera/nosey/raw/master/images/noseysquare.png">
  </a>
  <br>
  <br>
  <hr>
  <p>
    Chrome extension that makes simple to browse used libraries/plugins in source code files.
  <p>
  <hr>
</div>

### Motivation

It's very common for me to google for libraries when I'm surfing through source code on github, and since I'm lazy,
I made this extension.

### Support

#### Github

Language   | Supported | Notes
---        | ---       | ---
Javascript | ✔         | `require` and `import` are supported.
Vim        | ✔         | Works only for `*.vim` files. `vim-plug` and `vundle` are supported.
Go         | ✔         | `single`, `grouped`, `named`, `.` and `_` imports are supported.
Ruby       | ✖️         |
Elixir     | ✖️         |

### TODO

- Add support for bitbucket
- Add support for gitlab
- Add parsers for ruby
- Add parsers for elixir
- Add support for README code blocks
- Add support for non `.vim` files like dotfiles (`.vimrc`)
