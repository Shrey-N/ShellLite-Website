// ShellLite Online Compiler - Enhanced UI

// Run code via API
async function runCode() {
    let code_input = document.getElementById("code-input");
    let code = code_input.value || "say 'Hello'";
    let output_div = document.getElementById("output-display");
    let btn = document.querySelector(".run-btn");
    output_div.innerText = "Running...";
    btn.classList.add("loading");
    try {
        let headers = { 'Content-Type': "application/json" };
        let body_data = { 'code': code };
        let body_str = JSON.stringify(body_data);
        let options = { 'method': "POST", 'headers': headers, 'body': body_str };
        let response = await fetch("/api/run", options);
        let result = await response.text();
        output_div.innerText = result;
    } catch (e) {
        output_div.innerText = "Error: " + e.message;
    } finally {
        btn.classList.remove("loading");
    }
}

// Clear output
function clearOutput() {
    document.getElementById("output-display").innerText = "// Output cleared";
}

// Tab key handling - insert 4 spaces
function handleTab(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        let textarea = e.target;
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let value = textarea.value;

        // Insert 4 spaces
        textarea.value = value.substring(0, start) + "    " + value.substring(end);

        // Move cursor after the inserted spaces
        textarea.selectionStart = textarea.selectionEnd = start + 4;

        // Trigger line number update
        updateLineNumbers();
    }
}

// Update line numbers
function updateLineNumbers() {
    let textarea = document.getElementById("code-input");
    let lineNumbers = document.getElementById("line-numbers");
    if (!lineNumbers) return;

    let lines = textarea.value.split('\n');
    let numbers = [];
    for (let i = 1; i <= lines.length; i++) {
        numbers.push(i);
    }
    lineNumbers.innerText = numbers.join('\n');
}

// Sync scroll between textarea and line numbers
function syncScroll(e) {
    let lineNumbers = document.getElementById("line-numbers");
    if (lineNumbers) {
        lineNumbers.scrollTop = e.target.scrollTop;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    let textarea = document.getElementById("code-input");
    if (textarea) {
        textarea.addEventListener('keydown', handleTab);
        textarea.addEventListener('input', updateLineNumbers);
        textarea.addEventListener('scroll', syncScroll);
        updateLineNumbers();
    }

    // Keyboard shortcut: Ctrl+Enter to run
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            runCode();
        }
    });
});
