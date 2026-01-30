# Chapter 4: Data Structures

Real programs need to organize data. ShellLite provides powerful, easy-to-use structures for lists, lookups, and more.

## 1. Lists

A list is an ordered collection of items.

### Creating Lists
You can use square brackets `[]` or the natural syntax.

```javascript
# Standard style
groceries = ["Milk", "Eggs", "Bread"]

# Natural style
todo = a list of "Clean", "Cook", "Sleep"
tasks = list of "Work", "Play"

# Empty list
empty_list = []
items = a list
```

### Accessing Items
Lists are **0-indexed**, meaning the first item is at index 0.
```javascript
say groceries[0]   # Prints "Milk"
say groceries[1]   # Prints "Eggs"
say groceries[-1]  # Prints "Bread" (last item)
```

### Modifying Lists
```javascript
# Add an item
groceries.add("Butter")
add "Cheese" to groceries  # Natural style
push "Apple" into groceries

# Remove an item
groceries.remove("Eggs")
remove "Milk" from groceries

# Update an item
groceries[0] = "Almond Milk"

# Get length
say len(groceries)
say count of groceries  # Natural style
```

### List Operations
| Operation | Description | Example |
|:---|:---|:---|
| `list.add(item)` | Add item to end | `items.add("new")` |
| `list.remove(item)` | Remove first occurrence | `items.remove("old")` |
| `list.pop()` | Remove and return last item | `last = items.pop()` |
| `list.pop(i)` | Remove and return item at index | `item = items.pop(0)` |
| `len(list)` | Get number of items | `say len(items)` |
| `item in list` | Check if item exists | `if "apple" in fruits` |

### List Built-in Functions
```javascript
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Sorting
sorted_nums = sort(numbers)      # Returns sorted copy
say sorted_nums                   # [1, 1, 2, 3, 4, 5, 6, 9]

# Reversing
reversed_nums = reverse(numbers)  # Returns reversed copy

# Slicing
subset = slice(numbers, 0, 3)     # First 3 items

# Checking contents
say contains(numbers, 5)          # yes
say empty(numbers)                # no
say index(numbers, 4)             # 2
```

### Natural List Operations
```javascript
# Add items
add "item" to mylist
put "item" into mylist
push "item" into mylist

# Check membership
if "apple" is in fruits
    say "Found it!"

# Count items
how many items in mylist
```

## 2. Dictionaries

Dictionaries store data as **Key-Value** pairs. Think of them like a real dictionary: you look up a word (key) to get its definition (value).

### Creating Dictionaries
```javascript
user = {
    "name": "Shrey",
    "role": "Admin",
    "level": 99
}

# Natural Initialization
config = a dictionary
settings = a map

# Empty dictionary
empty_dict = {}
```

### Accessing Values
```javascript
say user["name"]      # Prints "Shrey"
say user["level"]     # Prints 99
```

### Modifying Dictionaries
```javascript
# Add or update a value
user["level"] = 100
user["email"] = "shrey@example.com"

# Remove a key
# (use del or remove methods as available)
```

### Iterating Over Dictionaries
```javascript
for key in user
    say key + ": " + str(user[key])
```

### Nested Dictionaries
```javascript
company = {
    "name": "TechCorp",
    "employees": {
        "alice": {"role": "dev", "salary": 80000},
        "bob": {"role": "manager", "salary": 100000}
    }
}

say company["employees"]["alice"]["role"]  # "dev"
```

## 3. Sets

A Set is a collection of **unique** items. If you add the same item twice, it only appears once.

```javascript
# Creating a set naturally
ids = a unique set of 1, 2, 2, 3

say ids  # Prints: {1, 2, 3}
```

Sets are great when you want to ensure no duplicates exist in your data.

### Set Operations
```javascript
# Create sets
set1 = a unique set of 1, 2, 3
set2 = a unique set of 2, 3, 4

# Check membership
if 2 is in set1
    say "Found"
```

## 4. Working with Strings as Collections

Strings can be treated like lists of characters:

```javascript
text = "Hello"
say text[0]       # "H"
say len(text)     # 5

# Iterate over characters
for char in text
    say char
```

### String Methods
```javascript
text = "  Hello World  "

# Case conversion
say upper(text)           # "  HELLO WORLD  "
say lower(text)           # "  hello world  "

# Trimming whitespace
say trim(text)            # "Hello World"

# Splitting and joining
words = split("a,b,c", ",")   # ["a", "b", "c"]
joined = join(words, "-")      # "a-b-c"

# Searching
say find("Hello", "ll")       # 2
say startswith("Hello", "He") # yes
say endswith("Hello", "lo")   # yes

# Replacing
say replace("Hello", "l", "L")  # "HeLLo"
```

## 5. Converting Data to JSON

ShellLite has built-in support for JSON, the standard format for web data.

```javascript
data = { "id": 1, "status": "OK" }

# Convert Object -> JSON String
json_string = convert data to json
say json_string
# Output: {"id": 1, "status": "OK"}

# JSON String -> Object
use "json"
obj = json.parse(json_string)
say obj["id"]  # 1
```

## 6. Type Conversion

Convert between different data types:

```javascript
# String to Number
num = int("42")        # 42
decimal = float("3.14") # 3.14

# Number to String
text = str(42)         # "42"

# Get type information
say typeof(42)         # "int"
say typeof("hello")    # "str"
say typeof([1,2,3])    # "list"
```

## 7. Ranges

Generate sequences of numbers:

```javascript
# Basic range
nums = range(5)         # [0, 1, 2, 3, 4]
nums = range(1, 6)      # [1, 2, 3, 4, 5]
nums = range(0, 10, 2)  # [0, 2, 4, 6, 8]

# Use in loops
for i in range 1 5
    say i
```

## 8. Data Structure Summary

| Structure | Use Case | Example |
|:---|:---|:---|
| **List** | Ordered collection, allows duplicates | `[1, 2, 2, 3]` |
| **Dictionary** | Key-value mappings | `{"name": "Alice"}` |
| **Set** | Unique items only | `unique set of 1, 2, 3` |
| **String** | Text data | `"Hello World"` |

---
[Next: Functions and OOP ->](05_Functions_and_OOP.md)
