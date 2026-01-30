# Chapter 6: Modules & Standard Library

You don't have to write everything from scratch. ShellLite comes with a powerful Standard Library and **The Bridge** - a feature that lets you use any Python library directly.

## 1. Importing Modules

Use `use` or `import` to load a module.

```javascript
use "math"
use "time"
import "json"
```

You can also import your own files. If you have `utils.shl`, you can do:
```javascript
use "utils"
```

### Import Keywords
| Keyword | Description |
|:---|:---|
| `use` | Import a module |
| `import` | Alternative syntax |
| `as` | Alias for imported module |
| `from` | Import specific items |

## 2. The Bridge (Python Integration)

**The Bridge** is one of ShellLite's most powerful features. It allows you to import and use any Python library directly in your ShellLite code.

### Using Python Libraries
```javascript
# Import Python's pandas library
use "pandas" as pd

# Create a DataFrame
data = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35]
})

say data

# Import requests for HTTP
use "requests"
response = requests.get("https://api.github.com")
say response.status_code
```

### How The Bridge Works
When you `use` a module that isn't a ShellLite built-in, The Bridge automatically:
1. Checks if it's a Python package
2. Imports it into the ShellLite environment
3. Makes all its functions and classes available

### Common Python Libraries via The Bridge
```javascript
# Data Science
use "numpy" as np
use "pandas" as pd
use "matplotlib.pyplot" as plt

# Web Requests
use "requests"

# Date/Time
use "datetime"

# System Operations
use "os"
use "sys"
```

## 3. Math Module

Advanced mathematical operations.

| Function | Description |
|:---|:---|
| `math.pi` | The value of PI (3.14159...) |
| `math.e` | Euler's number (2.71828...) |
| `math.random()` | Random number between 0.0 and 1.0 |
| `math.randint(a, b)` | Random integer between a and b |
| `math.floor(x)` | Round down |
| `math.ceil(x)` | Round up |
| `math.sqrt(x)` | Square root |
| `math.pow(x, y)` | x raised to power y |
| `math.abs(x)` | Absolute value |
| `math.sin(x)` | Sine |
| `math.cos(x)` | Cosine |
| `math.tan(x)` | Tangent |

```javascript
use "math"

say math.pi          # 3.14159...
say math.sqrt(16)    # 4
say math.floor(3.7)  # 3
say math.ceil(3.2)   # 4
say math.randint(1, 100)  # Random number 1-100
```

### Built-in Math Functions
These don't require importing:
```javascript
say abs(-5)          # 5
say min(3, 1, 4)     # 1
say max(3, 1, 4)     # 4
say round(3.7)       # 4
say pow(2, 8)        # 256
say sum([1,2,3,4])   # 10
```

## 4. Time Module

Handling time and delays.

| Function | Description |
|:---|:---|
| `time.sleep(sec)` | Pause program for X seconds |
| `time.now()` | Current timestamp |
| `wait for X seconds` | Natural syntax for sleep |

```javascript
use "time"

say "Starting..."
time.sleep(2)       # Wait 2 seconds
say "Done!"

# Natural syntax
wait for 1 second
wait for 3 seconds
```

### Working with Dates
```javascript
# Get current date/time
today = date()
say today

# Date operations
tomorrow = today after 1 day
yesterday = today before 1 day
next_week = today after 7 days
```

## 5. HTTP Module

Interact with the web.

```javascript
use "http"

# GET request
data = http.get("https://api.example.com/data")
say data

# POST request
response = http.post("https://example.com/api", { "name": "test" })
say response
```

### Using The Bridge for Advanced HTTP
```javascript
use "requests"

# GET with headers
response = requests.get("https://api.github.com", headers={
    "User-Agent": "ShellLite App"
})
say response.json()

# POST with JSON
response = requests.post("https://api.example.com/data", json={
    "username": "alice",
    "email": "alice@example.com"
})
```

## 6. CSV Operations

Reading and writing spreadsheets.

```javascript
# Reading CSV
users = load csv "users.csv"
say users[0]["Name"]

# Iterate over rows
for user in users
    say user["Name"] + " - " + user["Email"]

# Writing CSV
save users to csv "backup.csv"
```

## 7. Database Module (DB)

ShellLite has a built-in interface for SQLite databases.

```javascript
# Open a database
db open "website.db"

# Query data
results = db query "SELECT * FROM users"
for row in results
    say row

# Execute commands
db exec "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')"
db exec "UPDATE users SET name = 'Bob' WHERE id = 1"
db exec "DELETE FROM users WHERE id = 2"

# Create tables
db exec "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL)"

# Close connection
db close
```

### Parameterized Queries (Safe)
```javascript
# Use parameterized queries to prevent SQL injection
name = ask "Enter name: "
db exec "INSERT INTO users (name) VALUES (?)", [name]
```

## 8. JSON Module

For parsing and creating JSON data.

```javascript
use "json"

# Parse JSON string to object
json_str = '{"name": "Alice", "age": 30}'
user = json.parse(json_str)
say user["name"]  # Alice

# Convert object to JSON string
data = {"status": "ok", "count": 42}
json_output = convert data to json
say json_output  # {"status": "ok", "count": 42}
```

## 9. File System Module

See [Chapter 7: System Mastery](07_System_Mastery.md) for detailed file operations.

Quick reference:
```javascript
# Check if file exists
if exists("config.txt")
    say "Config found"

# Create directory
mkdir("new_folder")

# List directory contents
files = listdir(".")
for file in files
    say file

# Copy, rename, delete
copy("source.txt", "backup.txt")
rename("old.txt", "new.txt")
delete("unwanted.txt")
```

## 10. Creating Your Own Modules

Create reusable code by saving functions in separate `.shl` files.

**utils.shl:**
```javascript
to greet name
    say "Hello, " + name + "!"

to calculate_tax amount, rate=0.1
    give amount * rate

const VERSION = "1.0.0"
```

**main.shl:**
```javascript
use "utils"

greet("World")
tax = calculate_tax(100, 0.15)
say "Tax: $" + str(tax)
```

### Sharing Functions
Use `share` to explicitly export functions:
```javascript
# mymodule.shl
to internal_helper
    # This won't be exported
    give 42

to public_function
    share  # Mark for export
    give internal_helper() * 2
```

## 11. Package Management (The Universe)

ShellLite's package manager lets you install libraries from GitHub.

### Installing Packages
```bash
# Install from GitHub
shl get username/repo

# Install all project dependencies
shl install
```

### Project Configuration
Create `shell-lite.toml` for your project:

```toml
[project]
name = "my-app"
version = "1.0.0"
description = "My ShellLite application"

[dependencies]
Shrey-N/shl-utils = "main"
Shrey-N/shl-http = "v1.0"
```

Then run:
```bash
shl install
```

## 12. Module Summary

| Module | Purpose |
|:---|:---|
| `math` | Mathematical operations |
| `time` | Time and delays |
| `http` | Web requests |
| `json` | JSON parsing/serialization |
| `db` | Database operations |
| Any Python lib | Via The Bridge |

---
[Next: System Mastery ->](07_System_Mastery.md)
