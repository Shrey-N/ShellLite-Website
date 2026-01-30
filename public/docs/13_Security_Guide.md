# Chapter 13: Security Guide

Writing secure code is essential for any application. This guide covers security best practices for ShellLite development.

## 1. Input Validation

Never trust user input. Always validate and sanitize data before using it.

### Validating User Input
```javascript
to get_validated_age
    age_str = ask "Enter your age: "
    
    # Check if it's a number
    try
        age = int(age_str)
    catch error
        say in red "Invalid input: Please enter a number"
        give none
    
    # Check range
    if age < 0 or age > 150
        say in red "Invalid age: Must be between 0 and 150"
        give none
    
    give age

# Usage
age = get_validated_age()
if age is not none
    say "Your age is: " + str(age)
```

### Sanitizing String Input
```javascript
to sanitize_string input
    # Remove potentially dangerous characters
    cleaned = replace(input, "<", "&lt;")
    cleaned = replace(cleaned, ">", "&gt;")
    cleaned = replace(cleaned, "&", "&amp;")
    cleaned = replace(cleaned, '"', "&quot;")
    cleaned = replace(cleaned, "'", "&#x27;")
    give cleaned

# For HTML output
user_input = ask "Enter your name: "
safe_input = sanitize_string(user_input)
```

### Validating Email Addresses
```javascript
to is_valid_email email
    # Basic email validation
    if not email matches /^[\w.-]+@[\w.-]+\.\w{2,}$/
        give no
    
    # Check length
    if len(email) > 254
        give no
    
    give yes

email = ask "Enter email: "
if is_valid_email(email)
    say in green "Valid email"
else
    say in red "Invalid email format"
```

### Validating URLs
```javascript
to is_valid_url url
    # Check for valid URL patterns
    if url matches /^https?:\/\/[\w.-]+\.\w{2,}/
        give yes
    give no

# Only allow HTTPS
to is_secure_url url
    if url matches /^https:\/\//
        give yes
    give no
```

## 2. SQL Injection Prevention

When working with databases, never concatenate user input directly into SQL queries.

### Vulnerable Code (DO NOT USE)
```javascript
# DANGEROUS - SQL Injection vulnerability!
username = ask "Enter username: "
query = "SELECT * FROM users WHERE username = '" + username + "'"
# If user enters: ' OR '1'='1
# Query becomes: SELECT * FROM users WHERE username = '' OR '1'='1'
# This returns ALL users!
```

### Safe Code (Use Parameterized Queries)
```javascript
# SAFE - Using parameterized queries
username = ask "Enter username: "
db open "app.db"
results = db query "SELECT * FROM users WHERE username = ?", [username]
db close
```

### Safe Database Operations
```javascript
to safe_insert_user name, email
    # Validate inputs first
    if len(name) > 100
        say in red "Name too long"
        give no
    
    if not is_valid_email(email)
        say in red "Invalid email"
        give no
    
    # Use parameterized query
    db open "app.db"
    try
        db exec "INSERT INTO users (name, email) VALUES (?, ?)", [name, email]
        give yes
    catch error
        say in red "Database error: " + str(error)
        give no
    always
        db close

to safe_search_users search_term
    # Escape wildcards for LIKE queries
    escaped = replace(search_term, "%", "\%")
    escaped = replace(escaped, "_", "\_")
    
    db open "app.db"
    results = db query "SELECT * FROM users WHERE name LIKE ?", ["%" + escaped + "%"]
    db close
    give results
```

## 3. File System Security

Be careful when working with files, especially with user-provided paths.

### Path Traversal Prevention
```javascript
to safe_read_file filename
    # Prevent directory traversal attacks
    if ".." in filename
        say in red "Invalid filename: Path traversal not allowed"
        give none
    
    if filename.startswith("/") or filename.startswith("\\")
        say in red "Invalid filename: Absolute paths not allowed"
        give none
    
    # Only allow files in a specific directory
    allowed_dir = "./uploads/"
    full_path = allowed_dir + filename
    
    if exists(full_path)
        give read file full_path
    else
        say in red "File not found"
        give none
```

