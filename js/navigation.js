let navigationData = null;


/* =========================================================
   Load Navigation
   ========================================================= */

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


/* =========================================================
   Initialize Navigation
   ========================================================= */

function initializeNavigation() {

    /*
     * Only actual navigation links are handled here.
     *
     * Submenu parents use .submenu-toggle and are handled
     * separately by initializeSubMenus().
     */

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


/* =========================================================
   Initialize Submenus
   ========================================================= */

function initializeSubMenus() {

    document
        .querySelectorAll("#topNavigation .submenu-toggle")
        .forEach(link => {

            link.addEventListener("click", function (e) {

                /*
                 * Important:
                 * Do NOT allow this click to reach the
                 * navigation handler or Bootstrap dropdown.
                 */

                e.preventDefault();
                e.stopPropagation();


                const submenu =
                    this.nextElementSibling;

                if (!submenu)
                    return;


                /*
                 * Toggle only this submenu.
                 */

                submenu.classList.toggle("show");

            });

        });

}


/* =========================================================
   Set Active Menu
   ========================================================= */

function setActiveMenu(clickedLink) {

    document
        .querySelectorAll("#topNavigation .nav-link")
        .forEach(link => {

            link.classList.remove("active");

        });

    clickedLink.classList.add("active");

}


/* =========================================================
   Find Menu By URL
   Supports Unlimited Levels
   ========================================================= */

function getMenuByUrl(
    url,
    menus = navigationData.menus
) {

    for (const menu of menus) {

        /*
         * Check current level
         */

        if (menu.url === url)
            return menu;


        /*
         * Search children recursively
         */

        if (menu.children &&
            menu.children.length > 0) {

            const found =
                getMenuByUrl(
                    url,
                    menu.children
                );

            if (found)
                return found;

        }

    }

    return null;

}


/* =========================================================
   Render Menu
   Supports Unlimited Levels
   ========================================================= */

function renderMenuItems(
    menus,
    level = 0
) {

    let html = "";


    menus.forEach(menu => {

        /*
         * Ignore disabled menus
         */

        if (!menu.enabled)
            return;


        const hasChildren =
            menu.children &&
            menu.children.length > 0;


        /* =================================================
           Leaf Node
           No children → Actual navigation link
           ================================================= */

        if (!hasChildren) {

            if (level === 0) {

                html += `
                    <li class="nav-item">

                        <a class="nav-link"
                           href="#"
                           data-title="${menu.title}"
                           data-url="${menu.url}"
                           data-view="${menu.view}">

                            ${menu.title}

                        </a>

                    </li>
                `;

            } else {

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

            }

            return;

        }


        /* =================================================
           Level 0
           Top-level menu with children
           ================================================= */

        if (level === 0) {

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

        }


        /* =================================================
           Level 1+
           Nested menu with children
           ================================================= */

        else {

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