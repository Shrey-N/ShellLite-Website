# Chapter 15: Troubleshooting

This guide helps you diagnose and fix common issues when working with ShellLite.

## 1. Installation Issues

### "shl" Command Not Found

**Symptoms:**
```
'shl' is not recognized as an internal or external command
```

**Solutions:**

1. **Restart your terminal** - After installation, close and reopen your terminal/command prompt.

2. **Check if installed globally:**
   ```bash
   pip show shell-lite
   ```

3. **Add to PATH manually (Windows):**
   - Find Python Scripts folder: `C:\Users\<YourUser>\AppData\Local\Programs\Python\Python3X\Scripts`
   - Add this to your System Environment Variables PATH

4. **Reinstall:**
   ```bash
   pip uninstall shell-lite
   pip install shell-lite
   ```

5. **Run directly with Python:**
   ```bash
   python -m shell_lite.main
   ```

### Missing Dependencies

**Symptoms:**
```
ModuleNotFoundError: No module named 'prompt_toolkit'
```

**Solution:**
```bash
pip install prompt_toolkit llvmlite
```

### LLVM Compilation Not Working

**Symptoms:**
```
Error: 'llvmlite' is required for LLVM compilation
```

**Solution:**
```bash
pip install llvmlite
```

If llvmlite fails to install:
- Windows: May need Visual C++ Build Tools
- Linux: `sudo apt install llvm-dev`
- macOS: `brew install llvm`

## 2. Syntax Errors

### Indentation Errors

**Error:**
```
IndentationError: Unindent does not match any outer indentation level on line 5
```

**Cause:** Mixed tabs and spaces, or inconsistent indentation.

**Solution:** Use consistent indentation (4 spaces recommended):
```javascript
# Wrong
if score > 50
   say "Pass"  # 3 spaces
    say "Done"  # 4 spaces

# Correct
if score > 50
    say "Pass"  # 4 spaces
    say "Done"  # 4 spaces
```

### Unterminated String

**Error:**
```
SyntaxError: Unterminated string on line 3
```

**Cause:** Missing closing quote.

**Solution:**
```javascript
# Wrong
say "Hello

# Correct
say "Hello"
```

### Illegal Character

**Error:**
```
SyntaxError: Illegal character '@' at line 5
```

**Cause:** Using characters not supported in ShellLite syntax.

**Solution:** Check for special characters that don't belong:
```javascript
# Wrong
email = user@example.com

# Correct
email = "user@example.com"
```

### Missing Colon (Not Needed in ShellLite)

**Problem:** Coming from Python, you might add colons:

```javascript
# Wrong (Python habit)
if score > 50:
    say "Pass"

# Correct (ShellLite)
if score > 50
    say "Pass"
```

## 3. Runtime Errors

### Variable Not Defined

**Error:**
```
[ShellLite Error] on line 5:
  > say username
    ^^^^^^^^^^^^
Message: Variable 'username' is not defined.
Did you mean: 'user_name'?
```

**Causes:**
- Typo in variable name
- Variable used before assignment
- Variable defined in different scope

**Solutions:**
```javascript
# Check spelling
user_name = "Alice"
say user_name  # Not 'username'

# Define before use
to greet
    name = "Guest"  # Define first
    say name
```

### Cannot Reassign Constant

**Error:**
```
RuntimeError: Cannot reassign constant 'PI'
```

**Cause:** Trying to change a const value.

**Solution:**
```javascript
# Wrong
const PI = 3.14
PI = 3.14159  # Error!

# Correct - use a regular variable if it needs to change
pi_value = 3.14
pi_value = 3.14159  # OK
```

### Index Out of Range

**Error:**
```
IndexError: list index out of range
```

**Cause:** Accessing list element that doesn't exist.

**Solution:**
```javascript
items = ["a", "b", "c"]

# Wrong
say items[5]  # Only indices 0, 1, 2 exist

# Correct - check bounds
if len(items) > 5
    say items[5]
else
    say "Index doesn't exist"
```

### Division by Zero

**Error:**
```
ZeroDivisionError: division by zero
```

**Cause:** Dividing by zero.

**Solution:**
```javascript
# Wrong
result = 10 / 0

# Correct - check first
if divisor != 0
    result = 10 / divisor
else
    say "Cannot divide by zero"
```

### Type Errors

**Error:**
```
TypeError: can only concatenate str (not "int") to str
```

**Cause:** Mixing types incorrectly.

**Solution:**
```javascript
age = 25

# Wrong
say "Age: " + age

# Correct - convert to string
say "Age: " + str(age)

# Or use interpolation
say "Age: {age}"
```

## 4. File Operation Errors

### File Not Found

**Error:**
```
FileNotFoundError: File 'config.txt' not found
```

**Solution:**
```javascript
# Check if file exists first
if exists("config.txt")
    content = read file "config.txt"
else
    say in red "Config file not found!"
    # Create default config
    write "default=true" to file "config.txt"
```

### Permission Denied

**Error:**
```
PermissionError: Permission denied: 'system_file.txt'
```

**Cause:** No write/read permission for the file.

**Solutions:**
- Check file permissions
- Run as administrator (Windows) or with sudo (Linux/macOS)
- Choose a different directory you have access to

