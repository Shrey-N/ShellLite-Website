# Chapter 8: Web Development

ShellLite includes a dedicated Domain Specific Language (DSL) for building web applications. It reads like a description of a website.

## 1. The Structure
A Web App in ShellLite usually consists of:
1.  **Components**: Reusable UI parts.
2.  **Routes**: URLs that users visit.
3.  **Server**: The command to start listening.

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
```

## 3. Handling Routes
Tell the server what to do when a user visits a URL.

### GET Requests
```javascript
when someone visits "/"
    HomePage
```

### POST Requests (Forms)
```javascript
when someone submits to "/login"
    username = request.form["username"]
    say "User logged in: " + username
    HomePage
```



### Middleware (Before Request)
You can run code before every request, for example, to log activity or check authentication.

```javascript
before request
    say "Incoming request to: " + request.path
```

## 4. Serving Files
You can serve static files (images, CSS) from a folder.
```javascript
serve files from "public"
```

## 5. Starting the Server
Finally, bring it all to life.
```javascript
start server on port 8080
```
Now, open your browser to `http://localhost:8080`.

## Full Example

```javascript
# Simple Todo App

tasks = a list of "Buy Milk", "Walk Dog"

define page App
    h1 "My Tasks"
    ul
        for task in tasks
            li task
    
    form action="/add" method="post"
        input name="new_task"
        button "Add Task"

when someone visits "/"
    App

when someone submits to "/add"
    new_item = request.form["new_task"]
    add new_item to tasks
    App

start server on port 5000
```
