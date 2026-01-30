# Chapter 16: Examples and Tutorials

Learn ShellLite through practical, real-world examples. Each project builds progressively in complexity.

## Tutorial 1: Hello World and Basics

### Your First Program
```javascript
# hello.shl
say "Hello, World!"
```

Run it:
```bash
shl hello.shl
```

### Interactive Greeting
```javascript
# greeting.shl
name = ask "What's your name? "
say "Hello, {name}! Welcome to ShellLite."

age = ask "How old are you? "
age = int(age)

if age >= 18
    say "You're an adult!"
else
    say "You're still young!"
```

### Simple Calculator
```javascript
# calculator.shl
say "Simple Calculator"
say "================"

a = int(ask "Enter first number: ")
op = ask "Enter operation (+, -, *, /): "
b = int(ask "Enter second number: ")

if op == "+"
    result = a + b
elif op == "-"
    result = a - b
elif op == "*"
    result = a * b
elif op == "/"
    if b != 0
        result = a / b
    else
        say in red "Error: Cannot divide by zero!"
        exit
else
    say in red "Unknown operation!"
    exit

say "Result: {a} {op} {b} = {result}"
```

## Tutorial 2: Working with Data

### Todo List Manager
```javascript
# todo.shl
tasks = a list
const FILE_NAME = "tasks.txt"

# Load existing tasks
if exists(FILE_NAME)
    content = read file FILE_NAME
    lines = split(content, "\n")
    for line in lines
        if len(trim(line)) > 0
            add trim(line) to tasks

to save_tasks
    content = join(tasks, "\n")
    write content to file FILE_NAME
    say in green "Tasks saved!"

to show_tasks
    say "\n=== Your Tasks ==="
    if empty(tasks)
        say "No tasks yet!"
    else
        count = 1
        for task in tasks
            say str(count) + ". " + task
            count += 1
    say ""

to add_task
    task = ask "Enter new task: "
    if len(trim(task)) > 0
        add task to tasks
        save_tasks()
        say in green "Task added!"
    else
        say in red "Task cannot be empty!"

to remove_task
    show_tasks()
    if not empty(tasks)
        index = int(ask "Enter task number to remove: ")
        if index >= 1 and index <= len(tasks)
            removed = tasks[index - 1]
            tasks.remove(removed)
            save_tasks()
            say in green "Removed: " + removed
        else
            say in red "Invalid task number!"

# Main loop
say "=== Todo List Manager ==="
forever
    say "\n1. Show tasks"
    say "2. Add task"
    say "3. Remove task"
    say "4. Exit"
    
    choice = ask "Choose option: "
    
    when choice
        is "1"
            show_tasks()
        is "2"
            add_task()
        is "3"
            remove_task()
        is "4"
            say "Goodbye!"
            exit
        otherwise
            say in red "Invalid option!"
```

### Address Book
```javascript
# address_book.shl
contacts = a dictionary

to add_contact
    name = ask "Name: "
    phone = ask "Phone: "
    email = ask "Email: "
    
    contacts[name] = {
        "phone": phone,
        "email": email
    }
    say in green "Contact added!"

to find_contact
    name = ask "Enter name to search: "
    if name in contacts
        contact = contacts[name]
        say "\n=== Contact Found ==="
        say "Name: " + name
        say "Phone: " + contact["phone"]
        say "Email: " + contact["email"]
    else
        say in red "Contact not found!"

to list_contacts
    say "\n=== All Contacts ==="
    if len(contacts) == 0
        say "No contacts yet!"
    else
        for name in contacts
            say "- " + name

# Main menu
forever
    say "\n1. Add contact"
    say "2. Find contact"
    say "3. List all"
    say "4. Exit"
    
    choice = ask "Choose: "
    
    when choice
        is "1"
            add_contact()
        is "2"
            find_contact()
        is "3"
            list_contacts()
        is "4"
            exit
```

## Tutorial 3: File Processing

