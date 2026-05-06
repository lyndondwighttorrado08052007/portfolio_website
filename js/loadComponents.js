document.addEventListener("DOMContentLoaded", () => {

    loadComponent("navbar-placeholder", "navbar.html");
    loadComponent("footer-placeholder", "footer.html");

});


function loadComponent(elementId, filePath) {

    fetch(filePath)
        .then(response => response.text())
        .then(data => {

            document.getElementById(elementId).innerHTML = data;

        })
        .catch(error => {

            console.error("Component loading error:", error);

        });

}