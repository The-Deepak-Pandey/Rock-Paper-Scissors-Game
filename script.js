let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
let uS = document.querySelector("#user-score");
let cS = document.querySelector("#comp-score");

const finalResult = (userWin) => {
    // Create a pop-up div to declare the winner
    const popUp = document.createElement('div');
    popUp.classList.add('pop-up');
    
    const winnerMessage = userWin ? "Congratulations! You Won!" : "Game Over! Computer Won!";
    
    popUp.innerHTML = `
        <h2>${winnerMessage}</h2>
        <p>Final Score:</p>
        <p>You: ${userScore} | Computer: ${compScore}</p>
        <button id="playAgain">Play Again</button>
    `;
    
    document.body.appendChild(popUp);
    
    // Add event listener to the Play Again button
    document.getElementById('playAgain').addEventListener('click', () => {
        document.body.removeChild(popUp);
        resetGame();
    });
}

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    uS.innerText = 0;
    cS.innerText = 0;
    msg.style.backgroundColor = "#272838";
    msg.style.color = "#586F6B";
    msg.innerText = "Play your move. The one who scores 3 points first will be the winner";
}

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const compChoice = options[Math.floor(Math.random() * 3)];
    console.log("computer choice = ", compChoice);
    return compChoice;
}

const drawGame = (choice) => {
    console.log("Game was draw");
    msg.innerText = `Draw Hogya Woof! (Both of you chose ${choice})`;
    msg.style.backgroundColor = "#272838";
    msg.style.color = "#586F6B";
}

const showWinner = (userWin) => {
    if (userWin) {
        userScore++;
        uS.innerText = userScore;
        console.log("You Won");
        msg.innerText = "You Won Bro!!";
        msg.style.backgroundColor = "#2BC016";
        msg.style.color = "#CDF7F6";
        if (userScore == 3) {
            setTimeout(() => finalResult(true), 300);
        }
    } else {
        compScore++;
        cS.innerText = compScore;
        console.log("Computer Won");
        msg.innerText = "Sad Hogya Bhai";
        msg.style.backgroundColor = "#BF211E";
        msg.style.color = "#E9CE2C";
        if (compScore == 3) {
            setTimeout(() => finalResult(false), 300);
        }
    }
}

const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    const compChoice = genComputerChoice();
    
    if (userChoice === compChoice) {
        drawGame(userChoice);
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        console.log(`choice was clicked ${userChoice}`);
        playGame(userChoice);
    });
});