### Word Counter
```javascript
# word_counter.shl
filename = ask "Enter filename: "

if not exists(filename)
    say in red "File not found!"
    exit

content = read file filename
content = lower(content)

# Count words
words = split(content, " ")
word_count = len(words)

# Count lines
lines = split(content, "\n")
line_count = len(lines)

# Count characters
char_count = len(content)

# Count unique words
unique_words = a dictionary
for word in words
    cleaned = trim(word)
    if len(cleaned) > 0
        if cleaned in unique_words
            unique_words[cleaned] += 1
        else
            unique_words[cleaned] = 1

say "\n=== File Statistics ==="
say "Lines: " + str(line_count)
say "Words: " + str(word_count)
say "Characters: " + str(char_count)
say "Unique words: " + str(len(unique_words))

say "\n=== Top 10 Words ==="
# Simple top 10 (not sorted, just first 10)
count = 0
for word in unique_words
    if count < 10
        say word + ": " + str(unique_words[word])
        count += 1
```

### Log File Analyzer
```javascript
# log_analyzer.shl
filename = ask "Enter log filename: "

if not exists(filename)
    say in red "Log file not found!"
    exit

content = read file filename
lines = split(content, "\n")

errors = a list
warnings = a list
info_count = 0

for line in lines
    if "ERROR" in line
        add line to errors
    elif "WARNING" in line
        add line to warnings
    elif "INFO" in line
        info_count += 1

say "\n=== Log Analysis ==="
say "Total lines: " + str(len(lines))
say "Info messages: " + str(info_count)
say "Warnings: " + str(len(warnings))
say "Errors: " + str(len(errors))

if len(errors) > 0
    say "\n=== Errors Found ==="
    for error in errors
        say in red error

if len(warnings) > 0
    say "\n=== Warnings Found ==="
    for warning in warnings
        say in yellow warning
```

### CSV Data Processor
```javascript
# csv_processor.shl
data = load csv "data.csv"

say "Loaded " + str(len(data)) + " records"
say "Columns: " + str(list(data[0].keys()))

# Filter example
filtered = a list
for row in data
    if int(row["age"]) >= 18
        add row to filtered

say "Adults: " + str(len(filtered))

# Calculate average
total_age = 0
for row in data
    total_age += int(row["age"])
avg_age = total_age / len(data)

say "Average age: " + str(round(avg_age, 2))

# Save processed data
save filtered to csv "adults.csv"
say in green "Saved to adults.csv"
```

## Tutorial 4: Web Applications

### Simple Web Server
```javascript
# simple_web.shl
visitors = 0

define page HomePage
    h1 "Welcome to My Site"
    p "You are visitor #" + str(visitors)
    a href="/about" "About Us"

define page AboutPage
    h1 "About"
    p "This is a ShellLite web application."
    a href="/" "Back Home"

when someone visits "/"
    visitors += 1
    HomePage

when someone visits "/about"
    AboutPage

say "Starting server on http://localhost:8080"
start server on port 8080
```

### Contact Form
```javascript
# contact_form.shl
messages = a list

define page ContactPage
    h1 "Contact Us"
    
    form action="/submit" method="post"
        div
            label "Name:"
            input name="name" placeholder="Your name" required="true"
        div
            label "Email:"
            input name="email" type="email" placeholder="your@email.com"
        div
            label "Message:"
            textarea name="message" rows="5" placeholder="Your message"
        button type="submit" "Send Message"

define page ThankYouPage name
    h1 "Thank You!"
    p "Thanks for your message, " + name + "!"
    p "We'll get back to you soon."
    a href="/" "Send another message"

when someone visits "/"
    ContactPage

when someone submits to "/submit"
    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]
    
    # Save message
    add {"name": name, "email": email, "message": message} to messages
    
    # Log it
    say "New message from: " + name
    
    ThankYouPage(name)

start server on port 8080
```

