# Chapter 10: Compilation and Performance

ShellLite v0.05.0 (Performance Update) introduces native compilation via LLVM, enabling significant performance improvements for compute-intensive applications.

## 1. Compilation Overview

ShellLite supports three compilation targets:

| Target | Description | Use Case |
|:---|:---|:---|
| **LLVM** | Native machine code | Maximum performance |
| **JavaScript** | Browser-compatible JS | Web deployment |
| **Python** | Python source code | Integration with Python ecosystem |

## 2. LLVM Compilation

The LLVM backend compiles ShellLite code to native machine code for optimal performance.

### Prerequisites
```bash
pip install llvmlite
```

### Basic Compilation
```bash
# Compile to LLVM IR (default)
shl compile script.shl

# Explicit LLVM target
shl compile script.shl --target llvm
```

### How It Works
1. **Lexing**: Source code is tokenized
2. **Parsing**: Tokens are parsed into an AST
3. **Code Generation**: AST is converted to LLVM IR
4. **Optimization**: LLVM applies optimizations
5. **Output**: Native object code or executable

### Generated Files
```
script.shl      → script.ll (LLVM IR)
                → script.o  (Object file)
                → script    (Executable, platform-dependent)
```

## 3. JavaScript Compilation

Compile ShellLite to JavaScript for web deployment.

```bash
shl compile script.shl --target js
```

This generates a `.js` file that can run in browsers or Node.js.

### Use Cases
- Web applications
- Server-side Node.js apps
- Browser-based tools

### Example
**input.shl:**
```javascript
to greet name
    say "Hello, " + name

greet "World"
```

**output.js:**
```javascript
function greet(name) {
    console.log("Hello, " + name);
}

greet("World");
```

## 4. Python Compilation

Transpile ShellLite to Python source code.

```bash
shl compile script.shl --target python
```

### Use Cases
- Integration with existing Python projects
- Access to Python debugging tools
- Gradual migration from ShellLite to Python

## 5. Performance Optimization

### Benchmarking Your Code
```javascript
use "time"

start = time.now()

# Your code here
for i in range 1 1000000
    x = i * 2

end = time.now()
say "Elapsed: " + str(end - start) + " seconds"
```

### Optimization Techniques

#### 1. Use Constants
```javascript
# Slower: variable lookup each iteration
multiplier = 2
for i in range 1 1000000
    x = i * multiplier

# Faster: constant (may be inlined)
const MULTIPLIER = 2
for i in range 1 1000000
    x = i * MULTIPLIER
```

#### 2. Minimize Function Calls in Loops
```javascript
# Slower: function call each iteration
for i in range 1 1000000
    x = len(mylist)

# Faster: cache the value
list_length = len(mylist)
for i in range 1 1000000
    x = list_length
```

#### 3. Use Built-in Functions
```javascript
# Slower: manual implementation
total = 0
for n in numbers
    total += n

# Faster: built-in
total = sum(numbers)
```

#### 4. Avoid String Concatenation in Loops
```javascript
# Slower: creates new string each iteration
result = ""
for word in words
    result = result + word + " "

# Faster: use join
result = join(words, " ")
```

#### 5. Use List Comprehensions (via The Bridge)
```javascript
use "builtins"

# Slower: traditional loop
squares = a list
for i in range 1 100
    add i * i to squares

# Faster: list comprehension in Python
squares = [i * i for i in range(1, 100)]
```

## 6. Memory Management

### Understanding Memory Usage
```javascript
use "sys"

# Check object size
data = list of 1, 2, 3, 4, 5
say "Size: " + str(sys.getsizeof(data)) + " bytes"
```

### Tips for Memory Efficiency

1. **Release large objects when done**
```javascript
large_data = load_huge_file()
process(large_data)
large_data = none  # Allow garbage collection
```

2. **Use generators for large datasets**
```javascript
# Instead of loading all at once
# all_data = load_all_records()  # Memory intensive

# Process one at a time
for record in load_records_iterator()
    process(record)
```

3. **Avoid unnecessary copies**
```javascript
# Creates a copy
sorted_list = sort(original_list)

# Modifies in place (if available)
original_list.sort()
```

## 7. Profiling

Use The Bridge to profile your code.

```javascript
use "cProfile"
use "pstats"

to expensive_function
    total = 0
    for i in range 1 100000
        total += i * i
    give total

# Profile the function
profiler = cProfile.Profile()
profiler.enable()

result = expensive_function()

profiler.disable()
stats = pstats.Stats(profiler)
stats.sort_stats("cumulative")
stats.print_stats(10)
```

## 8. Compilation Flags and Options

### Debug Mode
```bash
# Enable debug output
SHL_DEBUG=1 shl compile script.shl
```

### Parser Selection
```bash
# Use Geometric Binding Parser (experimental)
USE_GBP=1 shl script.shl
```

## 9. Performance Comparison

| Execution Mode | Relative Speed | Use Case |
|:---|:---|:---|
| Interpreted | 1x (baseline) | Development, debugging |
| Python Compiled | ~1.2x | Integration |
| JavaScript (Node) | ~2-5x | Web deployment |
| LLVM Native | ~10-50x | Production, compute-heavy |

*Note: Actual performance varies based on the specific code and operations.*

## 10. Best Practices for Performance

1. **Profile before optimizing**: Don't guess where bottlenecks are
2. **Use appropriate data structures**: Lists vs. dictionaries vs. sets
3. **Compile for production**: Use LLVM for deployed applications
4. **Cache expensive computations**: Memoize functions that are called repeatedly
5. **Use The Bridge wisely**: Python libraries may have optimized C implementations
6. **Avoid premature optimization**: Write clean code first, optimize later

## 11. Common Performance Pitfalls

### Pitfall 1: Nested Loops
```javascript
# O(n²) - can be very slow for large n
for i in range 1 n
    for j in range 1 n
        process(i, j)
```

### Pitfall 2: Repeated String Building
```javascript
# Slow: O(n²) due to string immutability
result = ""
for i in range 1 10000
    result += str(i)

# Better: collect then join
parts = a list
for i in range 1 10000
    add str(i) to parts
result = join(parts, "")
```

### Pitfall 3: Ignoring Algorithmic Complexity
```javascript
# Slow: O(n) lookup in list
if item in large_list
    say "Found"

# Fast: O(1) lookup in set
large_set = a unique set of ...
if item in large_set
    say "Found"
```

## 12. Troubleshooting Compilation Issues

### LLVM Not Found
```
Error: 'llvmlite' is required for LLVM compilation.
```
**Solution:** `pip install llvmlite`

### Syntax Errors During Compilation
The compiler will show the line number and error. Check for:
- Missing colons after control statements
- Incorrect indentation
- Unclosed strings or brackets

### Runtime vs. Compile-time Errors
Some errors only appear at runtime:
- Type mismatches
- Undefined variables in conditional branches
- Division by zero

---
[Next: Testing and Debugging ->](11_Testing_and_Debugging.md)
