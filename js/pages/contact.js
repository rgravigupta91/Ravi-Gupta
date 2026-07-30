function initializeContact() {
    console.log("initializeContact() called");
    const button = document.getElementById("btnCopyEmail");

    if (!button)
        return;

    button.addEventListener("click", async () => {
        console.log("Copy button clicked");
        const email = "rg.ravigupta91@gmail.com";

        try {

            await navigator.clipboard.writeText(email);

            button.innerHTML =
                `<i class="bi bi-check-lg"></i> Copied!`;

            setTimeout(() => {

                button.innerHTML =
                    `<i class="bi bi-copy"></i> Copy Email`;

            }, 2000);

        }
        catch (err) {

            console.error(err);

            alert("Unable to copy email.");

        }

    });

}