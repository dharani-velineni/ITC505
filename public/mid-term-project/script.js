const storyData = {
    start: {
        text: "You find yourself in a dense forest. Do you want to explore further or stay put?",
        choices: [
            { text: "Explore", next: "explorePath" },
            { text: "Stay", next: "stayPath" }
        ],
        image: "images/forest.jpg"
    },
    explorePath: {
        text: "You venture deeper and come across a cave. Do you enter the cave or continue walking?",
        choices: [
            { text: "Enter Cave", next: "cavePath" },
            { text: "Keep Walking", next: "walkPath" }
        ],
        image: "images/cave.jpg"
    },
    stayPath: {
        text: "You stay at your spot and notice a hidden chest nearby. Do you open it or leave it?",
        choices: [
            { text: "Open Chest", next: "openChest" },
            { text: "Leave It", next: "leaveChest" }
        ],
        image: "images/chest.jpeg"
    },
    cavePath: {
        text: "Inside the cave, you find a glowing sword. Do you take it or leave it?",
        choices: [
            { text: "Take Sword", next: "takeSword" },
            { text: "Leave Sword", next: "leaveSword" }
        ],
        image: "images/sword.jpg"
    },
    walkPath: {
        text: "While walking, you find a magical spring. Do you drink the water or continue your journey?",
        choices: [
            { text: "Drink Water", next: "drinkWater" },
            { text: "Continue Walking", next: "keepWalking" }
        ],
        image: "images/spring.jpg"
    },
    openChest: {
        text: "🎉 You find treasure inside! You've won! 🎉",
        choices: [],
        image: "images/treasure.jpeg",
        outcome: "win"
    },
    leaveChest: {
        text: "You hear strange noises. A wild animal attacks! You lost. 🦁",
        choices: [],
        image: "images/wildAnimal.jpeg",
        outcome: "lose"
    },
    takeSword: {
        text: "The sword is cursed! You slowly turn to stone. You lost. 🪨",
        choices: [],
        image: "images/curse.jpeg",
        outcome: "lose"
    },
    leaveSword: {
        text: "You safely exit the cave. You've survived! 🎉 You won!",
        choices: [],
        image: "images/safeExit.jpeg",
        outcome: "win"
    },
    drinkWater: {
        text: "The water heals your wounds. You've gained super strength and won the game! 💪",
        choices: [],
        image: "images/superStrength.jpeg",
        outcome: "win"
    },
    keepWalking: {
        text: "You walk into the wilderness, but get lost. You lost. 🗺️",
        choices: [],
        image: "images/lost.jpeg",
        outcome: "lose"
    }
};

function startGame() {
    updatePage("start");
}


function transition(newPart) {
    const transitionElement = document.getElementById("transition");
    transitionElement.textContent = "Entering...";
    transitionElement.classList.add("fade-in");

    setTimeout(() => {
        transitionElement.classList.remove("fade-in");
        updatePage(newPart);
    }, 1500); 
}


function updatePage(part) {
    const story = storyData[part];
    
    // Update story text with fade-in animation
    const storyElement = document.getElementById("story");
    storyElement.classList.remove("fade-in");
    setTimeout(() => storyElement.classList.add("fade-in"), 50);
    storyElement.textContent = story.text;

    // Clear old choices
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = '';

    // Create new choice buttons
    story.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.onclick = () => transition(choice.next); 
        choicesDiv.appendChild(button);
    });
    
    // Update image with fade-in animation
    const imageElement = document.getElementById("storyImage");
    imageElement.classList.remove("fade-in");
    setTimeout(() => imageElement.classList.add("fade-in"), 50);
    imageElement.src = story.image;

    // If no choices are left, it's an ending
    if (story.choices.length === 0) {
        const endMessage = document.createElement("p");
        endMessage.textContent = "The End!";
        choicesDiv.appendChild(endMessage);

        // Retry button
        const retryButton = document.createElement("button");
        retryButton.textContent = "Retry";
        retryButton.onclick = startGame;
        choicesDiv.appendChild(retryButton);

        // Outcome styling
        if (story.outcome === "win") {
            storyElement.style.color = "green";  
        } else if (story.outcome === "lose") {
            storyElement.style.color = "red";  
        }
    }
}

// Start the game when the page loads
window.onload = startGame;
