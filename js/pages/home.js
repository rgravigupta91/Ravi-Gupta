function initializeHome() {
    document.querySelectorAll(".experience").forEach(element => {
    element.innerText = yearsOfExperience();
});
}   