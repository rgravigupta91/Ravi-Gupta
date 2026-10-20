async function loadView(view){

    const response = await fetch(`${App.basePath}views/${view}.html`, { cache: 'no-cache' });

    const html = await response.text();
    document.getElementById("content").innerHTML = html;
    window.scrollTo(0, 0);
    initCodeCopyButtons();
    initTermTooltips();

}