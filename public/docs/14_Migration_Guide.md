# Chapter 14: Migration Guide

Coming from another programming language? This guide helps you transition to ShellLite by showing equivalent patterns and concepts.

## 1. Coming from Python

ShellLite was designed with Python-like simplicity. Many concepts translate directly.

### Variables and Assignment
```python
# Python
name = "Alice"
age = 30
is_active = True
```

```javascript
# ShellLite
name = "Alice"
age = 30
is_active = yes  # or 'true'
```

### Print Statements
```python
# Python
print("Hello, World!")
print(f"Name: {name}")
```

```javascript
# ShellLite
say "Hello, World!"
say "Name: {name}"
```

### Conditionals
```python
# Python
if score > 90:
    print("A")
elif score > 80:
    print("B")
else:
    print("C")
```

```javascript
# ShellLite
if score > 90
    say "A"
elif score > 80
    say "B"
else
    say "C"
```

### Loops
```python
# Python - for loop
for i in range(5):
    print(i)

for item in items:
    print(item)

# Python - while loop
while count > 0:
    count -= 1
```

```javascript
# ShellLite - for loop
for i in range 0 5
    say i

for item in items
    say item

# ShellLite - while loop
while count > 0
    count -= 1
```

### Functions
```python
# Python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

result = greet("Alice")
```

```javascript
# ShellLite
to greet name, greeting="Hello"
    give greeting + ", " + name + "!"

result = greet "Alice"
```

### Classes
```python
# Python
class Car:
    def __init__(self):
        self.speed = 0
    
    def drive(self, amount):
        self.speed += amount
        print(f"Speed: {self.speed}")
```

```javascript
# ShellLite
thing Car
    has speed = 0
    
    can drive amount
        speed += amount
        say "Speed: " + str(speed)
```

### Lists and Dictionaries
```python
# Python
items = [1, 2, 3]
items.append(4)

data = {"name": "Alice", "age": 30}
print(data["name"])
```

```javascript
# ShellLite
items = [1, 2, 3]
add 4 to items

data = {"name": "Alice", "age": 30}
say data["name"]
```

### Try/Except
```python
# Python
try:
    result = risky_operation()
except Exception as e:
    print(f"Error: {e}")
finally:
    cleanup()
```

```javascript
# ShellLite
try
    result = risky_operation()
catch error
    say "Error: " + str(error)
always
    cleanup()
```

### Key Differences from Python
| Python | ShellLite | Notes |
|:---|:---|:---|
| `True/False` | `yes/no` | Both also accept true/false |
| `def func():` | `to func` | No colon needed |
| `return` | `return` or `give` | Both work |
| `class X:` | `thing X` | Also: structure, class |
| `self.attr` | `attr` | No explicit self |
| `print()` | `say` | Also: print, show |
| `input()` | `ask` | Also: input |
| `None` | `none` | Null value |

## 2. Coming from JavaScript

### Variables
```javascript
// JavaScript
let name = "Alice";
const PI = 3.14159;
var oldStyle = "don't use";
```

```javascript
# ShellLite
name = "Alice"
const PI = 3.14159
# No 'let' or 'var' keywords needed
```

### Printing
```javascript
// JavaScript
console.log("Hello");
console.log(`Name: ${name}`);
```

```javascript
# ShellLite
say "Hello"
say "Name: {name}"
```

### Functions
```javascript
// JavaScript
function greet(name) {
    return "Hello, " + name;
}

const arrow = (x) => x * 2;
```

```javascript
# ShellLite
to greet name
    give "Hello, " + name

arrow = fn x => x * 2
```

### Conditionals
```javascript
// JavaScript
if (score > 90) {
    console.log("A");
} else if (score > 80) {
    console.log("B");
} else {
    console.log("C");
}
```

```javascript
# ShellLite
if score > 90
    say "A"
elif score > 80
    say "B"
else
    say "C"
```

### Loops
```javascript
// JavaScript
for (let i = 0; i < 5; i++) {
    console.log(i);
}

for (const item of items) {
    console.log(item);
}

while (count > 0) {
    count--;
}
```

