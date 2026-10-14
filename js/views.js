async function loadView(view){
    
    const response = await fetch(`${App.basePath}views/${view}.html`);

    const html = await response.text();
    document.getElementById("content").innerHTML = html;

}