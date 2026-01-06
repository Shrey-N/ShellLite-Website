# Chapter 2: Language Basics

This chapter explores the building blocks of ShellLite: storing data, using different types of information, and talking to the user.

## 1. Variables

Variables are like labeled boxes where you can store information. You create one simply by giving it a name and using `=` to assign a value.

```javascript
name = "Alice"
age = 30
is_happy = yes
```

You don't need to tell ShellLite what "type" of data it is; it figures it out automatically.

### Constants
Sometimes you want a value that *never* changes. Use `const` for this. By convention, we often use ALL CAPS for constants to distinguish them from regular variables, but it's not strictly required by the language.

```javascript
const PI = 3.14159
const MAX_USERS = 100
const APP_NAME = "ShellLite v1.0"
```
*Note: If you try to change a `const` later in your code, ShellLite will throw an error.*

## 2. Data Types

ShellLite supports all the standard data types you'd expect.

### Numbers
Integers (whole numbers) and Floats (decimals).
```javascript
count = 10
price = 19.99
negative = -5
```
You can do math with them naturally:
```javascript
total = price * count
x = (5 + 10) / 3
```

### Strings (Text)
Text is enclosed in either double quotes `"` or single quotes `'`.
```javascript
greeting = "Hello World"
quote = 'Keep it simple.'
```

**Combining Strings:**
You can join strings using `+`.
```javascript
full_name = "John" + " " + "Doe"
```

**Interpolation:**
You can also inject variables directly into strings using `{}`. This is often cleaner than using `+`.
```javascript
name = "Shrey"
score = 100
say "Player {name} has a score of {score}!"
```

### Booleans (Yes/No)
Instead of `true` and `false`, ShellLite uses `yes` and `no` (though true/false work too).
```javascript
active = yes
sleepy = no
is_ready = true
```

## 3. Output (Say)
To display text on the screen, use the `say` command. You can also use `print` or `show` if you prefer.
```javascript
say "Welcome!"
print "Processing..."
show "Done."
```

### Colored Output
You can make your output pop with colors!
```javascript
say in red "Error!"
say in green "Success!"
say bold blue "Info"
```
Supported colors: `red`, `green`, `blue`, `yellow`, `cyan`, `magenta`, `white`, `black`.

## 4. Input (Ask)
To get information from the user via the terminal, use the `ask` command.

```javascript
# Simple input
name = ask "What is your name? "
say "Hello " + name

# Using the input in logic
age = ask "How old are you? "
if age > 18
    say "Access Granted"
```
The `ask` command pauses the program, prints the prompt (if provided), and waits for the user to type something and press Enter.

## 5. Natural Language Enhancements

ShellLite tries to ignore "filler words" to make code read like English. You can use words like `the` freely.
```javascript
if the score is more than 10
    say "Win"
```
In this example, `the` is completely ignored by the computer - it's just there for you.

---
[Next: Control Flow ->](03_Control_Flow.md)
