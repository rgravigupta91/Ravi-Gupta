async function initApp() {

    const segments = window.location.pathname.split("/").filter(Boolean);

    App.basePath = segments.length > 0
        ? `/${segments[0]}/`
        : "/";

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.href = `${App.basePath}assets/logos/fav-icon1.png`;

    await loadNavigation();

    initializeNavigation();
    initializeFooter();
    initThemeToggle();

    const route = getInitialRoute();

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

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

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