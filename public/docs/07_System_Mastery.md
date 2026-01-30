# Chapter 7: System Mastery

ShellLite is designed for automation. It gives you deep control over your files, desktop, and system operations.

## 1. File System

Reading and writing files is incredibly simple, using natural language.

### Writing Files
```javascript
write "Hello World" to file "log.txt"
```
*Note: This overwrites the file.*

### Appending to Files
```javascript
append "New Entry\n" to file "log.txt"
```
*Adds to the end of the file.*

### Reading Files
```javascript
content = read file "log.txt"
say content
```

### File Operations
| Operation | Syntax | Description |
|:---|:---|:---|
| Write | `write "text" to file "path"` | Create/overwrite file |
| Append | `append "text" to file "path"` | Add to end of file |
| Read | `read file "path"` | Read file contents |
| Exists | `exists("path")` | Check if file exists |
| Delete | `delete("path")` | Remove a file |
| Copy | `copy("src", "dest")` | Copy a file |
| Rename | `rename("old", "new")` | Rename/move a file |
| List | `listdir("path")` | List directory contents |
| Create Dir | `mkdir("path")` | Create directory |

### Working with Paths
```javascript
# Check if file exists before reading
if exists("config.txt")
    config = read file "config.txt"
    say config
else
    say in red "Config file not found!"

# List all files in a directory
files = listdir("./documents")
for file in files
    say file

# Create nested directories
mkdir("data/backups/2024")
```

### Regex Matching
You can search file contents easily with regular expressions.
```javascript
content = read file "server.log"

if content matches /Error/
    say "Found an error in the log!"

if content matches /\d{3}-\d{4}/
    say "Found a phone number pattern!"
```

## 2. Desktop Automation

ShellLite can control your mouse and keyboard, allowing you to automate repetitive tasks.

> **Note:** Desktop automation requires optional dependencies: `pip install keyboard mouse pyperclip plyer`

### Keyboard
```javascript
# Type text
type "Hello, World!"

# Press special keys
press "enter"
press "tab"
press "escape"

# Key combinations
press "ctrl+c"
press "ctrl+v"
press "alt+tab"
```

### Mouse
```javascript
# Click at coordinates
click at 100, 200

# Move mouse
move to 500, 300
```
*Coordinates are X, Y pixels from the top-left of the screen.*

### Clipboard
```javascript
# Copy to clipboard
copy "Important Data" to clipboard

# Paste from clipboard
text = paste from clipboard
say text
```

### System Notifications
Send native desktop notifications.
```javascript
notify "Title" "Message body here"
notify "Backup Complete" "Your files have been saved."
```

## 3. Asynchronous Tasks (Concurrency)

If you have a slow task (like downloading a large file), you don't want to freeze your whole program. Use `spawn` to run it in the background.

### Basic Async Pattern
```javascript
to download_large_file
    wait for 5 seconds
    give "Download Complete"

# Run in background
task = spawn download_large_file

say "Doing other work while downloading..."

# Wait for result when you need it
result = await task
say result
```

### Multiple Concurrent Tasks
```javascript
to fetch_user id
    wait for 2 seconds
    give "User " + str(id)

# Start multiple tasks
task1 = spawn fetch_user 1
task2 = spawn fetch_user 2
task3 = spawn fetch_user 3

say "All tasks started..."

# Wait for all results
user1 = await task1
user2 = await task2
user3 = await task3

say user1
say user2
say user3
```

### Async Keywords
| Keyword | Description |
|:---|:---|
| `spawn` | Start a function in the background |
| `await` | Wait for a spawned task to complete |

## 4. Scheduled Tasks

Run code at specific intervals.

```javascript
# Run every minute
every 1 minute
    say "Checking for updates..."
    check_for_updates()

# Run every few seconds
every 30 seconds
    say "Heartbeat"
```

## 5. Downloading Files

You can download files directly from the web.
```javascript
download "https://example.com/image.png"
download "https://example.com/data.zip"
```

### Download with Progress
```javascript
# For large files, use The Bridge
use "requests"

response = requests.get("https://example.com/large-file.zip", stream=true)
with open("large-file.zip", "wb") as f
    for chunk in response.iter_content(chunk_size=8192)
        f.write(chunk)
say "Download complete!"
```

## 6. Compressing and Extracting

Manage `.zip` and other archive files.

```javascript
# Compress a folder
compress "my_folder" to "backup.zip"

# Extract an archive
extract "backup.zip"
extract "backup.zip" to "destination_folder"
```

### Advanced Compression
```javascript
# Compress multiple items
compress ["file1.txt", "file2.txt", "folder1"] to "archive.zip"

# Extract specific files
# (Use The Bridge for advanced options)
use "zipfile"
```

## 7. Running System Commands

Execute shell commands from ShellLite.

```javascript
# Run a command
run "dir"
execute "ls -la"

# Capture output
output = run "git status"
say output
```

> **Security Warning:** Be careful when running system commands, especially with user input. Always validate and sanitize inputs.

## 8. Environment Variables

Access system environment variables.

```javascript
# Using The Bridge
use "os"

# Get an environment variable
home = os.environ.get("HOME")
path = os.environ.get("PATH")

say "Home: " + home
```

## 9. Process Management

Control external processes.

```javascript
use "subprocess"

# Run and wait for completion
result = subprocess.run(["python", "--version"], capture_output=true)
say result.stdout

# Run in background (non-blocking)
process = subprocess.Popen(["long_running_script.py"])
# Continue with other work...
process.wait()  # Wait when needed
```

## 10. System Information

Get information about the system.

```javascript
use "platform"
use "os"

say "OS: " + platform.system()
say "Version: " + platform.version()
say "Machine: " + platform.machine()
say "Processor: " + platform.processor()
say "CPU Count: " + str(os.cpu_count())
```

## 11. Progress Indicators

Show progress for long operations.

```javascript
# Simple progress
items = range(100)
for i in items
    # Process item
    progress i, 100  # Show progress bar

say "Complete!"
```

## 12. Practical Examples

### Backup Script
```javascript
to backup_files source_dir, backup_name
    # Create timestamp
    use "datetime"
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = backup_name + "_" + timestamp + ".zip"
    
    # Compress
    compress source_dir to backup_file
    say in green "Backup created: " + backup_file

backup_files "documents", "my_backup"
```

### File Watcher
```javascript
to watch_folder folder_path
    use "os"
    last_files = listdir(folder_path)
    
    forever
        wait for 5 seconds
        current_files = listdir(folder_path)
        
        # Check for new files
        for file in current_files
            if not contains(last_files, file)
                say in green "New file: " + file
                notify "New File" file + " was added"
        
        # Check for deleted files
        for file in last_files
            if not contains(current_files, file)
                say in red "Deleted: " + file
        
        last_files = current_files

watch_folder "./downloads"
```

### Automated Report Generator
```javascript
to generate_report
    # Gather data
    use "datetime"
    now = datetime.datetime.now()
    
    report = "# Daily Report\n"
    report += "Generated: " + str(now) + "\n\n"
    
    # Add system info
    use "platform"
    report += "## System Info\n"
    report += "- OS: " + platform.system() + "\n"
    report += "- Machine: " + platform.machine() + "\n\n"
    
    # Add custom data
    report += "## Status\n"
    report += "- All systems operational\n"
    
    # Save report
    filename = "report_" + now.strftime("%Y%m%d") + ".md"
    write report to file filename
    say in green "Report saved: " + filename

generate_report()
```

---
[Next: Web Development ->](08_Web_Development.md)
