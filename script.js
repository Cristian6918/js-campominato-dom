console.log('js ok');


const grid = document.querySelector('#grid');
let difficulty = parseInt(document.querySelector('#range').value);
let blueCell;
let bombs = [];
let bombCell = document.querySelectorAll('.bomb');
const finalMessageContainer = document.querySelector('.final-message-container');
const finalResult = document.querySelector('#final-result');
const restartButton = document.querySelector('#reset');
let finalScore = document.querySelector('#final-score');








//Button/Event for difficulty change
const button = document.querySelector('#button');
button.addEventListener('click', reset);


// Function for GRID creation
function createGrid() {
    bombs = generateBombs(1, difficulty, 16);


    let score = document.querySelector('#score');
    for (let i = 1; i <= difficulty; i++) {
        const cell = createCell();
        // cell.innerText = i;
        cell.setAttribute('id', `${i}`);

        cell.addEventListener('click', function () {
            if (!bombs.includes(i)) {
                cell.classList.add('ct-blue');
                // bombsAround(i);
                cell.innerText = bombsAround(i);
            }
            else {
                cell.classList.add('bomb-act');
                endGame(false);
            }
            blueCell = document.querySelectorAll('.ct-blue');

            score.innerText = `Score: ${blueCell.length}`;
            if (blueCell.length === difficulty - 16) {
                endGame(true);
            }
        })
        grid.appendChild(cell);
    }
}


//Function for Cells Creation
function createCell() {
    const element = document.createElement('div');
    if (difficulty === 100) {
        element.classList.add('square-100');
    } else if (difficulty === 81) {
        element.classList.add('square-81');
    } else if (difficulty === 49) {
        element.classList.add('square-49');
    }
    return element;
}

// Generate Bombs
function generateBombs(min, max, nrBombs) {
    const range = max - min;
    let array = [];
    for (let i = 0; i < nrBombs; i++) {
        number = Math.floor(Math.random() * range + 1);
        while (array.includes(number)) {
            number = Math.floor(Math.random() * range + 1);
        }
        array.push(number);
    }
    return array;
}

//End Game Function 
function endGame(isWin) {
    showBombs();
    finalMessageContainer.classList.remove('d-none');


    if (!isWin) {
        finalScore.innerText = `Score:${blueCell.length}`;
        finalResult.innerText = 'You Lost!'
    } else {

        finalResult.innerText = 'You Win!';
    }
    restartButton.addEventListener('click', () => {
        reset();
        finalMessageContainer.classList.add('d-none');
    });
}

function showBombs() {
    for (let i = 0; i < bombs.length; i++) {
        element = document.getElementById(`${bombs[i]}`);

        element.classList.add('bomb-act');
    }
}

function reset() {
    grid.innerHTML = ''; //delete the old Grid
    difficulty = parseInt(document.querySelector('#range').value);
    createGrid(); //Create a new grid
    blueCell = [];
    score.innerText = `Score: ${blueCell.length}`;
}

function bombsAround(cellPosition) {
    const rangeAround = Math.sqrt(difficulty);
    let cont = 0;
    const aroundArea = [];
    switch (true) {
        case cellPosition % rangeAround === 1:
            aroundArea.push(cellPosition + 1 - rangeAround);
            aroundArea.push(cellPosition - rangeAround);
            aroundArea.push(cellPosition + 1);
            aroundArea.push(cellPosition + rangeAround);
            aroundArea.push(cellPosition + 1 + rangeAround);
            break;
        case cellPosition % rangeAround === 0:
            aroundArea.push(cellPosition - rangeAround);
            aroundArea.push(cellPosition - 1 - rangeAround);
            aroundArea.push(cellPosition - 1);
            aroundArea.push(cellPosition - 1 + rangeAround);
            aroundArea.push(cellPosition + rangeAround);
            break;
        case cellPosition % rangeAround > 1:
            aroundArea.push(cellPosition - 1 - rangeAround);
            aroundArea.push(cellPosition - rangeAround);
            aroundArea.push(cellPosition + 1 - rangeAround);
            aroundArea.push(cellPosition - 1);
            aroundArea.push(cellPosition + 1);
            aroundArea.push(cellPosition - 1 + rangeAround);
            aroundArea.push(cellPosition + rangeAround);
            aroundArea.push(cellPosition + 1 + rangeAround);
            break;
    }

    for (let index = 0; index < aroundArea.length; index++) {
        if (bombs.includes(aroundArea[index]))
            cont++;
    }
    console.log(aroundArea);
    return cont;

}




createGrid();







