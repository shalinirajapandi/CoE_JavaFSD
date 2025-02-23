function loadSpeakers(jsonFile, containerId) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(containerId);
            container.innerHTML = ""; 

            data.forEach(speaker => {
                const card = document.createElement("div");
                card.classList.add("speaker-card");

                card.innerHTML = `
                    <img src="/assets/${speaker.image}" alt="${speaker.name}" class="speaker-image">
                    <h3 class="speaker-name">${speaker.name}</h3>
                    <p class="speaker-role">${speaker.role}</p>
                    <div class="speaker-social">
                        <a href="${speaker.twitter}" class="social-link"><i class="fab fa-twitter"></i></a>
                        <a href="${speaker.linkedin}" class="social-link"><i class="fab fa-linkedin"></i></a>
                    </div>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading speakers:", error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadSpeakers("/json/speakers.json", "speakers-container");
});
