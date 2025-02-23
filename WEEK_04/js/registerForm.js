document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const ticketType = document.getElementById("ticket-type").value;
        let errors = [];
        if (name.length < 3) {
            errors.push("Name must be at least 3 characters long.");
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            errors.push("Please enter a valid email address.");
        }
        if (!ticketType) {
            errors.push("Please select a ticket type.");
        }
        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            alert("Registration successful!");
            registrationForm.reset();
        }
    });
});
