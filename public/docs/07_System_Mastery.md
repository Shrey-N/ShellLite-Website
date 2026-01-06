# Chapter 7: System Mastery

ShellLite is designed for automation. It gives you deep control over your files and your desktop.

## 1. File System
Reading and writing files is incredibly simple, using natural language.

### Writing Files
```javascript
write "Hello World" to file "log.txt"
```
*Note: This overwrites the file.*

### Appending to Files
```javascript
append "New Entry" to file "log.txt"
```
*Adds to the end of the file.*

### Reading Files
```javascript
content = read file "log.txt"
say content
```

### Regex Matching
You can search file contents easily.
```javascript
if content matches /Error/
    say "Found an error in the log!"
```

## 2. Desktop Automation
ShellLite can control your mouse and keyboard, allowing you to automate repetitive tasks.

### Keyboard
```javascript
type "Hello"
press "enter"
```

### Mouse
```javascript
click at 100, 200
```
*Coordinates are X, Y pixels from the top-left of the screen.*

### Clipboard
```javascript
copy "Important Data" to clipboard
text = paste from clipboard
```

### System Notifications
Send a native Windows notification.
```javascript
notify "Backup Complete" "Your files are safe."
```

## 3. Asynchronous Tasks
If you have a slow task (like downloading a large file), you don't want to freeze your whole program. Use `spawn` to run it in the background.

```javascript
to download_large_file
    wait for 5 seconds
    give "Download Complete"

# Run in background
task = spawn download_large_file

say "Doing other work..."

# Wait for result when you need it
result = await task
say result
```



## 4. Downloading Files
You can download files directly from the web.
```javascript
download "https://example.com/image.png"
# You can also rename it on save (not always supported by natural syntax yet, but acts like wget)
```

## 5. compressing and Extracting
Manage `.zip` and other archive files.

```javascript
# Compress a folder
compress "my_folder" to "backup.zip"

# Extract an archive
extract "backup.zip"
```

---
[Next: Web Development ->](08_Web_Development.md)
