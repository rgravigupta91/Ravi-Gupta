let navigationData = null;

async function loadNavigation() {

    const response =
        await fetch("data/navigation.json");

    navigationData =
        await response.json();

    const navContainer =
        document.getElementById("topNavigation");

    navContainer.innerHTML =
        renderMenuItems(navigationData.menus);

}


/* function initializeNavigation(){

    document
        .querySelectorAll("#topNavigation .nav-link")
        .forEach(link=>{

            link.addEventListener("click", async (e) => {

                e.preventDefault();

                const clickedLink = e.currentTarget;

                const menu = getMenuByUrl(clickedLink.dataset.url);

                await navigateTo(menu, clickedLink, true);

            });

        });

} */

function setActiveMenu(clickedLink) {

    document
        .querySelectorAll("#topNavigation .nav-link")
        .forEach(link => {

            link.classList.remove("active");

        });

    clickedLink.classList.add("active");

}


function getMenuByUrl(url, menus = navigationData.menus) {

    for (const menu of menus) {

        if (menu.url === url)
            return menu;

        if (menu.children) {

            const found =
                getMenuByUrl(url, menu.children);

            if (found)
                return found;
        }
    }

    return null;
}

function renderMenuItems(menus, level = 0) {

    let html = "";

    menus.forEach(menu => {

        if (!menu.enabled)
            return;

        const hasChildren =
            menu.children &&
            menu.children.length > 0;

        if (!hasChildren) {

            html += `
                <li>
                    <a class="dropdown-item nav-link"
                       href="#"
                       data-title="${menu.title}"
                       data-url="${menu.url}"
                       data-view="${menu.view}">

                        ${menu.title}

                    </a>
                </li>
            `;

            return;
        }

        if (level === 0) {

            // Top-level menu
            html += `
                <li class="nav-item dropdown">

                    <a class="nav-link dropdown-toggle"
                       href="#"
                       role="button"
                       data-bs-toggle="dropdown"
                       aria-expanded="false">

                        ${menu.title}

                    </a>

                    <ul class="dropdown-menu">

                        ${renderMenuItems(
                            menu.children,
                            level + 1
                        )}

                    </ul>

                </li>
            `;

        } else {

            // Nested menu
            html += `
                <li class="dropdown-submenu">

                    <a class="dropdown-item submenu-toggle"
                       href="#">

                        ${menu.title}

                        <span class="float-end">
                            ›
                        </span>

                    </a>

                    <ul class="dropdown-menu">

                        ${renderMenuItems(
                            menu.children,
                            level + 1
                        )}

                    </ul>

                </li>
            `;
        }

    });

    return html;
}

function initializeSubMenus() {

    document
        .querySelectorAll(".submenu-toggle")
        .forEach(link => {

            link.addEventListener("click", function (e) {

                e.preventDefault();
                e.stopPropagation();

                const submenu =
                    this.nextElementSibling;

                if (!submenu)
                    return;

                submenu.classList.toggle("show");

            });

        });

}

function initializeNavigation() {

    document
        .querySelectorAll("#topNavigation .nav-link")
        .forEach(link => {

            link.addEventListener("click", async (e) => {

                e.preventDefault();

                const clickedLink =
                    e.currentTarget;

                const menu =
                    getMenuByUrl(
                        clickedLink.dataset.url
                    );

                if (!menu)
                    return;

                await navigateTo(
                    menu,
                    clickedLink,
                    true
                );

            });

        });

    initializeSubMenus();
}