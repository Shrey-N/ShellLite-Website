# Chapter 9: Advanced Features

This chapter covers advanced ShellLite features for experienced developers.

## 1. Regular Expressions

ShellLite has built-in support for regular expressions (regex).

### Pattern Matching
```javascript
text = "Contact us at support@example.com or sales@example.com"

# Check if pattern matches
if text matches /\w+@\w+\.\w+/
    say "Found email addresses!"

# Extract matches
emails = text.match(/\w+@\w+\.\w+/g)
for email in emails
    say email
```

### Common Regex Patterns
| Pattern | Matches |
|:---|:---|
| `\d` | Any digit (0-9) |
| `\w` | Any word character (a-z, A-Z, 0-9, _) |
| `\s` | Any whitespace |
| `.` | Any character |
| `*` | Zero or more |
| `+` | One or more |
| `?` | Zero or one |
| `^` | Start of string |
| `$` | End of string |
| `[abc]` | Any of a, b, or c |
| `[^abc]` | Not a, b, or c |

### Practical Examples
```javascript
# Validate email
email = ask "Enter email: "
if email matches /^[\w.-]+@[\w.-]+\.\w+$/
    say in green "Valid email!"
else
    say in red "Invalid email format"

# Extract phone numbers
text = "Call 555-1234 or 555-5678"
if text matches /\d{3}-\d{4}/
    say "Contains phone numbers"

# Replace patterns
cleaned = replace(text, /\d{3}-\d{4}/, "[REDACTED]")
say cleaned  # "Call [REDACTED] or [REDACTED]"
```

## 2. Metaprogramming

### Dynamic Function Calls
```javascript
to greet_english name
    say "Hello, " + name

to greet_spanish name
    say "Hola, " + name

to greet_french name
    say "Bonjour, " + name

# Call function dynamically
language = "spanish"
func_name = "greet_" + language
# Use eval or reflection via The Bridge
```

### Code Generation
```javascript
# Generate functions dynamically
operations = ["add", "subtract", "multiply"]

for op in operations
    code = "to " + op + "_nums a, b\n"
    if op == "add"
        code += "    give a + b"
    elif op == "subtract"
        code += "    give a - b"
    elif op == "multiply"
        code += "    give a * b"
    # Execute generated code
```

## 3. Decorators and Higher-Order Functions

### Function Wrappers
```javascript
to log_calls func
    to wrapper args...
        say "Calling function with: " + str(args)
        result = func(args...)
        say "Result: " + str(result)
        give result
    give wrapper

to add a, b
    give a + b

logged_add = log_calls(add)
result = logged_add(3, 4)
```

### Memoization
```javascript
to memoize func
    cache = a dictionary
    
    to wrapper args...
        key = str(args)
        if key in cache
            say "Cache hit!"
            give cache[key]
        result = func(args...)
        cache[key] = result
        give result
    
    give wrapper

to slow_fibonacci n
    if n <= 1
        give n
    give slow_fibonacci(n - 1) + slow_fibonacci(n - 2)

fast_fibonacci = memoize(slow_fibonacci)
say fast_fibonacci(30)  # Much faster with memoization
```

## 4. Event-Driven Programming

### Event Emitters
```javascript
thing EventEmitter
    has listeners = a dictionary
    
    can on event_name, callback
        if not event_name in listeners
            listeners[event_name] = a list
        add callback to listeners[event_name]
    
    can emit event_name, data
        if event_name in listeners
            for callback in listeners[event_name]
                callback(data)

# Usage
emitter = new EventEmitter

to on_user_login user
    say "User logged in: " + user["name"]

to on_user_login_notify user
    notify "Login" user["name"] + " has logged in"

emitter.on("login", on_user_login)
emitter.on("login", on_user_login_notify)

emitter.emit("login", {"name": "Alice"})
```

## 5. Generators and Iterators

Using The Bridge for Python generators:

```javascript
use "itertools"

# Infinite counter
to count_forever start=0
    n = start
    forever
        yield n
        n += 1

# Take first N items
to take n, iterable
    result = a list
    count = 0
    for item in iterable
        if count >= n
            stop
        add item to result
        count += 1
    give result

# Use Python's itertools
numbers = itertools.count(1)
first_10 = list(itertools.islice(numbers, 10))
say first_10
```

## 6. Context Managers

