# Chapter 5: Functions & OOP

As your code gets longer, you'll want to organize it into reusable blocks.

## 1. Functions

A function is a block of code you can call by name.

### Defining Functions
Use `to`, `fn`, or `define function`.

```javascript
to greet name
    say "Hello, " + name

# Alternative syntax
fn greet name
    say "Hello, " + name

# Calling it
greet "Alice"
```

### Function Keywords
| Keyword | Alias | Description |
|:---|:---|:---|
| `to` | `can`, `fn` | Define a function |
| `return` | `give` | Return a value |
| `define function` | | Alternative syntax |

### Multiple Parameters
```javascript
to add_numbers a, b
    give a + b

result = add_numbers 5, 10
say result  # 15
```

### Default Arguments
You can set default values for arguments.
```javascript
to shout text, volume=10
    if volume > 5
        say text.upper()
    else
        say text

shout "hey"      # volume is 10
shout "hey", 1   # volume is 1
```

### Return Values
Use `return` or `give` to send data back.
```javascript
to add_numbers a, b
    give a + b

result = add_numbers 5, 10
say result
```

### Multiple Return Values
```javascript
to get_min_max numbers
    give [min(numbers), max(numbers)]

result = get_min_max [1, 5, 3, 9, 2]
say "Min: " + str(result[0]) + ", Max: " + str(result[1])
```

### Anonymous Functions (Lambdas)
For quick, one-line functions.
```javascript
square = fn x => x * x
say square(5)  # 25

# Using lambdas with higher-order functions
double = fn x => x * 2
```

### Functions as First-Class Citizens
Functions can be passed as arguments and returned from other functions.

```javascript
to apply_twice func, value
    give func(func(value))

double = fn x => x * 2
say apply_twice(double, 3)  # 12
```

### Closures
Functions can capture variables from their enclosing scope.

```javascript
to make_counter
    count = 0
    to increment
        count += 1
        give count
    give increment

counter = make_counter()
say counter()  # 1
say counter()  # 2
say counter()  # 3
```

## 2. Object-Oriented Programming (OOP)

OOP allows you to create your own "types" of data. In ShellLite, we use friendly terms, but traditional ones work too:

| Term | Aliases | Description |
|:---|:---|:---|
| **thing** | `structure`, `class` | Defines a new type (blueprint) |
| **has** | `with` | Defines a property (variable) |
| **can** | `to` | Defines a method (function) |
| **extends** | | Inherits from another class |
| **new** | `make` | Creates an instance |

### Defining a Thing (Class)
```javascript
thing Car
    has make
    has model
    has speed = 0

    can drive amount
        speed += amount
        say "Vroom! Going " + speed
```
*You can also write `structure Car` or `class Car` if you prefer.*

### Creating and Using Objects
Use `new` or `make` to create an instance of your Thing.

```javascript
my_car = new Car
# OR
my_car = make Car

my_car.make = "Tesla"
my_car.model = "Model S"
my_car.drive(50)  # "Vroom! Going 50"
my_car.drive(30)  # "Vroom! Going 80"
```

### Properties with Default Values
```javascript
thing Player
    has name = "Unknown"
    has health = 100
    has score = 0

player1 = new Player
say player1.health  # 100

player1.name = "Alice"
player1.score = 500
```

### Methods
Methods are functions defined inside a class.

```javascript
thing Calculator
    has value = 0

    can add n
        value += n

    can subtract n
        value -= n

    can get_value
        give value

calc = new Calculator
calc.add(10)
calc.subtract(3)
say calc.get_value()  # 7
```

### Inheritance
You can create a new Thing that builds upon an old Thing using `extends`.

```javascript
thing Vehicle
    has wheels = 4
    has speed = 0

    can accelerate amount
        speed += amount

thing Car extends Vehicle
    has make
    has model

thing Motorcycle extends Vehicle
    has wheels = 2  # Override default

my_car = new Car
my_car.accelerate(50)
say my_car.speed   # 50
say my_car.wheels  # 4

my_bike = new Motorcycle
say my_bike.wheels  # 2
```

### Method Overriding
Child classes can override parent methods.

```javascript
thing Animal
    can speak
        say "Some sound"

thing Dog extends Animal
    can speak
        say "Woof!"

thing Cat extends Animal
    can speak
        say "Meow!"

dog = new Dog
dog.speak()  # "Woof!"

cat = new Cat
cat.speak()  # "Meow!"
```

### Practical Example: Bank Account

```javascript
thing BankAccount
    has owner
    has balance = 0

    can deposit amount
        if amount > 0
            balance += amount
            say "Deposited " + str(amount)
        else
            say in red "Invalid deposit amount"

    can withdraw amount
        if amount > balance
            say in red "Insufficient funds"
        elif amount <= 0
            say in red "Invalid withdrawal amount"
        else
            balance -= amount
            say "Withdrew " + str(amount)

    can get_balance
        give balance

# Usage
account = new BankAccount
account.owner = "Alice"
account.deposit(1000)
account.withdraw(250)
say "Balance: $" + str(account.get_balance())  # Balance: $750
```

## 3. Built-in Object Methods

All objects have access to certain built-in capabilities:

```javascript
# Get type of an object
say typeof(my_car)  # "Car"

# Convert to string
say str(my_car)
```

## 4. Best Practices

### Naming Conventions
- Use `snake_case` for variables and functions: `my_variable`, `calculate_total`
- Use `PascalCase` for classes/things: `BankAccount`, `GamePlayer`
- Use `SCREAMING_SNAKE_CASE` for constants: `MAX_VALUE`, `PI`

### Keep Functions Small
Each function should do one thing well.

```javascript
# Good: Single responsibility
to calculate_area width, height
    give width * height

to calculate_perimeter width, height
    give 2 * (width + height)

# Less ideal: Multiple responsibilities in one function
to do_everything width, height
    area = width * height
    perimeter = 2 * (width + height)
    say "Area: " + str(area)
    say "Perimeter: " + str(perimeter)
    give [area, perimeter]
```

### Use Meaningful Names
```javascript
# Good
to calculate_monthly_payment principal, rate, years
    # ...

# Less clear
to calc p, r, y
    # ...
```

---
[Next: Modules & Standard Library ->](06_Modules_and_StdLib.md)
