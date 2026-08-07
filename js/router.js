function getBasePath() {

    const path = window.location.pathname;

    const index = path.lastIndexOf("/");

    return path.substring(0, index);

}

function getMenuByRoute(
    route,
    menus = navigationData.menus
) {

    for (const menu of menus) {

        if (menu.url === route)
            return menu;

        if (menu.children &&
            menu.children.length > 0) {

            const found =
                getMenuByRoute(
                    route,
                    menu.children
                );

            if (found)
                return found;
        }
    }

    return null;
}

function buildUrl(route) {

    //return getBasePath() + route;
    return App.basePath + route.replace(/^\//, "");

}

function getCurrentRoute() {

    let path = window.location.pathname;

    const basePath = getBasePath();

    if (path.startsWith(basePath)) {

        path = path.substring(basePath.length);

    }

    if (path === "")
        path = "/";

    return path;

}

async function navigateTo(menu, clickedLink = null, updateHistory = false) {
    console.log("navigateTo called");
    if (clickedLink) {
        setActiveMenu(clickedLink);
    }

    if (updateHistory) {
        history.pushState(menu, "", buildUrl(menu.url));
    }

    await loadView(menu.view);
    initializeView(menu.view);
    document.title = `${menu.title} | Ravi Kumar Gupta`;
    // Close mobile menu if open
    closeMobileMenu();
    console.log("Before closeMobileMenu");
}

async function navigateByUrl(url) {

    const menu = getMenuByUrl(url);

    if (!menu) {
        console.error("Menu not found:", url);
        return;
    }

    const activeLink = document.querySelector(
        `[data-url="${menu.url}"]`
    );

    await navigateTo(menu, activeLink, true);

}

function getInitialRoute() {

    const params =
        new URLSearchParams(window.location.search);

    const route =
        params.get("route");

    if(route)
        return route;

    return getCurrentRoute();

}

window.addEventListener("popstate", async () => {

    const route = getCurrentRoute();

    const menu = getMenuByRoute(route);

    if (!menu) {
        console.error("Menu not found for route:", route);
        return;
    }

    const activeLink = document.querySelector(
        `[data-url="${menu.url}"]`
    );

    await navigateTo(menu, activeLink, false);

});