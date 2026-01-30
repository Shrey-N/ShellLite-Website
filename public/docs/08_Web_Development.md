# Chapter 8: Web Development

ShellLite includes a dedicated Domain Specific Language (DSL) for building web applications. It reads like a description of a website.

## 1. The Structure

A Web App in ShellLite usually consists of:
1.  **Components/Pages**: Reusable UI parts
2.  **Routes**: URLs that users visit
3.  **Middleware**: Code that runs before requests
4.  **Server**: The command to start listening

## 2. Defining Pages

Use `define page` to create HTML structures using English words.

```javascript
define page HomePage
    h1 "Welcome to My Site"
    p "Built with ShellLite."
    button "Click Me"
```

You can nest elements naturally using indentation.
```javascript
define page List
    ul
        li "Item 1"
        li "Item 2"
        li "Item 3"
```

### Available HTML Elements
| Element | Description |
|:---|:---|
| `h1` - `h6` | Headings |
| `p` | Paragraph |
| `div` | Division/container |
| `span` | Inline container |
| `a` | Link |
| `img` | Image |
| `ul`, `ol` | Lists |
| `li` | List item |
| `button` | Button |
| `input` | Input field |
| `form` | Form container |
| `table`, `tr`, `td` | Table elements |

### Element Attributes
```javascript
define page ContactPage
    h1 "Contact Us"
    
    form action="/submit" method="post"
        input name="email" placeholder="Your email"
        input name="message" placeholder="Your message"
        button "Send"
    
    a href="/" "Back to Home"
    img src="/logo.png" alt="Company Logo"
```

## 3. Handling Routes

Tell the server what to do when a user visits a URL.

### GET Requests
```javascript
when someone visits "/"
    HomePage

when someone visits "/about"
    define page AboutPage
        h1 "About Us"
        p "We are a great company."
    AboutPage

when someone visits "/users"
    users = db query "SELECT * FROM users"
    define page UsersPage
        h1 "All Users"
        ul
            for user in users
                li user["name"]
    UsersPage
```

### POST Requests (Forms)
```javascript
when someone submits to "/login"
    username = request.form["username"]
    password = request.form["password"]
    
    # Validate credentials
    if username == "admin" and password == "secret"
        say "User logged in: " + username
        DashboardPage
    else
        define page ErrorPage
            h1 "Login Failed"
            p "Invalid credentials"
        ErrorPage
```

### URL Parameters
```javascript
when someone visits "/user/:id"
    user_id = request.params["id"]
    user = db query "SELECT * FROM users WHERE id = ?", [user_id]
    
    define page UserProfile
        h1 "User Profile"
        p "ID: " + str(user_id)
    UserProfile
```

## 4. Middleware (Before Request)

You can run code before every request, for example, to log activity or check authentication.

```javascript
before request
    say "Incoming request to: " + request.path
    say "Method: " + request.method
```

### Authentication Middleware
```javascript
before request
    # Check if user is logged in for protected routes
    if request.path.startswith("/admin")
        if not request.session.get("logged_in")
            # Redirect to login
            redirect "/login"
```

## 5. Serving Static Files

You can serve static files (images, CSS, JavaScript) from a folder.
```javascript
serve files from "public"
serve static from "assets"
```

This makes all files in the `public` or `assets` folder accessible via URL.

## 6. Starting the Server

Finally, bring it all to life.
```javascript
start server on port 8080
```
Now, open your browser to `http://localhost:8080`.

### Server Options
```javascript
# Different ports
start server on port 3000
start server on port 5000

# Listen on port (alternative syntax)
listen on port 8080
```

## 7. Request Object

The `request` object contains information about the incoming request.

| Property | Description |
|:---|:---|
| `request.path` | URL path (e.g., "/users") |
| `request.method` | HTTP method (GET, POST, etc.) |
| `request.form` | Form data (POST requests) |
| `request.params` | URL parameters |
| `request.headers` | HTTP headers |
| `request.query` | Query string parameters |

```javascript
when someone visits "/search"
    query = request.query.get("q", "")
    say "Searching for: " + query
    # ... perform search
```

## 8. Building Forms

Create interactive forms easily.

```javascript
define page ContactForm
    h1 "Contact Us"
    
    form action="/contact" method="post"
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

when someone visits "/contact"
    ContactForm

when someone submits to "/contact"
    name = request.form["name"]
    email = request.form["email"]
    message = request.form["message"]
    
    # Save to database
    db exec "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)", [name, email, message]
    
    define page ThankYou
        h1 "Thank You!"
        p "We'll get back to you soon, " + name
    ThankYou
```

## 9. JSON APIs

Build REST APIs easily.

```javascript
when someone visits "/api/users"
    users = db query "SELECT * FROM users"
    give convert users to json

when someone submits to "/api/users"
    data = json.parse(request.body)
    db exec "INSERT INTO users (name, email) VALUES (?, ?)", [data["name"], data["email"]]
    give convert {"status": "created"} to json
```

## 10. Full Example: Todo App

```javascript
# Simple Todo App

tasks = a list of "Buy Milk", "Walk Dog"

define page App
    h1 "My Tasks"
    
    ul
        for task in tasks
            li task
    
    form action="/add" method="post"
        input name="new_task" placeholder="New task..."
        button "Add Task"

define page Added
    h1 "Task Added!"
    p "Redirecting..."
    a href="/" "Back to list"

when someone visits "/"
    App

when someone submits to "/add"
    new_item = request.form["new_task"]
    if new_item
        add new_item to tasks
    Added

start server on port 5000
```

## 11. Full Example: Blog

```javascript
# Simple Blog

db open "blog.db"
db exec "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"

define page Layout title, content
    html
        head
            title title
            link rel="stylesheet" href="/style.css"
        body
            nav
                a href="/" "Home"
                a href="/new" "New Post"
            main
                content

define page HomePage
    h1 "My Blog"
    posts = db query "SELECT * FROM posts ORDER BY created_at DESC"
    for post in posts
        article
            h2 post["title"]
            p post["content"]

define page NewPost
    h1 "Create New Post"
    form action="/create" method="post"
        input name="title" placeholder="Post title"
        textarea name="content" placeholder="Write your post..."
        button "Publish"

when someone visits "/"
    HomePage

when someone visits "/new"
    NewPost

when someone submits to "/create"
    title = request.form["title"]
    content = request.form["content"]
    db exec "INSERT INTO posts (title, content) VALUES (?, ?)", [title, content]
    redirect "/"

serve files from "public"
start server on port 3000
```

## 12. The Canvas (GUI Applications)

ShellLite also supports building native desktop GUI applications with **The Canvas**.

```javascript
# Create a simple GUI app
app "My Application" size 400, 300

column
    heading "Welcome!"
    
    row
        button "Click Me" on_click show_message
        button "Exit" on_click exit_app

to show_message
    alert "Hello from ShellLite!"

to exit_app
    exit
```

### Canvas Elements
| Element | Description |
|:---|:---|
| `app` | Define application window |
| `column` | Vertical layout |
| `row` | Horizontal layout |
| `button` | Clickable button |
| `heading` | Text heading |
| `input` | Text input field |
| `label` | Text label |

---
[Next: Advanced Features ->](09_Advanced_Features.md)
