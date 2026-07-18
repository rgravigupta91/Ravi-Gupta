document.addEventListener("DOMContentLoaded", async () => {

    const segments = window.location.pathname.split("/").filter(Boolean);

    App.basePath = segments.length > 0
        ? `/${segments[0]}/`
        : "/";

    await loadNavigation();

    initializeNavigation();

    const route = getCurrentRoute();

    let menu = getMenuByRoute(route);

    if (!menu) {

        menu = getMenuByRoute("/");

    }

    const activeLink = document.querySelector(
        `[data-url="${menu.url}"]`
    );

    await navigateTo(menu, activeLink);

});