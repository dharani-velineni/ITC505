window.onload = function() {
    const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
    const journeyDetailsDiv = document.getElementById("journeyDetails");

    if (bookingDetails) {
        // Display the booking details
        journeyDetailsDiv.innerHTML = `
            <p><strong>Passenger Name:</strong> ${bookingDetails.passengerName}</p>
            <p><strong>From:</strong> ${bookingDetails.from}</p>
            <p><strong>To:</strong> ${bookingDetails.to}</p>
            <p><strong>Departure Date:</strong> ${bookingDetails.departureDate}</p>
            <p><strong>Return Date:</strong> ${bookingDetails.returnDate ? bookingDetails.returnDate : 'N/A'}</p>
        `;
    } else {
        journeyDetailsDiv.innerHTML = "<p>No journey details found. Please make a booking.</p>";
    }
};

// Optional: Logout function
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("bookingDetails"); // Clear booking details on logout
    window.location.href = "signin.html"; // Redirect to login page
}
