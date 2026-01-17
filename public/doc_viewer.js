window.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop();
    const contentDiv = document.getElementById('content');

    if (!path || path === 'docs') return;

    fetch('/static/docs/' + path)
        .then(r => {
            if (!r.ok) throw new Error('Not found');
            return r.text();
        })
        .then(text => {
            if (typeof marked !== 'undefined') {
                contentDiv.innerHTML = marked.parse(text);
            } else {
                contentDiv.innerText = text;
            }
        })
        .catch(err => {
            contentDiv.innerHTML = '<p style="color:red">Error loading document: ' + err.message + '</p>';
        });
});
