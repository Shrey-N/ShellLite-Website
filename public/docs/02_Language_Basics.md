# Chapter 2: Language Basics

This chapter explores the building blocks of ShellLite: storing data, using different types of information, and talking to the user.

## 1. Variables

Variables are like labeled boxes where you can store information. You create one simply by giving it a name and using `=` to assign a value.

```javascript
name = "Alice"
age = 30
is_happy = yes
```

You don't need to tell ShellLite what "type" of data it is; it figures it out automatically (dynamic typing).

### Variable Naming Rules
- Must start with a letter or underscore (`_`)
- Can contain letters, numbers, and underscores
- Case-sensitive (`Name` and `name` are different)
- Cannot be a reserved keyword

### Constants
Sometimes you want a value that *never* changes. Use `const` for this. By convention, we often use ALL CAPS for constants to distinguish them from regular variables.

```javascript
const PI = 3.14159
const MAX_USERS = 100
const APP_NAME = "ShellLite v0.05"
```
*Note: If you try to change a `const` later in your code, ShellLite will throw an error.*

## 2. Data Types

ShellLite is dynamically typed, meaning variables can hold any type of value. Here are the core types:

| Type | Description | Example |
|:---|:---|:---|
| **Number** | Integers and floating-point numbers | `42`, `3.14`, `-10` |
| **String** | Text enclosed in quotes | `"Hello"`, `'World'` |
| **Boolean** | Logical yes/no values | `yes`, `no`, `true`, `false` |
| **List** | Ordered collection of items | `[1, 2, 3]` |
| **Dictionary** | Key-value pairs | `{"name": "Alice"}` |
| **Function** | Callable code blocks | `fn x => x * 2` |
| **Object** | Instance of a class/structure | `new Car` |
| **None/Null** | Represents absence of value | (empty result) |

### Numbers
Integers (whole numbers) and Floats (decimals).
```javascript
count = 10
price = 19.99
negative = -5
```

**Arithmetic Operators:**
| Operator | Description | Example |
|:---:|:---|:---|
| `+` | Addition | `5 + 3` → `8` |
| `-` | Subtraction | `10 - 4` → `6` |
| `*` | Multiplication | `3 * 4` → `12` |
| `/` | Division | `15 / 3` → `5` |
| `%` | Modulo (remainder) | `17 % 5` → `2` |

**Compound Assignment:**
```javascript
x = 10
x += 5   # x is now 15
x -= 3   # x is now 12
x *= 2   # x is now 24
x /= 4   # x is now 6
x %= 4   # x is now 2
```

**Natural Language Math:**
```javascript
increment x          # x = x + 1
decrement x          # x = x - 1
multiply x by 3      # x = x * 3
divide x by 2        # x = x / 2
```

### Strings (Text)
Text is enclosed in either double quotes `"` or single quotes `'`.
```javascript
greeting = "Hello World"
quote = 'Keep it simple.'
```

**Escape Sequences:**
| Sequence | Meaning |
|:---:|:---|
| `\n` | Newline |
| `\t` | Tab |
| `\r` | Carriage return |
| `\"` | Double quote |
| `\'` | Single quote |

**Combining Strings:**
You can join strings using `+`.
```javascript
full_name = "John" + " " + "Doe"
```

**String Interpolation:**
You can inject variables directly into strings using `{}`. This is often cleaner than using `+`.
```javascript
name = "Shrey"
score = 100
say "Player {name} has a score of {score}!"
```

**String Methods:**
```javascript
text = "Hello World"
say text.upper()      # "HELLO WORLD"
say text.lower()      # "hello world"
say len(text)         # 11
```

### Booleans (Yes/No)
Instead of `true` and `false`, ShellLite uses `yes` and `no` (though `true`/`false` work too).
```javascript
active = yes
sleepy = no
is_ready = true
```

**Truthiness and Falsiness:**
In ShellLite, certain values are considered "falsy" (evaluate to `no` in conditions):
- `no` / `false`
- `0`
- Empty string `""`
- Empty list `[]`
- Empty dictionary `{}`

Everything else is "truthy" (evaluates to `yes`).

### Logical Operators
| Operator | Description | Example |
|:---:|:---|:---|
| `and` | Both must be true | `yes and yes` → `yes` |
| `or` | At least one must be true | `yes or no` → `yes` |
| `not` | Negates the value | `not yes` → `no` |

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

**Supported colors:** `red`, `green`, `blue`, `yellow`, `cyan`, `magenta`, `white`, `black`

**Supported styles:** `bold`

## 4. Input (Ask)
To get information from the user via the terminal, use the `ask` command (or `input`).

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

## 5. Operator Precedence

Operators are evaluated in the following order (highest to lowest):

1. Parentheses `()`
2. Unary operators: `not`, `-` (negation)
3. Multiplication, Division, Modulo: `*`, `/`, `%`
4. Addition, Subtraction: `+`, `-`
5. Comparison: `>`, `<`, `>=`, `<=`, `==`, `!=`
6. Logical AND: `and`
7. Logical OR: `or`

```javascript
# Example
result = 2 + 3 * 4    # result is 14, not 20
result = (2 + 3) * 4  # result is 20
```

## 6. Natural Language Enhancements

ShellLite tries to ignore "filler words" to make code read like English. You can use words like `the` freely.
```javascript
if the score is more than 10
    say "Win"
```
In this example, `the` is completely ignored by the computer - it's just there for you.

### Natural Comparison Phrases
| Symbol | English Phrase |
|:------:|:--------------|
| `==` | `is`, `is exactly`, `equals` |
| `!=` | `is not` |
| `>=` | `is at least` |
| `<=` | `is at most` |
| `>` | `is more than`, `is greater than` |
| `<` | `is less than` |

---
[Next: Control Flow ->](03_Control_Flow.md)
