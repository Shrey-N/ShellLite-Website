# Chapter 6: Modules & Standard Library

You don't have to write everything from scratch. ShellLite comes with a powerful Standard Library.

## 1. Importing Modules
Use `use` or `import` to load a module.

```javascript
use "math"
use "time"
```

You can also import your own files. If you have `utils.shl`, you can do:
```javascript
use "utils"
```

## 2. Math Module
Advanced mathematical operations.

| Function | Description |
|---|---|
| `math.pi` | The value of PI (3.14159...) |
| `math.random()` | Random number between 0.0 and 1.0 |
| `math.randint(a, b)` | Random integer between a and b |
| `math.floor(x)` | Round down |
| `math.ceil(x)` | Round up |
| `math.sqrt(x)` | Square root |

## 3. Time Module
Handling time and delays.

| Function | Description |
|---|---|
| `time.sleep(sec)` | Pause program for X seconds |
| `time.now()` | Current timestamp |
| `wait for 2 seconds` | Natural syntax for sleep |

## 4. HTTP Module
Interact with the web.

```javascript
use "http"

# Get data
data = http.get("https://api.example.com/data")
say data

# Post data
http.post("https://example.com/api", { name: "test" })
```

## 5. CSV Operations
Reading and writing spreadsheets.

```javascript
# Reading
users = load csv "users.csv"
say users[0]["Name"]

# Writing
save users to csv "backup.csv"
```

## 5. Database Module (DB)
ShellLite has a built-in interface for SQLite databases.

```javascript
# Standard SQL operations
db open "website.db"
results = db query "SELECT * FROM users"
db exec "INSERT INTO users (name) VALUES ('Alice')"
db close
```

## 6. JSON Module
For parsing JSON strings into objects (since `convert to json` handles the other way).

```javascript
use "json"

json_str = '{"name": "Alice"}'
user = json.parse(json_str)
say user["name"]
```

## 7. Error Handling
See [Chapter 3: Control Flow](03_Control_Flow.md#4-error-handling-trycatch) for details on `try`, `catch`, and `always`.

---
[Next: System Mastery ->](07_System_Mastery.md)
