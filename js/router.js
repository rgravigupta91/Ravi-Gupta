async function loadView(view){
    
    const response = await fetch(`views/${view}.html`);

    const html = await response.text();
    document.getElementById("content").innerHTML = html;

}