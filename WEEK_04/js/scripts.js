const countdown = () => {
    const conferenceDate = new Date('2025-03-01T00:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = conferenceDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = "<div class='event-started'>The event has started!</div>";
        clearInterval(interval);
    }
};

document.addEventListener("DOMContentLoaded", function () {
    countdown();
    setInterval(countdown, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = form.querySelector('button[type="submit"]');
            button.classList.add('submit-glow');
            setTimeout(() => {
                button.classList.remove('submit-glow');
                alert('Form submitted successfully!');
                form.reset();
            }, 1500);
        });
    });
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.highlight-card, .speaker-card, .schedule-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); 
