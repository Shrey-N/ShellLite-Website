# Chapter 11: Testing and Debugging

Writing reliable software requires testing and effective debugging techniques. This chapter covers strategies for ensuring your ShellLite code works correctly.

## 1. Debugging Basics

### Print Debugging
The simplest debugging technique is adding `say` statements:

```javascript
to calculate_total items
    say "DEBUG: items received: " + str(items)
    total = 0
    for item in items
        say "DEBUG: processing item: " + str(item)
        total += item["price"]
        say "DEBUG: running total: " + str(total)
    say "DEBUG: final total: " + str(total)
    give total
```

### Colored Debug Output
Make debug messages stand out:

```javascript
to debug message
    say in yellow "[DEBUG] " + message

to error message
    say in red "[ERROR] " + message

to info message
    say in cyan "[INFO] " + message

# Usage
debug "Starting process"
info "Processing 100 items"
error "Failed to connect"
```

### Debug Mode Flag
Use a flag to enable/disable debug output:

```javascript
const DEBUG = yes

to debug message
    if DEBUG
        say in yellow "[DEBUG] " + message

# In production, set DEBUG = no
```

### Environment Variable Debug Mode
```bash
# Enable debug mode
SHL_DEBUG=1 shl script.shl
```

```javascript
use "os"

DEBUG = os.environ.get("SHL_DEBUG") == "1"

to debug message
    if DEBUG
        say in yellow "[DEBUG] " + message
```

## 2. Error Handling Strategies

### Defensive Programming
Check for errors before they happen:

```javascript
to safe_divide a, b
    if b == 0
        say in red "Error: Cannot divide by zero"
        give none
    give a / b

to safe_get_item list, index
    if index < 0 or index >= len(list)
        say in red "Error: Index out of bounds"
        give none
    give list[index]
```

### Try/Catch Blocks
Handle errors gracefully:

```javascript
to process_file filename
    try
        content = read file filename
        # Process content
        give content
    catch error
        say in red "Failed to process file: " + str(error)
        give none
    always
        say "File operation completed"
```

### Custom Error Messages
Provide meaningful error information:

```javascript
thing ValidationError
    has message
    has field
    has value

to validate_email email
    if not email matches /^[\w.-]+@[\w.-]+\.\w+$/
        error = new ValidationError
        error.message = "Invalid email format"
        error.field = "email"
        error.value = email
        give error
    give none

# Usage
result = validate_email("invalid-email")
if result
    say in red "Validation error on " + result.field + ": " + result.message
```

## 3. Testing Strategies

### Manual Testing
Create test scripts to verify functionality:

**test_math.shl:**
```javascript
say "Testing math functions..."

# Test addition
result = 2 + 3
if result == 5
    say in green "PASS: 2 + 3 = 5"
else
    say in red "FAIL: 2 + 3 expected 5, got " + str(result)

# Test multiplication
result = 4 * 5
if result == 20
    say in green "PASS: 4 * 5 = 20"
else
    say in red "FAIL: 4 * 5 expected 20, got " + str(result)

say "Math tests completed."
```

### Assertion Helper
Create a simple assertion function:

```javascript
test_count = 0
pass_count = 0
fail_count = 0

to assert condition, message
    global test_count, pass_count, fail_count
    test_count += 1
    if condition
        say in green "PASS: " + message
        pass_count += 1
    else
        say in red "FAIL: " + message
        fail_count += 1

to assert_equals actual, expected, message
    if actual == expected
        assert yes, message
    else
        assert no, message + " (expected " + str(expected) + ", got " + str(actual) + ")"

to test_summary
    say ""
    say "=========================================="
    say "Tests: " + str(test_count)
    say in green "Passed: " + str(pass_count)
    if fail_count > 0
        say in red "Failed: " + str(fail_count)
    else
        say "Failed: 0"
    say "=========================================="

# Usage
assert_equals 2 + 2, 4, "Basic addition"
assert_equals len("hello"), 5, "String length"
assert contains([1,2,3], 2), "List contains"

test_summary()
```

### Test Suites
Organize tests by functionality:

```javascript
# test_suite.shl

to run_string_tests
    say "\n--- String Tests ---"
    assert_equals upper("hello"), "HELLO", "upper() function"
    assert_equals lower("WORLD"), "world", "lower() function"
    assert_equals trim("  hi  "), "hi", "trim() function"
    assert startswith("hello", "he"), "startswith() function"

to run_list_tests
    say "\n--- List Tests ---"
    list = [1, 2, 3]
    assert_equals len(list), 3, "List length"
    add 4 to list
    assert_equals len(list), 4, "List append"
    assert contains(list, 2), "List contains"

to run_math_tests
    say "\n--- Math Tests ---"
    assert_equals abs(-5), 5, "abs() function"
    assert_equals min(3, 1, 4), 1, "min() function"
    assert_equals max(3, 1, 4), 4, "max() function"

# Run all tests
run_string_tests()
run_list_tests()
run_math_tests()
test_summary()
```