### REST API
```javascript
# api.shl
use "json"

# In-memory data store
items = [
    {"id": 1, "name": "Item 1", "price": 10.99},
    {"id": 2, "name": "Item 2", "price": 20.99}
]
next_id = 3

# Get all items
when someone visits "/api/items"
    give convert items to json

# Get single item
when someone visits "/api/items/:id"
    item_id = int(request.params["id"])
    for item in items
        if item["id"] == item_id
            give convert item to json
    give convert {"error": "Not found"} to json, 404

# Create item
when someone submits to "/api/items"
    global next_id
    data = json.parse(request.body)
    
    new_item = {
        "id": next_id,
        "name": data["name"],
        "price": data["price"]
    }
    add new_item to items
    next_id += 1
    
    give convert new_item to json, 201

say "API running on http://localhost:3000"
start server on port 3000
```

## Tutorial 5: Games

### Number Guessing Game
```javascript
# guess_game.shl
use "random"

say "=== Number Guessing Game ==="
say "I'm thinking of a number between 1 and 100."

secret = randint(1, 100)
attempts = 0
max_attempts = 7

while attempts < max_attempts
    remaining = max_attempts - attempts
    say "\nAttempts remaining: " + str(remaining)
    
    guess = int(ask "Your guess: ")
    attempts += 1
    
    if guess == secret
        say in green "\nCongratulations! You got it in " + str(attempts) + " attempts!"
        exit
    elif guess < secret
        say "Too low!"
    else
        say "Too high!"

say in red "\nGame Over! The number was " + str(secret)
```

### Rock Paper Scissors
```javascript
# rps.shl
use "random"

choices = ["rock", "paper", "scissors"]
player_wins = 0
computer_wins = 0

to get_winner player, computer
    if player == computer
        give "tie"
    
    if player == "rock"
        if computer == "scissors"
            give "player"
        else
            give "computer"
    elif player == "paper"
        if computer == "rock"
            give "player"
        else
            give "computer"
    else  # scissors
        if computer == "paper"
            give "player"
        else
            give "computer"

say "=== Rock Paper Scissors ==="
say "Enter 'quit' to exit.\n"

forever
    player_choice = lower(ask "Choose (rock/paper/scissors): ")
    
    if player_choice == "quit"
        stop
    
    if not contains(choices, player_choice)
        say in red "Invalid choice!"
        skip
    
    computer_choice = choices[randint(0, 2)]
    say "Computer chose: " + computer_choice
    
    winner = get_winner(player_choice, computer_choice)
    
    if winner == "tie"
        say "It's a tie!"
    elif winner == "player"
        say in green "You win!"
        player_wins += 1
    else
        say in red "Computer wins!"
        computer_wins += 1
    
    say "Score - You: " + str(player_wins) + " | Computer: " + str(computer_wins) + "\n"

say "\n=== Final Score ==="
say "You: " + str(player_wins)
say "Computer: " + str(computer_wins)
```

### Text Adventure Game
```javascript
# adventure.shl
player = {
    "health": 100,
    "inventory": [],
    "location": "start"
}

rooms = {
    "start": {
        "description": "You are in a dark forest. Paths lead north and east.",
        "north": "cave",
        "east": "river",
        "item": "torch"
    },
    "cave": {
        "description": "A dark cave. You hear dripping water. Path leads south.",
        "south": "start",
        "item": "sword"
    },
    "river": {
        "description": "A peaceful river flows by. Paths lead west and north.",
        "west": "start",
        "north": "village",
        "item": "fish"
    },
    "village": {
        "description": "A small village. The adventure ends here. Congratulations!",
        "south": "river"
    }
}

to show_status
    say "\n" + "=" * 50
    room = rooms[player["location"]]
    say room["description"]
    
    if "item" in room and room["item"] not in player["inventory"]
        say "You see a " + room["item"] + " here."
    
    say "\nHealth: " + str(player["health"])
    say "Inventory: " + str(player["inventory"])
    say "=" * 50

to move direction
    room = rooms[player["location"]]
    if direction in room
        player["location"] = room[direction]
        say "You move " + direction + "."
        show_status()
    else
        say "You can't go that way!"

to take_item
    room = rooms[player["location"]]
    if "item" in room and room["item"] not in player["inventory"]
        item = room["item"]
        add item to player["inventory"]
        say in green "You picked up the " + item + "!"
    else
        say "Nothing to take here."

say "=== Text Adventure ==="
say "Commands: north, south, east, west, take, status, quit"
show_status()

forever
    command = lower(ask "\n> ")
    
    when command
        is "north"
            move "north"
        is "south"
            move "south"
        is "east"
            move "east"
        is "west"
            move "west"
        is "take"
            take_item()
        is "status"
            show_status()
        is "quit"
            say "Thanks for playing!"
            exit
        otherwise
            say "Unknown command."
    
    if player["location"] == "village"
        say in green "\n*** You Win! ***"
        exit
```

