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
```

### Unless
`unless` is the opposite of `if`. It runs only if the condition is **no** (false).
```javascript
tired = no
unless tired
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

## 3. Loops
Loops let you repeat code.

### Repeat
The simplest loop. Runs a block a specific number of times.
```javascript
repeat 3 times
    say "Hip Hip Hooray!"
```

### While / Until
Runs *while* a condition is true, or *until* a condition becomes true.
```javascript
count = 5
while count > 0
    say count
    count = count - 1

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

**Lists:**
```javascript
colors = ["red", "blue", "green"]
for color in colors
    say color
```

### Forever Loop
Sometimes you want a program to run indefinitely, for example, a server or a background watcher.
```javascript
forever
    say "I will run until stopped manually."
    wait 1 second
```

### Loop Control
- `stop` or `break`: Exits the loop immediately.
- `skip` or `continue`: Skips the rest of the current turn and goes to the next one.

```javascript
repeat 10 times
    if something_bad_happened
        stop
```

## 4. Error Handling (Try/Catch)
Real world programs encounter errors. You can handle them gracefully using `try`, `catch`, and `always`.

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

## 5. Exiting the Program
To stop your program completely at any point, use `exit`.

```javascript
if critical_system_failure
    say in red "Shutting down!"
    exit
```

---
[Next: Data Structures ->](04_Data_Structures.md)
