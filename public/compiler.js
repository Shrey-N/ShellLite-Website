async function runCode() {
    let code_input = document.getElementById("code-input");
    let code = code_input.value || "say 'Hello'";
    let output_div = document.getElementById("output-display");
    let btn = document.querySelector(".run-btn");
    output_div.innerText = "Running...";
    let cl = btn.classList;
    cl.add("loading")
    try {
        let headers = { 'Content-Type': "application/json" };
        let body_data = { 'code': code };
        let body_str = JSON.stringify(body_data);
        let options = { 'method': "POST", 'headers': headers, 'body': body_str };
        let response = await fetch("/api/run", options);
        let result = await response.text();
        output_div.innerText = result;
    } catch (e) {
        let msg = e.message;
        output_div.innerText = "Error: " + msg;
    } finally {
        let cl = btn.classList;
        cl.remove("loading")
    }
}
