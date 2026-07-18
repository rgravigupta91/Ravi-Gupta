document.addEventListener("DOMContentLoaded", async () => {

    const segments = window.location.pathname.split("/").filter(Boolean);

    App.basePath = segments.length > 0
        ? `/${segments[0]}/`
        : "/";

    await loadNavigation();

    initializeNavigation();

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

    }

    const activeLink = document.querySelector(
        `[data-url="${menu.url}"]`
    );

    await navigateTo(menu, activeLink);

});