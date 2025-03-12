
// Function to show the welcome and instruction modal
function showWelcomeModal() {
    const modalContent = `
        <div id="welcomeModal" class="modal">
            <div class="modal-content">
                <h2>Welcome</h2>
                <p>Follow these instructions to set up a new pin code:</p>
                <ul>
                    <li>Enter a 4-digit pin code.</li>
                    <li>Confirm the pin code by entering it again.</li>
                </ul>
                <button id="continueButton">Continue</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalContent);

    document.getElementById('continueButton').addEventListener('click', () => {
        document.getElementById('welcomeModal').remove();
        setNewPinLock();
    });
}

// Function to set a new pin lock
function setNewPinLock() {
    // Display the lock screen for entering the new pin
    Lock.showLockScreen("Enter your new 4-digit pin:")
        .then(newPin => {
            // Validate the pin
            if (newPin.length !== 4 || isNaN(newPin)) {
                alert("Invalid pin. Please enter a 4-digit number.");
                return;
            }

            // Display the lock screen for confirming the new pin
            return Lock.showLockScreen("Confirm your new 4-digit pin:")
                .then(confirmPin => {
                    // Check if the pins match
                    if (newPin !== confirmPin) {
                        alert("Pins do not match. Please try again.");
                        return;
                    }

                    // Save the new pin using Lock.js
                    return Lock.setPin(newPin)
                        .then(() => {
                            alert("You set up passcode successfully!");
                        })
                        .catch((error) => {
                            alert("Failed to set new pin: " + error.message);
                        });
                });
        })
        .catch((error) => {
            alert("Failed to set new pin: " + error.message);
        });
}

// Example usage
showWelcomeModal();

