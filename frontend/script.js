
const API_URL = "https://fy9vxbuge9.execute-api.us-east-1.amazonaws.com/dev/tickets";

const ticketForm = document.getElementById("ticketForm");
const submitBtn = document.getElementById("submitBtn");
const buttonText = document.getElementById("buttonText");
const formMessage = document.getElementById("formMessage");

ticketForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect ticket details
    const ticketData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        description: document.getElementById("description").value.trim()
    };

    // Show loading state
    submitBtn.disabled = true;
    buttonText.textContent = "Submitting...";
    formMessage.className = "form-message";
    formMessage.textContent = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Unable to submit your ticket.");
        }

        // Display success message
        formMessage.className = "form-message success";
        formMessage.textContent =
            `Your ticket was submitted successfully! Ticket ID: ${result.ticket.ticketId}`;

        // Reset form after successful submission
        ticketForm.reset();

    } catch (error) {
        console.error("Ticket submission error:", error);

        formMessage.className = "form-message error";
        formMessage.textContent =
            error.message || "Something went wrong. Please try again.";
    } finally {
        submitBtn.disabled = false;
        buttonText.textContent = "Submit Ticket";
    }
});