### Path Issues on Windows

**Problem:** Backslashes in paths causing issues.

**Solution:**
```javascript
# Use forward slashes (works on all platforms)
path = "C:/Users/Name/Documents/file.txt"

# Or escape backslashes
path = "C:\\Users\\Name\\Documents\\file.txt"
```

## 5. Database Errors

### Database Locked

**Error:**
```
sqlite3.OperationalError: database is locked
```

**Cause:** Another process is using the database, or connection wasn't closed.

**Solution:**
```javascript
# Always close database connections
db open "app.db"
try
    results = db query "SELECT * FROM users"
catch error
    say "Database error: " + str(error)
always
    db close  # Always close!
```

### No Such Table

**Error:**
```
sqlite3.OperationalError: no such table: users
```

**Solution:**
```javascript
# Create table if it doesn't exist
db open "app.db"
db exec "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)"
```

### SQL Syntax Error

**Error:**
```
sqlite3.OperationalError: near "FORM": syntax error
```

**Cause:** Typo in SQL command.

**Solution:**
```javascript
# Wrong
db query "SELECT * FORM users"

# Correct
db query "SELECT * FROM users"
```

## 6. Web Server Issues

### Port Already in Use

**Error:**
```
OSError: [Errno 48] Address already in use
```

**Cause:** Another application is using the port.

**Solutions:**
1. Use a different port:
   ```javascript
   start server on port 8081
   ```

2. Find and stop the other process:
   - Windows: `netstat -ano | findstr :8080`
   - Linux/macOS: `lsof -i :8080`

### Request Form Data Missing

**Problem:** `request.form` is empty or missing keys.

**Solutions:**
```javascript
# Check if key exists
when someone submits to "/login"
    if "username" in request.form
        username = request.form["username"]
    else
        say "Username not provided"
        give "Bad Request", 400
```

### CORS Issues (When Building APIs)

**Problem:** Browser blocks cross-origin requests.

**Solution:**
```javascript
before request
    # Add CORS headers
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
```

## 7. Module/Import Errors

### Module Not Found

**Error:**
```
ModuleNotFoundError: No module named 'custom_module'
```

**Solutions:**

1. Check the file exists and is in the right location
2. For Python modules via The Bridge, install them:
   ```bash
   pip install module_name
   ```

3. For ShellLite modules, ensure they're in the modules directory:
   ```bash
   shl get username/repo
   ```

### Circular Import

**Problem:** Module A imports Module B, which imports Module A.

**Solution:** Restructure your code to avoid circular dependencies:
```javascript
# Instead of circular imports, use a shared module
# shared.shl - common definitions
# module_a.shl - uses shared
# module_b.shl - uses shared
```

## 8. Performance Issues

### Slow Loops

**Problem:** Code runs slowly with large datasets.

**Solutions:**
```javascript
# Slow: Repeated string concatenation
result = ""
for i in range 1 100000
    result = result + str(i)

# Faster: Collect then join
parts = a list
for i in range 1 100000
    add str(i) to parts
result = join(parts, "")

# Fastest: Use built-in functions when possible
use "functools"
```

### Memory Issues

**Problem:** Program uses too much memory.

**Solutions:**
```javascript
# Process in chunks instead of loading all at once
to process_large_file filename
    with open(filename, "r") as f
        for line in f  # Reads line by line
            process(line)

# Clear large variables when done
large_data = load_big_dataset()
process(large_data)
large_data = none  # Allow garbage collection
```

## 9. Debug Mode

Enable debug mode for more detailed error information:

```bash
# Windows
set SHL_DEBUG=1
shl script.shl

# Linux/macOS
SHL_DEBUG=1 shl script.shl
```

This shows full stack traces for errors.

## 10. Common Mistakes Checklist

### Syntax
- [ ] No colons after if/for/while (unlike Python)
- [ ] Consistent indentation (4 spaces)
- [ ] Strings are properly quoted
- [ ] No semicolons at end of lines

### Variables
- [ ] Variable names spelled correctly
- [ ] Variables defined before use
- [ ] Not reassigning constants

### Types
- [ ] Converting numbers to strings for concatenation
- [ ] Converting strings to numbers for math
- [ ] Checking types when necessary

### Lists
- [ ] Using valid indices (0 to len-1)
- [ ] Checking if list is empty before accessing

### Files
- [ ] File exists before reading
- [ ] Path is correct
- [ ] Proper permissions

### Database
- [ ] Connection is opened before queries
- [ ] Connection is closed after use
- [ ] Table exists before querying

### Web
- [ ] Server started on available port
- [ ] Routes defined before server start
- [ ] Form fields match HTML names

## 11. Getting Help

If you're still stuck:

1. **Check the documentation:** Review relevant chapters in `docs/`
2. **Search issues:** [GitHub Issues](https://github.com/Shrey-N/ShellLite/issues)
3. **Ask for help:** Create a new issue with:
   - ShellLite version (`shl --version`)
   - Operating system
   - Complete error message
   - Minimal code to reproduce

---
[Next: Examples and Tutorials ->](16_Examples_and_Tutorials.md)
