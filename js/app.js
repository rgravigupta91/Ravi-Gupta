document.addEventListener("DOMContentLoaded", async () => {

    const segments = window.location.pathname.split("/").filter(Boolean);

    App.basePath = segments.length > 0
        ? `/${segments[0]}/`
        : "/";

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.href = `${App.basePath}assets/logos/fav-icon1.png`;

    await loadNavigation();

    initializeNavigation();
    
    initializeFooter();

    const route = getInitialRoute();

    // Remove ?route= from URL after initial load
    if (window.location.search.includes("route=")) {

        history.replaceState(
            null,
            "",
            buildUrl(route)
        );

    }

    let menu = getMenuByRoute(route);

    if (!menu) {

        menu = getMenuByRoute("/");
        history.replaceState(
        null,
        "",
        buildUrl("/")
    );

    }

    const activeLink = document.querySelector(
        `[data-url="${menu.url}"]`
    );

    await navigateTo(menu, activeLink);

    /* document.querySelectorAll(".footer-nav").forEach(link => {

    link.addEventListener("click", async function (e) {

        e.preventDefault();

        await navigateByUrl(this.dataset.url);

    }); 

}); */
});

function initializeView(view) {

    switch (view) {

        case "contact":
            initializeContact();
            break;
        case "home":
            initializeHome();
            break;

    }

}

function closeMobileMenu(){
    const navbar =
        document.getElementById("navbarMenu");

    if(!navbar)
        return;

    const collapse = bootstrap.Collapse.getInstance(navbar);

    if (collapse) {
        collapse.hide();
    }
}