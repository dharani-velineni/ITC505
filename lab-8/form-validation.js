document.getElementById('secure-form').addEventListener('submit', function (e) {
    const firstName = sanitizeInput(document.getElementById('first-name').value.trim());
    const lastName = sanitizeInput(document.getElementById('last-name').value.trim());
    const email = sanitizeInput(document.getElementById('email').value.trim());
    const password = sanitizeInput(document.getElementById('password').value.trim());
    const confirmPassword = sanitizeInput(document.getElementById('confirm-password').value.trim());

    // Client-side validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        alert("All fields are required!");
        e.preventDefault();
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format!");
        e.preventDefault();
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        e.preventDefault();
        return;
    }

    // If validation passes, inputs are sanitized and the form is submitted.
    console.log("Sanitized Data:", { firstName, lastName, email });
    alert("Form submitted successfully!");
});

/**
 * Function to sanitize user inputs
 * This replaces potentially dangerous characters with safe equivalents.
 */
function sanitizeInput(input) {
    return input.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
}
