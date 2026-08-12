

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