## Tutorial 6: Utility Scripts

### Batch File Renamer
```javascript
# renamer.shl
folder = ask "Enter folder path: "
prefix = ask "Enter new prefix: "

files = listdir(folder)
count = 0

for filename in files
    if not filename.startswith(".")
        # Get extension
        parts = split(filename, ".")
        if len(parts) > 1
            ext = parts[-1]
            new_name = prefix + "_" + str(count) + "." + ext
            
            old_path = folder + "/" + filename
            new_path = folder + "/" + new_name
            
            rename(old_path, new_path)
            say "Renamed: " + filename + " -> " + new_name
            count += 1

say in green "\nRenamed " + str(count) + " files."
```

### Password Generator
```javascript
# password_gen.shl
use "random"

lowercase = "abcdefghijklmnopqrstuvwxyz"
uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
digits = "0123456789"
special = "!@#$%^&*()_+-=[]{}|;:,.<>?"

to generate_password length, use_upper=yes, use_digits=yes, use_special=yes
    chars = lowercase
    
    if use_upper
        chars += uppercase
    if use_digits
        chars += digits
    if use_special
        chars += special
    
    password = ""
    for i in range 0 length
        index = randint(0, len(chars) - 1)
        password += chars[index]
    
    give password

# Get user preferences
length = int(ask "Password length (default 16): " or "16")
use_upper = lower(ask "Include uppercase? (y/n): ") == "y"
use_digits = lower(ask "Include numbers? (y/n): ") == "y"
use_special = lower(ask "Include special characters? (y/n): ") == "y"

say "\n=== Generated Passwords ==="
repeat 5 times
    pw = generate_password(length, use_upper, use_digits, use_special)
    say pw
```

### System Monitor
```javascript
# monitor.shl
use "os"
use "datetime"

to get_timestamp
    give datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

to log_status
    timestamp = get_timestamp()
    
    # Get basic info
    cpu_count = os.cpu_count()
    
    say "\n[" + timestamp + "]"
    say "CPU Cores: " + str(cpu_count)
    
    # List running processes (simplified)
    files_in_temp = listdir(os.environ.get("TEMP", "/tmp"))
    say "Temp files: " + str(len(files_in_temp))

say "=== System Monitor ==="
say "Press Ctrl+C to stop.\n"

forever
    log_status()
    wait 5 seconds
```

## Tutorial 7: Data Analysis with The Bridge

### Analyze Sales Data
```javascript
# sales_analysis.shl
use "pandas" as pd

# Load data
say "Loading sales data..."
df = pd.read_csv("sales.csv")

say "\n=== Sales Report ==="
say "Total records: " + str(len(df))

# Calculate totals
total_sales = df["amount"].sum()
say "Total sales: $" + str(round(total_sales, 2))

# Average by category
say "\n=== Sales by Category ==="
by_category = df.groupby("category")["amount"].sum()
say str(by_category)

# Top products
say "\n=== Top 5 Products ==="
top_products = df.groupby("product")["amount"].sum().nlargest(5)
say str(top_products)

# Save summary
summary = df.describe()
summary.to_csv("sales_summary.csv")
say in green "\nSummary saved to sales_summary.csv"
```

---
[Next: Best Practices ->](17_Best_Practices.md)
