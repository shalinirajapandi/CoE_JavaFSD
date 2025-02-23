document.addEventListener("DOMContentLoaded", function () {
    const scheduleContainer = document.getElementById("schedule-container");
    const trackFilter = document.getElementById("track-filter");

    fetch("/json/schedule.json")
        .then(response => response.json())
        .then(data => {
            renderSchedule(data);

            trackFilter.addEventListener("change", function () {
                const selectedTrack = trackFilter.value;
                const filteredData = selectedTrack === "All"
                    ? data
                    : data.filter(session => session.track.trim().toLowerCase() === selectedTrack.toLowerCase());
                renderSchedule(filteredData);
            });
        })
        .catch(error => console.error("Error loading schedule:", error));

    function renderSchedule(scheduleData) {
        scheduleContainer.innerHTML = "";
        if (scheduleData.length === 0) {
            scheduleContainer.innerHTML = "<p class='no-sessions'>No sessions available for this track.</p>";
            return;
        }
        let groupedByDay = {};
        scheduleData.forEach(session => {
            if (!groupedByDay[session.day]) {
                groupedByDay[session.day] = [];
            }
            groupedByDay[session.day].push(session);
        });
        for (let day in groupedByDay) {
            const daySection = document.createElement("div");
            daySection.classList.add("schedule-card");
            const dayTitle = document.createElement("h3");
            dayTitle.classList.add("day-title");
            dayTitle.innerHTML = `<i class="fas fa-calendar-day"></i> ${day}`;
            daySection.appendChild(dayTitle);
            const sessionList = document.createElement("ul");
            sessionList.classList.add("schedule-list");
            groupedByDay[day].forEach(session => {
                const sessionItem = document.createElement("li");
                sessionItem.classList.add("schedule-item");
                const trackClass = getTrackClass(session.track.trim());
                sessionItem.innerHTML = `
                        <span class="schedule-time">${session.time}</span>
                        <p>${session.title} <span class="track-label ${trackClass}">${session.track}</span></p>
                    `;
                sessionList.appendChild(sessionItem);
            });
            daySection.appendChild(sessionList);
            scheduleContainer.appendChild(daySection);
        }
    }

    function getTrackClass(track) {
        switch (track.toLowerCase()) {
            case "general":
                return "track-general";
            case "business":
                return "track-business";
            case "artificial intelligence":
                return "track-ai";
            case "tech conference":
                return "track-tech";
            default:
                return "track-default";
        }
    }
});