## 4. Using The Bridge for Testing

### Python's unittest
```javascript
use "unittest"

class TestCalculator(unittest.TestCase)
    def test_add(self)
        self.assertEqual(add(2, 3), 5)
    
    def test_subtract(self)
        self.assertEqual(subtract(5, 3), 2)

if __name__ == "__main__"
    unittest.main()
```

### Pytest via Bridge
```javascript
use "pytest"

to test_addition
    assert 1 + 1 == 2

to test_string
    assert "hello".upper() == "HELLO"

# Run with: pytest test_file.py
```

## 5. Debugging Tools

### Stack Traces
When an error occurs, ShellLite shows the line number:

```
[ShellLite Error] on line 15:
  > result = data / 0
    ^^^^^^^^^^^^^
Message: division by zero
```

### Variable Inspection
Print variable state at key points:

```javascript
to inspect name, value
    say in cyan "[INSPECT] " + name + " = " + str(value) + " (type: " + typeof(value) + ")"

# Usage
data = [1, 2, 3]
inspect "data", data
# Output: [INSPECT] data = [1, 2, 3] (type: list)
```

### Breakpoints (with Bridge)
Use Python's pdb for interactive debugging:

```javascript
use "pdb"

to complex_function data
    # Process some data
    result = transform(data)
    
    # Set a breakpoint
    pdb.set_trace()
    
    # Continue processing
    final = finalize(result)
    give final
```

## 6. Linting

Use the built-in linter to catch errors before running:

```bash
shl check script.shl
```

This outputs JSON with any syntax errors found:

```json
[{"line": 15, "message": "Undefined variable 'foo'"}]
```

### Integrating with Editors
The VS Code extension uses `shl check` for real-time error highlighting.

## 7. Common Bugs and Solutions

### Bug: Variable Not Defined
```javascript
# Problem
say naem  # Typo: should be 'name'

# Solution: Check spelling, ShellLite will suggest similar names
# Did you mean: 'name'?
```

### Bug: Off-by-One Errors
```javascript
# Problem: Lists are 0-indexed
items = ["a", "b", "c"]
say items[3]  # Error: index out of range

# Solution: Use indices 0 to len-1
say items[2]  # "c"
```

### Bug: Infinite Loop
```javascript
# Problem: Condition never becomes false
count = 5
while count > 0
    say count
    # Forgot to decrement count!

# Solution: Ensure loop variable changes
while count > 0
    say count
    count -= 1
```

### Bug: Mutable Default Arguments
```javascript
# Problem: List is shared between calls
to add_item item, list=[]
    add item to list
    give list

result1 = add_item("a")  # ["a"]
result2 = add_item("b")  # ["a", "b"] - Unexpected!

# Solution: Use None as default
to add_item item, list=none
    if list is none
        list = a list
    add item to list
    give list
```

### Bug: Type Mismatch
```javascript
# Problem: Comparing different types
age = ask "Enter age: "  # Returns string
if age > 18  # Comparing string to number
    say "Adult"

# Solution: Convert types
age = int(ask "Enter age: ")
if age > 18
    say "Adult"
```

## 8. Logging

Create a logging system for production applications:

```javascript
use "datetime"

const LOG_LEVELS = {"DEBUG": 0, "INFO": 1, "WARNING": 2, "ERROR": 3}
log_level = LOG_LEVELS["INFO"]

to log level, message
    if LOG_LEVELS[level] >= log_level
        timestamp = datetime.datetime.now().isoformat()
        log_message = "[" + timestamp + "] [" + level + "] " + message
        
        if level == "ERROR"
            say in red log_message
        elif level == "WARNING"
            say in yellow log_message
        else
            say log_message
        
        # Optionally write to file
        append log_message + "\n" to file "app.log"

# Usage
log "INFO", "Application started"
log "DEBUG", "Processing item 1"  # Won't show if level is INFO
log "ERROR", "Failed to connect to database"
```

## 9. Test-Driven Development (TDD)

1. **Write the test first** (it will fail)
2. **Write minimal code** to make it pass
3. **Refactor** while keeping tests green

```javascript
# Step 1: Write failing test
to test_is_palindrome
    assert is_palindrome("racecar") == yes, "racecar is palindrome"
    assert is_palindrome("hello") == no, "hello is not palindrome"

# Step 2: Implement function
to is_palindrome text
    reversed_text = reverse(list(text))
    give text == join(reversed_text, "")

# Step 3: Run tests
test_is_palindrome()
```

## 10. Continuous Integration

For larger projects, automate testing:

**.github/workflows/test.yml:**
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - name: Install ShellLite
        run: pip install shell-lite
      - name: Run tests
        run: shl tests/run_all.shl
```

---
[Next: API Reference ->](12_API_Reference.md)
