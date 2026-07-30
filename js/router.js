function getBasePath() {

    const path = window.location.pathname;

    const index = path.lastIndexOf("/");

    return path.substring(0, index);

}

function getMenuByRoute(route) {

    return navigationData.menus.find(menu => menu.url === route);

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

    if (clickedLink) {
        setActiveMenu(clickedLink);
    }

    if (updateHistory) {
        history.pushState(menu, "", buildUrl(menu.url));
    }

    await loadView(menu.view);
    initializeView(menu.view);
    document.title = `${menu.title} | Ravi Kumar Gupta`;

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