### Safe File Upload Handling
```javascript
const ALLOWED_EXTENSIONS = ["txt", "pdf", "png", "jpg"]
const MAX_FILE_SIZE = 10485760  # 10 MB

to is_safe_filename filename
    # Check for path traversal
    if ".." in filename or "/" in filename or "\\" in filename
        give no
    
    # Check extension
    parts = split(filename, ".")
    if len(parts) < 2
        give no
    
    extension = lower(parts[-1])
    if not contains(ALLOWED_EXTENSIONS, extension)
        give no
    
    give yes

to sanitize_filename filename
    # Remove dangerous characters
    safe_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-_"
    result = ""
    for char in filename
        if char in safe_chars
            result += char
    give result
```

### Secure Temporary Files
```javascript
use "tempfile"
use "os"

to process_with_temp_file data
    # Create secure temporary file
    temp = tempfile.NamedTemporaryFile(delete=no)
    try
        temp.write(data.encode())
        temp.flush()
        
        # Process the file
        result = process_file(temp.name)
        
        give result
    always
        # Always clean up
        temp.close()
        if exists(temp.name)
            delete(temp.name)
```

## 4. Web Application Security

### Cross-Site Scripting (XSS) Prevention
```javascript
to escape_html text
    escaped = replace(text, "&", "&amp;")
    escaped = replace(escaped, "<", "&lt;")
    escaped = replace(escaped, ">", "&gt;")
    escaped = replace(escaped, '"', "&quot;")
    escaped = replace(escaped, "'", "&#x27;")
    give escaped

# In web pages, always escape user content
define page UserProfile
    user_name = escape_html(request.params["name"])
    h1 user_name  # Safe to display
```

### CSRF Protection
```javascript
use "secrets"
use "hashlib"

to generate_csrf_token
    give secrets.token_hex(32)

to validate_csrf_token submitted, stored
    if submitted == stored
        give yes
    give no

# In your form
before request
    if request.method == "GET"
        csrf_token = generate_csrf_token()
        request.session["csrf_token"] = csrf_token

when someone submits to "/action"
    submitted_token = request.form.get("csrf_token", "")
    stored_token = request.session.get("csrf_token", "")
    
    if not validate_csrf_token(submitted_token, stored_token)
        say in red "Invalid CSRF token"
        give "Forbidden", 403
    
    # Process the form...
```

### Secure Headers
```javascript
before request
    # Add security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
```

### Rate Limiting
```javascript
request_counts = a dictionary
const MAX_REQUESTS_PER_MINUTE = 60

to check_rate_limit ip_address
    use "time"
    current_time = time.time()
    
    if ip_address in request_counts
        requests = request_counts[ip_address]
        # Remove old requests (older than 1 minute)
        recent = a list
        for req_time in requests
            if current_time - req_time < 60
                add req_time to recent
        request_counts[ip_address] = recent
        
        if len(recent) >= MAX_REQUESTS_PER_MINUTE
            give no  # Rate limited
    else
        request_counts[ip_address] = a list
    
    add current_time to request_counts[ip_address]
    give yes

before request
    if not check_rate_limit(request.remote_addr)
        give "Too Many Requests", 429
```

## 5. Password Security

### Never Store Plaintext Passwords
```javascript
use "hashlib"
use "secrets"

to hash_password password
    # Generate a random salt
    salt = secrets.token_hex(16)
    
    # Hash password with salt
    salted = salt + password
    hashed = hashlib.sha256(salted.encode()).hexdigest()
    
    # Return salt + hash (store both)
    give salt + ":" + hashed

to verify_password password, stored_hash
    parts = split(stored_hash, ":")
    if len(parts) != 2
        give no
    
    salt = parts[0]
    expected_hash = parts[1]
    
    salted = salt + password
    actual_hash = hashlib.sha256(salted.encode()).hexdigest()
    
    give actual_hash == expected_hash

# Usage
password = ask "Create password: "
hashed = hash_password(password)
# Store 'hashed' in database

# Later, to verify:
attempt = ask "Enter password: "
if verify_password(attempt, stored_hash)
    say in green "Login successful"
else
    say in red "Invalid password"
```

