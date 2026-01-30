# Chapter 12: API Reference

Complete reference for ShellLite built-in functions, keywords, and standard library.

## 1. Keywords Reference

### Control Flow Keywords
| Keyword | Aliases | Description |
|:---|:---|:---|
| `if` | | Conditional statement |
| `elif` | | Else-if branch |
| `else` | | Default branch |
| `unless` | | Negated conditional |
| `when` | | Pattern matching |
| `is` | | Pattern match case |
| `otherwise` | | Default case |
| `then` | | Optional (readability) |
| `do` | | Optional (readability) |

### Loop Keywords
| Keyword | Aliases | Description |
|:---|:---|:---|
| `for` | | For loop |
| `in` | | Iterator specifier |
| `range` | | Number range |
| `while` | | While loop |
| `until` | | Until loop |
| `repeat` | | Repeat N times |
| `times` | | Used with repeat |
| `forever` | | Infinite loop |
| `loop` | | Generic loop |
| `each` | | For-each syntax |
| `stop` | `break` | Exit loop |
| `skip` | `continue` | Skip iteration |

### Function Keywords
| Keyword | Aliases | Description |
|:---|:---|:---|
| `to` | `fn`, `can` | Define function |
| `return` | `give` | Return value |
| `define function` | | Alternative syntax |

### Class Keywords
| Keyword | Aliases | Description |
|:---|:---|:---|
| `thing` | `structure`, `class` | Define class |
| `has` | `with` | Define property |
| `can` | `to` | Define method |
| `extends` | | Inheritance |
| `new` | `make` | Create instance |

### Error Handling
| Keyword | Aliases | Description |
|:---|:---|:---|
| `try` | | Begin try block |
| `catch` | | Handle errors |
| `always` | `finally` | Always execute |

### Import/Export
| Keyword | Aliases | Description |
|:---|:---|:---|
| `use` | `import` | Import module |
| `as` | | Alias import |
| `from` | | Selective import |
| `share` | | Export function |

### I/O Keywords
| Keyword | Aliases | Description |
|:---|:---|:---|
| `say` | `print`, `show` | Output text |
| `ask` | `input` | Get user input |
| `read` | | Read file |
| `write` | | Write file |
| `append` | | Append to file |

### Boolean Values
| Keyword | Aliases | Description |
|:---|:---|:---|
| `yes` | `true` | Boolean true |
| `no` | `false` | Boolean false |
| `and` | | Logical AND |
| `or` | | Logical OR |
| `not` | | Logical NOT |

### Other Keywords
| Keyword | Description |
|:---|:---|
| `const` | Declare constant |
| `exit` | Exit program |
| `spawn` | Async execution |
| `await` | Wait for async |
| `wait` | Delay execution |

## 2. Built-in Functions

### Type Functions
| Function | Description | Example |
|:---|:---|:---|
| `str(x)` | Convert to string | `str(42)` → `"42"` |
| `int(x)` | Convert to integer | `int("42")` → `42` |
| `float(x)` | Convert to float | `float("3.14")` → `3.14` |
| `bool(x)` | Convert to boolean | `bool(1)` → `yes` |
| `list(x)` | Convert to list | `list("abc")` → `["a","b","c"]` |
| `typeof(x)` | Get type name | `typeof(42)` → `"int"` |

### Math Functions
| Function | Description | Example |
|:---|:---|:---|
| `abs(x)` | Absolute value | `abs(-5)` → `5` |
| `min(...)` | Minimum value | `min(3,1,4)` → `1` |
| `max(...)` | Maximum value | `max(3,1,4)` → `4` |
| `round(x)` | Round to nearest | `round(3.7)` → `4` |
| `pow(x,y)` | Power | `pow(2,8)` → `256` |
| `sum(list)` | Sum of list | `sum([1,2,3])` → `6` |

