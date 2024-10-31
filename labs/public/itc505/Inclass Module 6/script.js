
const colorButton = document.getElementById('colorButton');
let colorState = 0;

colorButton.addEventListener('click', function () {
    if (colorState === 0) {
        colorButton.classList.remove('green');
        colorButton.classList.add('yellow');
        colorState = 1; 
    } else if (colorState === 1) {
        colorButton.classList.remove('yellow');
        colorButton.classList.add('green');
        colorState = 2;
    } else {
        colorButton.classList.remove('green');
        colorState = 0;
    }
});

const form = document.getElementById('userForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const userInput = document.getElementById('userInput').value;
    
    if (userInput === "") {
        alert("Input field cannot be empty!");
    } else {
        alert("You entered: " + userInput);
    }
});
