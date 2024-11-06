// Function to toggle visibility of return date based on trip type selection
function toggleReturnDate() {
    const returnDateContainer = document.getElementById("returnDateContainer");
    const tripType = document.querySelector('input[name="tripType"]:checked').value;

    if (tripType === "round-trip") {
        returnDateContainer.style.display = "block"; // Show return date field
    } else {
        returnDateContainer.style.display = "none"; // Hide return date field
    }
}

// Booking form submission logic
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form values
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const departureDate = document.getElementById("departureDate").value;
    const returnDate = document.getElementById("returnDate").value;
    const passengerName = document.getElementById("passengerName").value;
    const tripType = document.querySelector('input[name="tripType"]:checked').value;

    // Create an object to hold booking details
    const bookingDetails = {
        from: from,
        to: to,
        departureDate: departureDate,
        returnDate: tripType === "round-trip" ? returnDate : null, // Store return date only for round trips
        passengerName: passengerName
    };

    // Store the booking details in local storage
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));

    // Display confirmation message and redirect to Journey Details page
    document.getElementById("bookingMessage").textContent = "Booking successful! Redirecting to Journey Details...";
    setTimeout(() => {
        window.location.href = "journey.html";
    }, 2000);
});
