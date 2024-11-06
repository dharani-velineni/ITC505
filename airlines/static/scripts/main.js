
// Simple login simulation
// Email validation to accept any Gmail address
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if email ends with "@gmail.com"
    if (username.endsWith("@gmail.com")) {
        // Redirect to the home page if the email is valid
        window.location.href = "index.html";
    } else {
        // Show error message if the email is invalid
        document.getElementById("error").textContent = "Please enter a valid Gmail address.";
    }
});


// Booking form submission simulation
document.getElementById("bookingForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Booking confirmed! Check journey details for information.");
    window.location.href = "journey.html";
});


