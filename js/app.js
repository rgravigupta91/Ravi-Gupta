document.addEventListener("DOMContentLoaded", async () => {
    await loadNavigation();
    initializeNavigation();

    const homeLink =
        document.querySelector("#topNavigation .nav-link");

    if (homeLink) {

        setActiveMenu(homeLink);

        await loadView(homeLink.dataset.view);

    }
});