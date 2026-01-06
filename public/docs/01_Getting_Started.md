# Chapter 1: Getting Started with ShellLite

Welcome to ShellLite! This chapter covers everything you need to get up and running, from installation to writing your first script.

## 1. Installation

### The Easy Way (Windows Installer)
The recommended way to use ShellLite is via the standalone executable `shl.exe`.

1.  **Download & Run**: Locate the compiled `shl.exe` file and run it.
2.  **Global Installation**: The first time you run it, if it detects it isn't installed globally (system-wide), it will ask:
    > "Would you like to install it so 'shl' works everywhere? (y/n)"
3.  **Approve**: Type `y` and press Enter. This adds ShellLite to your system PATH.
4.  **Verify**: Close your current terminal and open a new one. Type `shl`. You should see the ShellLite interactive prompt.

> [!TIP]
> If `shl` doesn't work after installation, try restarting your computer or checking your System Environment Variables manually.

### The Python Way (For Developers)
If you are developing the language itself or prefer running from source:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Shrey-N/ShellLite.git
    cd ShellLite
    ```
2.  **Run with Python**:
    You can execute the language directly using Python 3.
    ```bash
    # Enter Interactive Mode
    python -m src.main

    # Run a Script
    python -m src.main myscript.shl
    ```

## 2. Tools

### VS Code Extension
For the best experience, use Visual Studio Code. While we don't have an official extension in the marketplace yet, you can set the language mode to **JavaScript** or **Python** to get decent highlighting for now, as ShellLite syntax is visually similar to both.

## 3. The Interactive REPL
ShellLite comes with a "Read-Eval-Print Loop" (REPL). This lets you type commands and see results instantly.
Just type `shl` in your terminal to start it.

```text
  ShellLite REPL - English Syntax
========================================
>>> say "Hello"
Hello
>>> 5 + 5
10
```
Type `exit` to leave the REPL.

## 4. Running Scripts
To run a real program, save your code in a text file with the `.shl` extension (e.g., `script.shl`).
Then run it from the command line:

```bash
shl script.shl
```

## 5. Comments
In your code, you often want to leave notes for yourself. These are called **comments**.
ShellLite uses the `#` symbol for comments. Anything after `#` is ignored by the computer.

```javascript
# This is a comment. The computer ignores this.
say "Hi"  # You can put comments at the end of lines too.
```

---
[Next: Language Basics ->](02_Language_Basics.md)
