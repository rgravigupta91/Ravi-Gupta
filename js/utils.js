var yearsOfExperience1 = 0;
function yearsOfExperience() {
    const startDate = new Date("2014-01-06");
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    const anniversaryThisYear = new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate());
    if (today < anniversaryThisYear) {
        years--;
    }
    yearsOfExperience2 = years;
    return yearsOfExperience2;
}