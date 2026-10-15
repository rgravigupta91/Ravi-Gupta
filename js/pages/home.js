function initializeHome() {
    document.querySelectorAll(".experience").forEach(element => {
        element.innerText = yearsOfExperience();
    });

    const btn = document.getElementById("btnConnectWithMe");
    if (btn) {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            await navigateByUrl("/contact");
        });
    }
}