```javascript
# ShellLite
for i in range 0 5
    say i

for item in items
    say item

while count > 0
    count -= 1
```

### Objects/Classes
```javascript
// JavaScript
class Car {
    constructor() {
        this.speed = 0;
    }
    
    drive(amount) {
        this.speed += amount;
        console.log(`Speed: ${this.speed}`);
    }
}
```

```javascript
# ShellLite
thing Car
    has speed = 0
    
    can drive amount
        speed += amount
        say "Speed: " + str(speed)
```

### Arrays and Objects
```javascript
// JavaScript
const items = [1, 2, 3];
items.push(4);

const data = {name: "Alice", age: 30};
console.log(data.name);
```

```javascript
# ShellLite
items = [1, 2, 3]
add 4 to items

data = {"name": "Alice", "age": 30}
say data["name"]
```

### Key Differences from JavaScript
| JavaScript | ShellLite | Notes |
|:---|:---|:---|
| `{...}` blocks | Indentation | Python-style blocks |
| `;` semicolons | None needed | Line-based |
| `let/const/var` | Just `=` or `const` | Simpler |
| `===` | `==` or `is` | No strict equality |
| `true/false` | `yes/no` | Both work |
| `console.log()` | `say` | Simpler |
| `this.` | Not needed | Implicit in methods |
| `null/undefined` | `none` | Single null type |

## 3. Coming from Java/C#

### Variables and Types
```java
// Java
String name = "Alice";
int age = 30;
boolean active = true;
final double PI = 3.14159;
```

```javascript
# ShellLite (dynamically typed)
name = "Alice"
age = 30
active = yes
const PI = 3.14159
```

### Printing
```java
// Java
System.out.println("Hello");
System.out.println("Name: " + name);
```

```javascript
# ShellLite
say "Hello"
say "Name: " + name
# or with interpolation:
say "Name: {name}"
```

### Functions/Methods
```java
// Java
public int add(int a, int b) {
    return a + b;
}
```

```javascript
# ShellLite
to add a, b
    give a + b
```

### Classes
```java
// Java
public class Car {
    private int speed = 0;
    
    public void drive(int amount) {
        this.speed += amount;
        System.out.println("Speed: " + this.speed);
    }
}

Car myCar = new Car();
myCar.drive(50);
```

```javascript
# ShellLite
thing Car
    has speed = 0
    
    can drive amount
        speed += amount
        say "Speed: " + str(speed)

my_car = new Car
my_car.drive 50
```

### Inheritance
```java
// Java
public class SportsCar extends Car {
    public void turbo() {
        this.speed += 100;
    }
}
```

```javascript
# ShellLite
thing SportsCar extends Car
    can turbo
        speed += 100
```

### Control Flow
```java
// Java
if (score > 90) {
    System.out.println("A");
} else if (score > 80) {
    System.out.println("B");
}

for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

for (String item : items) {
    System.out.println(item);
}
```

```javascript
# ShellLite
if score > 90
    say "A"
elif score > 80
    say "B"

for i in range 0 5
    say i

for item in items
    say item
```

### Key Differences from Java/C#
| Java/C# | ShellLite | Notes |
|:---|:---|:---|
| Type declarations | None needed | Dynamically typed |
| `{}` braces | Indentation | Python-style |
| `;` semicolons | None | Line-based |
| `public/private` | Not needed | No access modifiers |
| `new ClassName()` | `new ClassName` | No parentheses required |
| `System.out.println` | `say` | Much simpler |
| `// comment` | `# comment` | Hash for comments |

## 4. Coming from Ruby

Ruby and ShellLite share many philosophies about readability.

### Variables
```ruby
# Ruby
name = "Alice"
@instance_var = 10
CONSTANT = 3.14
```

```javascript
# ShellLite
name = "Alice"
# No @ prefix for instance variables
const CONSTANT = 3.14
```

### Output
```ruby
# Ruby
puts "Hello"
print "No newline"
```