### Password Strength Validation
```javascript
to is_strong_password password
    # Minimum length
    if len(password) < 8
        give no, "Password must be at least 8 characters"
    
    # Check for uppercase
    has_upper = no
    for char in password
        if char in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            has_upper = yes
            stop
    if not has_upper
        give no, "Password must contain uppercase letter"
    
    # Check for lowercase
    has_lower = no
    for char in password
        if char in "abcdefghijklmnopqrstuvwxyz"
            has_lower = yes
            stop
    if not has_lower
        give no, "Password must contain lowercase letter"
    
    # Check for digit
    has_digit = no
    for char in password
        if char in "0123456789"
            has_digit = yes
            stop
    if not has_digit
        give no, "Password must contain a digit"
    
    # Check for special character
    special = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    has_special = no
    for char in password
        if char in special
            has_special = yes
            stop
    if not has_special
        give no, "Password must contain a special character"
    
    give yes, "Password is strong"
```

## 6. Sensitive Data Handling

### Environment Variables for Secrets
```javascript
use "os"

# NEVER hardcode secrets
# Bad:
# api_key = "sk-1234567890abcdef"

# Good: Use environment variables
api_key = os.environ.get("API_KEY")
if not api_key
    say in red "Error: API_KEY environment variable not set"
    exit

db_password = os.environ.get("DB_PASSWORD")
```

### Secure Configuration Files
```javascript
# config.shl - Don't commit this to version control!
# Add to .gitignore

const DATABASE_URL = os.environ.get("DATABASE_URL")
const SECRET_KEY = os.environ.get("SECRET_KEY")
const DEBUG_MODE = os.environ.get("DEBUG", "false") == "true"
```

### Logging Security
```javascript
to safe_log message, data
    # Never log sensitive data
    sensitive_fields = ["password", "token", "secret", "key", "credit_card"]
    
    safe_data = a dictionary
    for key in data
        if contains(sensitive_fields, lower(key))
            safe_data[key] = "[REDACTED]"
        else
            safe_data[key] = data[key]
    
    say "[LOG] " + message + ": " + str(safe_data)

# Usage
safe_log "User login", {"username": "alice", "password": "secret123"}
# Output: [LOG] User login: {"username": "alice", "password": "[REDACTED]"}
```

## 7. Error Handling Security

### Don't Expose Internal Errors
```javascript
const DEBUG_MODE = no  # Set to yes only in development

to handle_error error
    # Log the full error internally
    log_to_file "errors.log", str(error)
    
    # Show safe message to user
    if DEBUG_MODE
        say in red "Error: " + str(error)
    else
        say in red "An error occurred. Please try again later."

try
    risky_operation()
catch error
    handle_error(error)
```

### Secure Error Responses for Web
```javascript
when someone visits "/api/data"
    try
        data = get_sensitive_data()
        give convert data to json
    catch error
        # Log detailed error internally
        log_error(error)
        
        # Return generic error to client
        give convert {"error": "Internal server error"} to json, 500
```

## 8. Security Checklist

Before deploying your ShellLite application, verify:

### Input Validation
- [ ] All user inputs are validated
- [ ] String inputs are sanitized
- [ ] Numeric inputs are range-checked
- [ ] File uploads are restricted by type and size

### Database Security
- [ ] Using parameterized queries (no string concatenation)
- [ ] Database user has minimal required permissions
- [ ] Sensitive data is encrypted at rest

### Authentication
- [ ] Passwords are hashed, not stored in plaintext
- [ ] Password strength requirements enforced
- [ ] Session tokens are secure and expire appropriately
- [ ] Failed login attempts are rate-limited

### Web Security
- [ ] XSS prevention (escaping output)
- [ ] CSRF tokens on forms
- [ ] Security headers configured
- [ ] HTTPS enforced in production

### Data Protection
- [ ] Secrets stored in environment variables
- [ ] Sensitive data not logged
- [ ] Error messages don't expose internals
- [ ] Configuration files excluded from version control

### File System
- [ ] Path traversal attacks prevented
- [ ] File permissions are restrictive
- [ ] Temporary files are cleaned up

---
[Next: Migration Guide ->](14_Migration_Guide.md)