Using The Bridge for resource management:

```javascript
use "contextlib"

# File handling with context
with open("data.txt", "r") as f
    content = f.read()
    say content
# File automatically closed

# Database transactions
db open "app.db"
try
    db exec "BEGIN TRANSACTION"
    db exec "INSERT INTO users (name) VALUES ('Alice')"
    db exec "INSERT INTO users (name) VALUES ('Bob')"
    db exec "COMMIT"
catch error
    db exec "ROLLBACK"
    say in red "Transaction failed: " + error
```

## 7. Threading and Parallelism

### Parallel Processing
```javascript
use "concurrent.futures"

to process_item item
    # Simulate work
    wait for 1 second
    give item * 2

items = [1, 2, 3, 4, 5]

# Process in parallel
with concurrent.futures.ThreadPoolExecutor() as executor
    results = list(executor.map(process_item, items))
    say results
```

### Thread Safety
```javascript
use "threading"

counter = 0
lock = threading.Lock()

to increment
    global counter
    for i in range 1000
        with lock
            counter += 1

# Create threads
threads = a list
for i in range 4
    t = threading.Thread(target=increment)
    add t to threads
    t.start()

# Wait for completion
for t in threads
    t.join()

say "Final count: " + str(counter)  # Should be 4000
```

## 8. Functional Programming Patterns

### Map, Filter, Reduce
```javascript
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Map: apply function to each element
doubled = a list
for n in numbers
    add n * 2 to doubled
say doubled  # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# Filter: keep elements matching condition
evens = a list
for n in numbers
    if n % 2 == 0
        add n to evens
say evens  # [2, 4, 6, 8, 10]

# Reduce: combine elements
total = 0
for n in numbers
    total += n
say total  # 55

# Using The Bridge for functional style
use "functools"
total = functools.reduce(fn a, b => a + b, numbers)
say total  # 55
```

### Composition
```javascript
to compose f, g
    to composed x
        give f(g(x))
    give composed

add_one = fn x => x + 1
double = fn x => x * 2

add_then_double = compose(double, add_one)
say add_then_double(5)  # 12 (5+1=6, 6*2=12)
```

## 9. Design Patterns

### Singleton Pattern
```javascript
thing Singleton
    has _instance = none
    has value = 0
    
    can get_instance
        if _instance is none
            _instance = new Singleton
        give _instance

# Usage
s1 = Singleton.get_instance()
s2 = Singleton.get_instance()
# s1 and s2 are the same instance
```

### Factory Pattern
```javascript
thing Animal
    has name
    can speak
        say "..."

thing Dog extends Animal
    can speak
        say "Woof!"

thing Cat extends Animal
    can speak
        say "Meow!"

to create_animal type, name
    if type == "dog"
        animal = new Dog
    elif type == "cat"
        animal = new Cat
    else
        animal = new Animal
    animal.name = name
    give animal

# Usage
pet1 = create_animal("dog", "Buddy")
pet2 = create_animal("cat", "Whiskers")
pet1.speak()  # Woof!
pet2.speak()  # Meow!
```

### Observer Pattern
```javascript
thing Subject
    has observers = a list
    has state = 0
    
    can attach observer
        add observer to observers
    
    can detach observer
        remove observer from observers
    
    can notify
        for observer in observers
            observer.update(state)
    
    can set_state new_state
        state = new_state
        notify()

thing Observer
    has name
    
    can update state
        say name + " received update: " + str(state)

# Usage
subject = new Subject

observer1 = new Observer
observer1.name = "Observer 1"

observer2 = new Observer
observer2.name = "Observer 2"

subject.attach(observer1)
subject.attach(observer2)

subject.set_state(42)
# Observer 1 received update: 42
# Observer 2 received update: 42
```

## 10. Best Practices Summary

1. **Use meaningful names**: Variables, functions, and classes should have descriptive names
2. **Keep functions small**: Each function should do one thing well
3. **Handle errors gracefully**: Use try/catch for operations that might fail
4. **Document your code**: Use comments to explain complex logic
5. **Use constants**: For values that don't change, use `const`
6. **Avoid global state**: Pass data through function parameters
7. **Test your code**: Write tests for critical functionality
8. **Use The Bridge wisely**: Python integration is powerful but adds complexity

---
[Next: Compilation and Performance ->](10_Compilation_and_Performance.md)
