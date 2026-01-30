# Chapter 1: Getting Started with ShellLite

Welcome to ShellLite! This chapter covers everything you need to get up and running, from installation to writing your first script.

**Current Version: 0.05.0 (Performance Update)**

This release introduces native compilation via LLVM, transforming ShellLite into a compiled language alongside its interpreted mode.

## 1. Installation

### Via PyPI (Recommended)
The easiest way to install ShellLite:
```bash
pip install shell-lite
```

### Windows Installer
Download the latest `shl.exe` from the [Releases page](https://github.com/Shrey-N/ShellLite/releases).

1.  **Download & Run**: Locate the compiled `shl.exe` file and run it.
2.  **Global Installation**: The first time you run it, if it detects it isn't installed globally (system-wide), it will ask:
    > "Would you like to install it so 'shl' works everywhere? (y/n)"
3.  **Approve**: Type `y` and press Enter. This adds ShellLite to your system PATH.
4.  **Verify**: Close your current terminal and open a new one. Type `shl`. You should see the ShellLite interactive prompt.

> [!TIP]
> If `shl` doesn't work after installation, try restarting your computer or checking your System Environment Variables manually.

### From Source (For Developers)
If you are developing the language itself or prefer running from source:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Shrey-N/ShellLite.git
    cd ShellLite
    ```
2.  **Install in Development Mode**:
    ```bash
    pip install -e .
    ```
3.  **Install Optional Dependencies** (for LLVM compilation):
    ```bash
    pip install llvmlite
    ```
4.  **Run with Python**:
    ```bash
    # Enter Interactive Mode
    python -m shell_lite.main

    # Run a Script
    python -m shell_lite.main myscript.shl
    ```

## 2. Tools

### VS Code Extension
For the best experience, install the official ShellLite VS Code extension:
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ShellLite.shelllite-hello)
- [OpenVSX](https://open-vsx.org/extension/shelllite/shelllite-hello)

The extension provides syntax highlighting and code snippets for ShellLite.

### ShellDesk IDE
The official IDE for ShellLite with integrated debugging and project management:
- [ShellDesk on GitHub](https://github.com/Shrey-N/ShellDesk)

## 3. CLI Commands

| Command | Description |
|:---|:---|
| `shl <file.shl>` | Run a ShellLite script |
| `shl` | Start the interactive REPL |
| `shl compile <file>` | Compile to native code (LLVM) |
| `shl compile <file> --target js` | Compile to JavaScript |
| `shl compile <file> --target python` | Compile to Python |
| `shl init` | Initialize a new project |
| `shl install` | Install project dependencies |
| `shl get <user/repo>` | Install a package from GitHub |
| `shl fmt <file>` | Format a script |
| `shl check <file>` | Lint a file (JSON output) |
| `shl help` | Show help message |

## 4. The Interactive REPL
ShellLite comes with a "Read-Eval-Print Loop" (REPL). This lets you type commands and see results instantly.
Just type `shl` in your terminal to start it.

```text
  ShellLite REPL - English Syntax
========================================
Version: v0.05 | Made by Shrey Naithani
Commands: Type 'exit' to quit, 'help' for examples.
>>> say "Hello"
Hello
>>> 5 + 5
10
```
Type `exit` to leave the REPL.

## 5. Running Scripts
To run a real program, save your code in a text file with the `.shl` extension (e.g., `script.shl`).
Then run it from the command line:

```bash
shl script.shl
```

## 6. Project Management

### Initialize a Project
```bash
shl init
```
This creates a `shell-lite.toml` configuration file.

### Install Dependencies
```bash
shl install
```
Installs all dependencies defined in `shell-lite.toml`.

### Install a Package
```bash
shl get user/repo
```
Installs a package directly from GitHub.

## 7. Comments
In your code, you often want to leave notes for yourself. These are called **comments**.
ShellLite uses the `#` symbol for single-line comments and `/* */` for multi-line comments.

```javascript
# This is a single-line comment. The computer ignores this.
say "Hi"  # You can put comments at the end of lines too.

/*
This is a multi-line comment.
It can span multiple lines.
*/
```

## 8. Compilation

ShellLite v0.05.0 introduces native compilation via LLVM:

```bash
# Compile to native code (default)
shl compile script.shl

# Compile to JavaScript
shl compile script.shl --target js

# Compile to Python
shl compile script.shl --target python
```

---
[Next: Language Basics ->](02_Language_Basics.md)
