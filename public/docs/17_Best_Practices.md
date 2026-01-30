# Chapter 17: Best Practices

This guide covers coding standards, design patterns, and best practices for writing clean, maintainable ShellLite code.

## 1. Code Style Guidelines

### Naming Conventions

**Variables and Functions:** Use `snake_case`
```javascript
# Good
user_name = "Alice"
total_count = 42
to calculate_average numbers
    # ...

# Avoid
userName = "Alice"  # camelCase
TotalCount = 42     # PascalCase
```

**Constants:** Use `SCREAMING_SNAKE_CASE`
```javascript
# Good
const MAX_RETRIES = 3
const API_BASE_URL = "https://api.example.com"
const DEFAULT_TIMEOUT = 30

# Avoid
const maxRetries = 3
const max_retries = 3  # Looks like a variable
```

**Classes/Things:** Use `PascalCase`
```javascript
# Good
thing UserAccount
thing HttpClient
thing DatabaseConnection

# Avoid
thing user_account
thing httpClient
```

### Indentation

Use **4 spaces** consistently. Never mix tabs and spaces.

```javascript
# Good (4 spaces)
if condition
    for item in items
        if item.valid
            process(item)

# Avoid (inconsistent)
if condition
  for item in items   # 2 spaces
        process(item) # 8 spaces
```

### Line Length

Keep lines under 80-100 characters when possible.

```javascript
# Good - readable
message = "Hello, " + user_name + "!"
say message

# Avoid - too long
say "This is a very long message that goes on and on and makes the code hard to read because you have to scroll horizontally"

# Better - split it up
long_message = "This is a very long message that we split "
long_message += "across multiple lines for better readability."
say long_message
```

### Comments

Write comments that explain **why**, not **what**.

```javascript
# Bad - states the obvious
count += 1  # Add 1 to count

# Good - explains why
count += 1  # Account for the header row

# Good - explains complex logic
# Using binary search because the list is sorted and may contain
# millions of entries, making linear search too slow
result = binary_search(sorted_list, target)
```

### Blank Lines

Use blank lines to separate logical sections:

```javascript
# Imports/uses at the top
use "math"
use "time"

# Constants
const MAX_SIZE = 100
const TIMEOUT = 30

# Helper functions
to helper_function x
    give x * 2

# Main logic
to main
    data = load_data()
    result = process(data)
    save(result)

# Entry point
main()
```

## 2. Code Organization

### File Structure

Organize your project logically:

```
my_project/
├── main.shl           # Entry point
├── config.shl         # Configuration
├── shell-lite.toml    # Dependencies
├── modules/
│   ├── utils.shl      # Utility functions
│   ├── database.shl   # Database operations
│   └── api.shl        # API handlers
├── tests/
│   ├── test_utils.shl
│   └── test_api.shl
└── docs/
    └── README.md
```

### Module Organization

Each module should have a single responsibility:

```javascript
# database.shl - Only database operations
const DB_PATH = "app.db"

to db_connect
    db open DB_PATH

to db_disconnect
    db close

to db_get_user id
    give db query "SELECT * FROM users WHERE id = ?", [id]

to db_create_user name, email
    db exec "INSERT INTO users (name, email) VALUES (?, ?)", [name, email]
```

### Function Organization

Within a file, organize functions logically:

```javascript
# 1. Constants and configuration
const MAX_ITEMS = 100

# 2. Helper/private functions (prefix with underscore by convention)
to _validate_input data
    if len(data) == 0
        give no
    give yes

to _format_output result
    give "Result: " + str(result)

# 3. Public functions
to process_data data
    if not _validate_input(data)
        give none
    
    result = calculate(data)
    give _format_output(result)

# 4. Main entry point (if applicable)
to main
    data = get_input()
    output = process_data(data)
    say output
```

## 3. Function Best Practices

### Single Responsibility

Each function should do one thing well:

```javascript
# Bad - does too much
to process_and_save_and_notify data
    # Validate
    if len(data) == 0
        give no
    # Process
    result = data * 2
    # Save
    write str(result) to file "output.txt"
    # Notify
    say "Done!"
    give result

# Good - separate concerns
to validate_data data
    give len(data) > 0

to process_data data
    give data * 2

to save_result result
    write str(result) to file "output.txt"

to notify_complete
    say "Done!"

# Usage
if validate_data(data)
    result = process_data(data)
    save_result(result)
    notify_complete()
```

### Keep Functions Small

Functions should fit on one screen (roughly 20-30 lines max):

```javascript
# Bad - too long
to do_everything items
    # 100 lines of code...

# Good - break into smaller functions
to do_everything items
    validated = validate_items(items)
    processed = process_items(validated)
    formatted = format_results(processed)
    give formatted
```

### Meaningful Return Values

Be consistent with return values:

```javascript
# Good - clear success/failure
to find_user id
    user = db query "SELECT * FROM users WHERE id = ?", [id]
    if len(user) == 0
        give none  # Clear indication of not found
    give user[0]

# Usage
user = find_user(123)
if user is none
    say "User not found"
else
    say "Found: " + user["name"]
```

### Default Parameters

Use sensible defaults:

```javascript
to connect timeout=30, retries=3, verbose=no
    for i in range 0 retries
        if verbose
            say "Attempt " + str(i + 1)
        
        try
            result = make_connection(timeout)
            give result
        catch error
            if i == retries - 1
                say in red "Failed after " + str(retries) + " attempts"
    give none

# Can call with defaults
connect()

# Or override specific ones
connect(timeout=60, verbose=yes)
```

## 4. Error Handling Best Practices

### Fail Fast

Check for errors early:

```javascript
to process_file filename
    # Validate early
    if not exists(filename)
        say in red "File not found: " + filename
        give none
    
    if not filename.endswith(".txt")
        say in red "Only .txt files supported"
        give none
    
    # Main logic (only runs if validation passes)
    content = read file filename
    result = process(content)
    give result
```

### Use Try/Catch Appropriately

Only catch exceptions you can handle:

```javascript
# Bad - catches everything silently
to risky_operation
    try
        result = do_something()
        give result
    catch error
        pass  # Silent failure!

# Good - handle specific cases
to risky_operation
    try
        result = do_something()
        give result
    catch error
        if "timeout" in str(error)
            say "Operation timed out, retrying..."
            give risky_operation()  # Retry
        else
            say in red "Unexpected error: " + str(error)
            give none
```

### Always Clean Up

Use `always` (finally) for cleanup:

```javascript
to process_with_file filename
    file = none
    try
        file = open(filename, "r")
        data = file.read()
        give process(data)
    catch error
        say in red "Error: " + str(error)
        give none
    always
        if file
            file.close()  # Always runs
```

## 5. Data Structure Best Practices

### Initialize Properly

Always initialize variables before use:

```javascript
# Bad - might be undefined
to count_items items
    for item in items
        count += 1  # Error if count not defined
    give count

# Good - explicit initialization
to count_items items
    count = 0
    for item in items
        count += 1
    give count
```

### Choose the Right Structure

| Use Case | Best Structure |
|:---|:---|
| Ordered collection | List `[]` |
| Key-value mapping | Dictionary `{}` |
| Unique items | Set |
| Fixed values | Tuple/const list |

```javascript
# List - when order matters
steps = ["step1", "step2", "step3"]

# Dictionary - for lookups
user = {"name": "Alice", "age": 30}

# Set - for uniqueness
unique_tags = a unique set of "python", "web", "python"  # Only 2 items
```

### Immutability When Possible

Prefer not modifying data structures:

```javascript
# Instead of modifying
to add_tax prices
    for i in range 0 len(prices)
        prices[i] = prices[i] * 1.1
    give prices  # Original modified!

# Return new data
to add_tax prices
    result = a list
    for price in prices
        add price * 1.1 to result
    give result  # Original unchanged
```

## 6. Performance Best Practices

### Avoid Premature Optimization

Write clear code first, optimize only when needed:

```javascript
# First: Make it work
to find_duplicates items
    seen = a list
    duplicates = a list
    for item in items
        if contains(seen, item)
            add item to duplicates
        else
            add item to seen
    give duplicates

# Later, if too slow: Make it fast
to find_duplicates_fast items
    seen = a unique set
    duplicates = a list
    for item in items
        if item in seen
            add item to duplicates
        seen.add(item)
    give duplicates
```

### Cache Expensive Operations

```javascript
# Bad - recalculates every time
for i in range 0 1000
    length = len(very_large_list)  # Calculated 1000 times
    # ...

# Good - calculate once
length = len(very_large_list)
for i in range 0 1000
    # Use cached length
    # ...
```

### Use Built-in Functions

Built-ins are usually faster than manual implementations:

```javascript
# Slow - manual sum
total = 0
for n in numbers
    total += n

# Fast - built-in
total = sum(numbers)
```

## 7. Testing Best Practices

### Write Testable Code

Design functions that are easy to test:

```javascript
# Hard to test - depends on current time
to is_morning
    use "datetime"
    now = datetime.datetime.now()
    give now.hour < 12

# Easy to test - accepts time as parameter
to is_morning current_hour
    give current_hour < 12

# Tests
assert is_morning(8) == yes, "8am is morning"
assert is_morning(14) == no, "2pm is not morning"
```

### Test Edge Cases

```javascript
to test_divide
    # Normal cases
    assert_equals divide(10, 2), 5, "Normal division"
    
    # Edge cases
    assert_equals divide(0, 5), 0, "Zero dividend"
    assert_equals divide(5, 0), none, "Division by zero"
    assert_equals divide(-10, 2), -5, "Negative number"
```

### Keep Tests Independent

Each test should run independently:

```javascript
# Bad - tests depend on each other
test_list = a list

to test_add
    add "item" to test_list
    assert len(test_list) == 1  # Fails if run after test_add2

to test_add2
    add "item2" to test_list
    assert len(test_list) == 1  # Fails if run after test_add

# Good - each test is independent
to test_add
    test_list = a list
    add "item" to test_list
    assert len(test_list) == 1

to test_add2
    test_list = a list
    add "item" to test_list
    assert len(test_list) == 1
```

## 8. Documentation Best Practices

### Document Public Functions

```javascript
# Calculate the monthly payment for a loan.
#
# Parameters:
#   principal - The loan amount
#   annual_rate - Annual interest rate (e.g., 0.05 for 5%)
#   years - Number of years
#
# Returns:
#   Monthly payment amount
#
to calculate_payment principal, annual_rate, years
    monthly_rate = annual_rate / 12
    num_payments = years * 12
    
    payment = principal * (monthly_rate * pow(1 + monthly_rate, num_payments))
    payment = payment / (pow(1 + monthly_rate, num_payments) - 1)
    
    give round(payment, 2)
```

### Keep Documentation Updated

When you change code, update the comments too.

### Document Configuration

```javascript
# config.shl
#
# Application Configuration
#
# Environment Variables Required:
#   DATABASE_URL - Connection string for database
#   API_KEY - Authentication key for external API
#   DEBUG - Set to "true" for debug mode
#

use "os"

# Database connection string
# Default: local SQLite database
const DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///app.db")

# API authentication
# Required for production
const API_KEY = os.environ.get("API_KEY")

# Debug mode
# Set to "true" for verbose logging
const DEBUG = os.environ.get("DEBUG", "false") == "true"
```

## 9. Summary Checklist

### Before Committing Code

- [ ] Code follows naming conventions
- [ ] Indentation is consistent (4 spaces)
- [ ] No unnecessary comments (code is self-documenting)
- [ ] Functions are small and focused
- [ ] Error handling is appropriate
- [ ] Variables are initialized
- [ ] No hardcoded secrets/credentials
- [ ] Tests pass
- [ ] Documentation is updated

### Code Review Checklist

- [ ] Code is readable and understandable
- [ ] Logic is correct
- [ ] Edge cases are handled
- [ ] No security vulnerabilities
- [ ] No performance issues
- [ ] Follows project conventions

---

**Remember:** Clean code is not about perfection. It's about making code easy to read, understand, and maintain. When in doubt, choose clarity over cleverness.