### String Functions
| Function | Description | Example |
|:---|:---|:---|
| `len(s)` | String length | `len("hello")` → `5` |
| `upper(s)` | Uppercase | `upper("hi")` → `"HI"` |
| `lower(s)` | Lowercase | `lower("HI")` → `"hi"` |
| `trim(s)` | Strip whitespace | `trim(" hi ")` → `"hi"` |
| `split(s,d)` | Split by delimiter | `split("a,b",",")` → `["a","b"]` |
| `join(lst,d)` | Join with delimiter | `join(["a","b"],"-")` → `"a-b"` |
| `replace(s,old,new)` | Replace substring | `replace("hi","i","o")` → `"ho"` |
| `find(s,sub)` | Find index | `find("hello","ll")` → `2` |
| `startswith(s,p)` | Check prefix | `startswith("hi","h")` → `yes` |
| `endswith(s,p)` | Check suffix | `endswith("hi","i")` → `yes` |
| `char(n)` | ASCII to char | `char(65)` → `"A"` |
| `ord(c)` | Char to ASCII | `ord("A")` → `65` |

### List Functions
| Function | Description | Example |
|:---|:---|:---|
| `len(lst)` | List length | `len([1,2,3])` → `3` |
| `append(lst,x)` | Add item | `append(lst,"x")` |
| `push(lst,x)` | Add item | `push(lst,"x")` |
| `remove(lst,x)` | Remove item | `remove(lst,"x")` |
| `pop(lst)` | Remove last | `pop(lst)` → last item |
| `pop(lst,i)` | Remove at index | `pop(lst,0)` → first item |
| `get(lst,i)` | Get at index | `get(lst,0)` → first item |
| `sort(lst)` | Sort list | `sort([3,1,2])` → `[1,2,3]` |
| `reverse(lst)` | Reverse list | `reverse([1,2,3])` → `[3,2,1]` |
| `slice(lst,s,e)` | Get slice | `slice([1,2,3,4],1,3)` → `[2,3]` |
| `contains(lst,x)` | Check membership | `contains([1,2],2)` → `yes` |
| `index(lst,x)` | Find index | `index([1,2,3],2)` → `1` |
| `empty(lst)` | Check if empty | `empty([])` → `yes` |

### File Functions
| Function | Description | Example |
|:---|:---|:---|
| `exists(path)` | Check file exists | `exists("file.txt")` → `yes/no` |
| `delete(path)` | Delete file | `delete("old.txt")` |
| `copy(src,dst)` | Copy file | `copy("a.txt","b.txt")` |
| `rename(old,new)` | Rename file | `rename("a.txt","b.txt")` |
| `mkdir(path)` | Create directory | `mkdir("new_folder")` |
| `listdir(path)` | List directory | `listdir(".")` → `[...]` |

### HTTP Functions
| Function | Description | Example |
|:---|:---|:---|
| `http_get(url)` | GET request | `http_get("https://...")` |
| `http_post(url,data)` | POST request | `http_post("https://...",{})` |

### Random Functions
| Function | Description | Example |
|:---|:---|:---|
| `random()` | Random 0.0-1.0 | `random()` → `0.7234...` |
| `randint(a,b)` | Random integer | `randint(1,10)` → `7` |

### Date/Time Functions
| Function | Description | Example |
|:---|:---|:---|
| `date()` | Current date | `date()` → current datetime |
| `now()` | Current timestamp | `now()` → timestamp |

### Other Functions
| Function | Description | Example |
|:---|:---|:---|
| `range(...)` | Number sequence | `range(5)` → `[0,1,2,3,4]` |
| `input(prompt)` | User input | `input("Name: ")` → user text |
| `print(...)` | Output | `print("Hello")` |

## 3. Operators

### Arithmetic Operators
| Operator | Description | Example |
|:---:|:---|:---|
| `+` | Addition | `5 + 3` → `8` |
| `-` | Subtraction | `5 - 3` → `2` |
| `*` | Multiplication | `5 * 3` → `15` |
| `/` | Division | `15 / 3` → `5` |
| `%` | Modulo | `17 % 5` → `2` |

