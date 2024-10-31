document.addEventListener("DOMContentLoaded", function() {
    const addInputBtn = document.getElementById("addInputBtn");
    const sortBtn = document.getElementById("sortBtn");
    const resetBtn = document.getElementById("resetBtn");
    const numberInputsContainer = document.getElementById("numberInputs");
    const sortedSpan = document.getElementById("sorted");
    const errorMessage = document.getElementById("errorMessage");

    function createInputField() {
        const input = document.createElement("input");
        input.type = "number";  
        input.className = "numberInput";
        input.placeholder = "Enter a number";

        // Add keyboard event listener to move to the next input field
        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); 
                const nextInput = this.nextElementSibling;
                if (nextInput && nextInput.tagName === "INPUT") {
                    nextInput.focus(); 
                }
            }
        });

        numberInputsContainer.appendChild(input);
    }

    // Add six input fields on page load
    for (let i = 0; i < 6; i++) {
        createInputField();
    }

    // Add new input field when "Add Number" button is clicked
    addInputBtn.addEventListener("click", function() {
        createInputField();
    });

    // Function to sort numbers when the sort button is clicked
    sortBtn.addEventListener("click", function() {
        const inputs = document.querySelectorAll(".numberInput");
        let numArray = [];

        errorMessage.textContent = "";
        sortedSpan.textContent = "";

        // Collect numbers from all input fields
        inputs.forEach(input => {
            const value = Number(input.value);
            if (!isNaN(value) && input.value.trim() !== "") {
                numArray.push(value);
            } else {

                errorMessage.textContent = "Please enter valid numbers only!";
                return;
            }
        });

        // If there are no valid numbers, display error
        if (numArray.length === 0) {
            errorMessage.textContent = "Please enter valid numbers in the text boxes.";
            return;
        }

        // Sort the numbers using bubble sort
        const sortedArray = bubbleSort(numArray);

        // Display the sorted array
        sortedSpan.textContent = sortedArray.join(", ");
    });

    // Reset Button Functionality - Clear all inputs
    resetBtn.addEventListener("click", function() {
        numberInputsContainer.innerHTML = '';
        sortedSpan.textContent = '';           
        errorMessage.textContent = '';         
        
        for (let i = 0; i < 6; i++) {
            createInputField();
        }
    });

    function bubbleSort(arr) {
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
});
