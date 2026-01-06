async function runCode() {
    const code = document.getElementById('code-input').value || 'say "Btw this compiler was also written purely using ShellLite :)"';
    const outputDiv = document.getElementById('output-display');
    const btn = document.querySelector('.run-btn');

    outputDiv.innerText = 'Running...';
    btn.classList.add('loading');

    try {
        const response = await fetch('/api/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: code })
        });
        const result = await response.text();
        outputDiv.innerText = result;
    } catch (e) {
        outputDiv.innerText = 'Error: ' + e.message;
    } finally {
        btn.classList.remove('loading');
    }
}