### Comparison Operators
| Operator | Description | Natural Form |
|:---:|:---|:---|
| `==` | Equal | `is`, `is exactly` |
| `!=` | Not equal | `is not` |
| `>` | Greater than | `is more than` |
| `<` | Less than | `is less than` |
| `>=` | Greater or equal | `is at least` |
| `<=` | Less or equal | `is at most` |

### Assignment Operators
| Operator | Description | Example |
|:---:|:---|:---|
| `=` | Assign | `x = 5` |
| `+=` | Add and assign | `x += 1` |
| `-=` | Subtract and assign | `x -= 1` |
| `*=` | Multiply and assign | `x *= 2` |
| `/=` | Divide and assign | `x /= 2` |
| `%=` | Modulo and assign | `x %= 3` |

### Logical Operators
| Operator | Description | Example |
|:---:|:---|:---|
| `and` | Logical AND | `yes and no` → `no` |
| `or` | Logical OR | `yes or no` → `yes` |
| `not` | Logical NOT | `not yes` → `no` |

## 4. Database API

```javascript
# Open database
db open "database.db"

# Query (returns results)
results = db query "SELECT * FROM table"

# Execute (no return)
db exec "INSERT INTO table VALUES (...)"

# Parameterized queries
db exec "INSERT INTO users (name) VALUES (?)", ["Alice"]

# Close connection
db close
```

## 5. Web Server API

```javascript
# Define a page
define page PageName
    h1 "Title"
    p "Content"

# Handle GET requests
when someone visits "/path"
    PageName

# Handle POST requests
when someone submits to "/path"
    data = request.form["field"]
    # Process and respond

# Middleware
before request
    # Runs before every request

# Static files
serve files from "public"

# Start server
start server on port 8080
```

### Request Object
| Property | Description |
|:---|:---|
| `request.path` | URL path |
| `request.method` | HTTP method |
| `request.form` | Form data |
| `request.params` | URL parameters |
| `request.headers` | HTTP headers |
| `request.query` | Query parameters |

## 6. GUI API (The Canvas)

```javascript
# Create application window
app "App Name" size width, height

# Layout containers
column
    # Vertical layout
row
    # Horizontal layout

# UI Elements
heading "Text"
button "Label" on_click handler_function
input name="field_name"
label "Text"

# Dialogs
alert "Message"
result = confirm "Question?"
text = prompt "Enter value:"
```

## 7. CLI Commands

| Command | Description |
|:---|:---|
| `shl <file>` | Run a script |
| `shl` | Start REPL |
| `shl compile <file>` | Compile to LLVM |
| `shl compile <file> --target js` | Compile to JavaScript |
| `shl compile <file> --target python` | Compile to Python |
| `shl init` | Initialize project |
| `shl install` | Install dependencies |
| `shl get <user/repo>` | Install from GitHub |
| `shl fmt <file>` | Format code |
| `shl check <file>` | Lint code |
| `shl help` | Show help |

## 8. Configuration File (shell-lite.toml)

```toml
[project]
name = "my-project"
version = "1.0.0"
description = "Project description"

[dependencies]
user/repo = "branch"
another/package = "main"
```

## 9. Environment Variables

| Variable | Description |
|:---|:---|
| `SHL_DEBUG` | Enable debug output |
| `USE_GBP` | Use Geometric Binding Parser |

## 10. Escape Sequences (Strings)

| Sequence | Meaning |
|:---:|:---|
| `\n` | Newline |
| `\t` | Tab |
| `\r` | Carriage return |
| `\"` | Double quote |
| `\'` | Single quote |
| `\\` | Backslash |

## 11. Color Constants

For `say in <color>`:
- `red`
- `green`
- `blue`
- `yellow`
- `cyan`
- `magenta`
- `white`
- `black`

Style: `bold`

---

**ShellLite v0.05.0 (Performance Update)**

For more information:
- [GitHub Repository](https://github.com/Shrey-N/ShellLite)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ShellLite.shelllite-hello)
- [ShellDesk IDE](https://github.com/Shrey-N/ShellDesk)

Made by Shrey Naithani
