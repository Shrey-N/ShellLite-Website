# Chapter 3: Control Flow

Control flow is how your program makes decisions. It allows code to run only when certain conditions are met, or to repeat tasks.

## 1. Making Decisions (If/Else)

The valid syntax is `if <condition>`, followed by an indented block of code.

```javascript
score = 85

if score > 50
    say "You passed!"
elif score == 50
    say "Just barely made it."
else
    say "Please try again."
```

### Conditional Keywords
| Keyword | Description |
|:---|:---|
| `if` | Execute block if condition is true |
| `elif` | Execute if previous conditions were false and this is true |
| `else` | Execute if all previous conditions were false |
| `then` | Optional keyword after condition (for readability) |
| `do` | Optional keyword after condition (for readability) |

### Natural Comparisons
You can use English words instead of math symbols if you prefer.

| Symbol | English Phrase |
|:------:|:--------------|
| `==` | `is`, `is exactly`, `equals` |
| `!=` | `is not` |
| `>=` | `is at least`, `is more than or equal to` |
| `<=` | `is at most`, `is less than or equal to` |
| `>` | `is more than`, `is greater than` |
| `<` | `is less than` |

Example:
```javascript
if the age is at least 18
    say "Adult"

if score is more than 100
    say "High score!"

if name is "Alice"
    say "Welcome, Alice!"
```

### Unless
`unless` is the opposite of `if`. It runs only if the condition is **no** (false).
```javascript
tired = no
unless tired
    say "Let's keep coding!"
```

This is equivalent to:
```javascript
if not tired
    say "Let's keep coding!"
```

## 2. Pattern Matching (When)
If you have a long chain of `if/else`, `when` is cleaner. It looks like a "switch" statement in other languages.

```javascript
day = "Monday"

when day
    is "Saturday"
        say "Weekend!"
    is "Sunday"
        say "Rest day."
    is "Monday"
        say "Back to work."
    otherwise
        say "Just another day."
```

The `otherwise` clause is optional and acts as a default case when no other conditions match.

## 3. Loops
Loops let you repeat code.

### Repeat
The simplest loop. Runs a block a specific number of times.
```javascript
repeat 3 times
    say "Hip Hip Hooray!"
```

You can also use it without `times`:
```javascript
repeat 5
    say "Hello"
```

### While
Runs *while* a condition is true.
```javascript
count = 5
while count > 0
    say count
    count = count - 1
```

Natural language alternative:
```javascript
doing as long as count > 0
    say count
    count -= 1
```

### Until
Runs *until* a condition becomes true (opposite of while).
```javascript
battery = 0
until battery == 100
    say "Charging..."
    battery += 10
```

### For Loops
Iterates over a list or a range of numbers.

**Range:**
```javascript
for i in range 1 5
    say i
# Prints: 1, 2, 3, 4, 5
```

**Range with step:**
```javascript
for i in range 0 10 2
    say i
# Prints: 0, 2, 4, 6, 8, 10
```

**Lists:**
```javascript
colors = ["red", "blue", "green"]
for color in colors
    say color
```

**Dictionaries:**
```javascript
user = {"name": "Alice", "age": 30}
for key in user
    say key + ": " + str(user[key])
```

### For Each
Alternative natural syntax:
```javascript
for each item in items
    say item
```

### Forever Loop
Sometimes you want a program to run indefinitely, for example, a server or a background watcher.
```javascript
forever
    say "I will run until stopped manually."
    wait 1 second
```

Use `stop` or `break` to exit a forever loop when needed.

### Loop Control Keywords
| Keyword | Alias | Description |
|:---|:---|:---|
| `stop` | `break` | Exits the loop immediately |
| `skip` | `continue` | Skips the rest of the current iteration |

```javascript
repeat 10 times
    if something_bad_happened
        stop  # Exit the loop

for i in range 1 10
    if i == 5
        skip  # Skip printing 5
    say i
```

## 4. Error Handling (Try/Catch)
Real world programs encounter errors. You can handle them gracefully using `try`, `catch`, and `always` (or `finally`).

```javascript
try
    # Risky code
    result = 10 / 0
catch error
    # This runs if there is an error
    say in red "Oops! Something went wrong: " + error
always
    # This runs no matter what (success or error)
    say "Cleanup complete."
```

### Error Handling Keywords
| Keyword | Alias | Description |
|:---|:---|:---|
| `try` | | Begin a block that might throw an error |
| `catch` | | Handle errors if they occur |
| `always` | `finally` | Always execute, regardless of error |

### Nested Try/Catch
```javascript
try
    try
        risky_operation()
    catch inner_error
        say "Inner error handled"
catch outer_error
    say "Outer error caught"
```

## 5. Exiting the Program
To stop your program completely at any point, use `exit`.

```javascript
if critical_system_failure
    say in red "Shutting down!"
    exit
```

## 6. Pass Statement
Sometimes you need a placeholder for code you haven't written yet. While ShellLite doesn't have a formal `pass` keyword, you can use an empty block or a comment:

```javascript
if condition
    # TODO: implement this later
```

## 7. Conditional Expressions

ShellLite supports inline conditional expressions:

```javascript
status = "adult" if age >= 18 else "minor"
```

## 8. Control Flow Summary

| Statement | Purpose |
|:---|:---|
| `if`/`elif`/`else` | Conditional branching |
| `unless` | Negated conditional |
| `when`/`is`/`otherwise` | Pattern matching |
| `repeat N times` | Fixed iteration count |
| `while` | Loop while condition is true |
| `until` | Loop until condition becomes true |
| `for X in Y` | Iterate over collection |
| `forever` | Infinite loop |
| `stop`/`break` | Exit loop |
| `skip`/`continue` | Skip to next iteration |
| `try`/`catch`/`always` | Error handling |
| `exit` | Terminate program |

---
[Next: Data Structures ->](04_Data_Structures.md)
