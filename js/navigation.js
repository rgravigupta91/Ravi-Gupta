async function loadNavigation() {

    const response = await fetch("data/navigation.json");

    const navigation = await response.json();

    const navContainer = document.getElementById("topNavigation");

    navContainer.innerHTML = "";

    let html = "";

    navigation.menus.forEach(menu => {

        if (!menu.enabled)
            return;

        html += `
            <li class="nav-item">
                <a class="nav-link" href="#" 
                    data-title="${menu.title}"
                    data-url="${menu.url}" 
                    data-view="${menu.view}">
                    ${menu.title}
                </a>
            </li>
        `;

    });


navContainer.innerHTML = html;

}


function initializeNavigation(){

    document
        .querySelectorAll("#topNavigation .nav-link")
        .forEach(link=>{

            link.addEventListener("click",async(e)=>{

                e.preventDefault();

                const clickedLink = e.currentTarget;

                setActiveMenu(clickedLink);

                const view = clickedLink.dataset.view;

                await loadView(view);

            });

        });

}

function setActiveMenu(clickedLink) {

    document
        .querySelectorAll("#topNavigation .nav-link")
        .forEach(link => {

            link.classList.remove("active");

        });

    clickedLink.classList.add("active");

}