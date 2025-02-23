document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value;
        let errors = [];
        if (name.length < 3) {
            errors.push("Name must be at least 3 characters long.");
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            errors.push("Please enter a valid email address.");
        }
        if (message.length < 20) {
            errors.push("Message lenght must be greater than 20 characters.");
        }
        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Request sent Successfully");
            contactForm.reset();
        }
    });
});