```javascript
# ShellLite
say "Hello"
# say always adds newline
```

### Conditionals
```ruby
# Ruby
if score > 90
  puts "A"
elsif score > 80
  puts "B"
else
  puts "C"
end

unless tired
  puts "Keep going!"
end
```

```javascript
# ShellLite
if score > 90
    say "A"
elif score > 80
    say "B"
else
    say "C"

unless tired
    say "Keep going!"
```

### Loops
```ruby
# Ruby
5.times do
  puts "Hello"
end

items.each do |item|
  puts item
end
```

```javascript
# ShellLite
repeat 5 times
    say "Hello"

for item in items
    say item
```

### Methods/Functions
```ruby
# Ruby
def greet(name)
  "Hello, #{name}!"
end
```

```javascript
# ShellLite
to greet name
    give "Hello, " + name + "!"
```

### Classes
```ruby
# Ruby
class Car
  attr_accessor :speed
  
  def initialize
    @speed = 0
  end
  
  def drive(amount)
    @speed += amount
    puts "Speed: #{@speed}"
  end
end
```

```javascript
# ShellLite
thing Car
    has speed = 0
    
    can drive amount
        speed += amount
        say "Speed: " + str(speed)
```

## 5. Quick Reference Translation Table

### Common Operations
| Operation | Python | JavaScript | Java | ShellLite |
|:---|:---|:---|:---|:---|
| Print | `print(x)` | `console.log(x)` | `System.out.println(x)` | `say x` |
| Input | `input()` | `prompt()` | `Scanner.nextLine()` | `ask "?"` |
| Define function | `def f():` | `function f()` | `void f()` | `to f` |
| Return | `return x` | `return x` | `return x` | `give x` |
| If | `if x:` | `if (x) {` | `if (x) {` | `if x` |
| Else if | `elif x:` | `} else if (x) {` | `} else if (x) {` | `elif x` |
| For loop | `for i in range(n):` | `for (i=0;i<n;i++)` | `for (i=0;i<n;i++)` | `for i in range 0 n` |
| For each | `for x in list:` | `for (x of list)` | `for (x : list)` | `for x in list` |
| While | `while x:` | `while (x) {` | `while (x) {` | `while x` |
| True/False | `True/False` | `true/false` | `true/false` | `yes/no` |
| Null | `None` | `null` | `null` | `none` |
| And/Or | `and/or` | `&&/\|\|` | `&&/\|\|` | `and/or` |
| Not | `not x` | `!x` | `!x` | `not x` |
| Class | `class X:` | `class X {` | `class X {` | `thing X` |
| New object | `X()` | `new X()` | `new X()` | `new X` |
| Comment | `# text` | `// text` | `// text` | `# text` |

### Data Types
| Type | Python | JavaScript | Java | ShellLite |
|:---|:---|:---|:---|:---|
| Integer | `int` | `number` | `int` | Number |
| Float | `float` | `number` | `double` | Number |
| String | `str` | `string` | `String` | String |
| Boolean | `bool` | `boolean` | `boolean` | Boolean (yes/no) |
| List/Array | `list` | `Array` | `ArrayList` | List |
| Dictionary | `dict` | `Object` | `HashMap` | Dictionary |
| None/Null | `None` | `null` | `null` | `none` |

## 6. ShellLite Unique Features

### Natural Language Alternatives
```javascript
# These are equivalent:
if score > 50
if score is more than 50
if the score is greater than 50

# Boolean literals
active = yes
active = true

# Return statements
return value
give value
```

### English-like Syntax
```javascript
# Pattern matching
when day
    is "Monday"
        say "Start of week"
    otherwise
        say "Regular day"

# Loops
repeat 5 times
    say "Hello"

until count == 0
    count -= 1

forever
    say "Running..."
    wait 1 second
```

### The Bridge (Python Integration)
```javascript
# Use any Python library
use "pandas" as pd
use "requests"

data = pd.read_csv("data.csv")
response = requests.get("https://api.example.com")
```

---
[Next: Troubleshooting ->](15_Troubleshooting.md)
