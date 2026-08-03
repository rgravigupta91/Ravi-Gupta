function initializeNavigation() {

    document
        .querySelectorAll("#topNavigation .nav-link")
        .forEach(link => {

            link.addEventListener("click", async (e) => {

                e.preventDefault();

                const clickedLink = e.currentTarget;

                const menu =
                    getMenuByUrl(clickedLink.dataset.url);

                await navigateTo(menu, clickedLink, true);

            });

        });

}

function initializeFooter() {

    document
        .querySelectorAll(".footer-nav")
        .forEach(link => {

            link.addEventListener("click", async (e) => {

                e.preventDefault();

                await navigateByUrl(link.dataset.url);

            });

        });

}