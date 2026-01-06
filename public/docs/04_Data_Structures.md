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
```

### Accessing Items
Lists are **0-indexed**, meaning the first item is at index 0.
```javascript
say groceries[0]  # Prints "Milk"
```

### Modifying Lists
```javascript
# Add an item
groceries.add("Butter")
add "Cheese" to groceries  # Natural style

# Remove an item
groceries.remove("Eggs")

# Get length
say len(groceries)
say count of groceries  # Natural style
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
```
*Note: You can initialize empty dictionaries using `a dictionary` or `a map`.*

```javascript
config["theme"] = "dark"
```

### Using Dictionaries
```javascript
say user["name"]  # Prints "Shrey"

user["level"] = 100  # Update value
```

## 3. Sets
A Set is a collection of **unique** items. If you add the same item twice, it only appears once.

```javascript
# Creating a set naturally
ids = a unique set of 1, 2, 2, 3

say ids  # Prints: {1, 2, 3}
```
Sets are great when you want to ensure no duplicates exist in your data.

## 4. Converting Data to JSON
ShellLite has built-in support for JSON, the standard format for web data.

```javascript
```javascript
data = { "id": 1, "status": "OK" }

# Convert Object -> JSON String
json_string = convert data to json
say json_string
# Output: {"id": 1, "status": "OK"}

# JSON String -> Object (if needed, use the json module)
use "json"
obj = json.parse(json_string)
```
```

---
[Next: Functions and OOP ->](05_Functions_and_OOP.md)
