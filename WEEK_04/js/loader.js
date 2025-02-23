function loadHTML(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

window.onload = function () {
    loadHTML("/html/header.html", "header-container");
    loadHTML("/html/footer.html", "footer-container");
    loadHTML("/html/background.html", "master-background")
};
