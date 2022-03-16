console.log('js ok');


const grid = document.querySelector('#grid');
let difficulty = parseInt(document.querySelector('#range').value);
let range = Math.sqrt(difficulty);
let tab = createGrid();



//Button/Event for difficulty change
const button = document.querySelector('#button');
button.addEventListener('click', function () {

    grid.innerHTML = ''; //delete the old Grid
    difficulty = parseInt(document.querySelector('#range').value);
    createGrid(); //Create a new grid

});

// Function for GRID creation
function createGrid() {
    for (let i = 0; i < difficulty; i++) {
        const cell = createCell();
        cell.innerText = (i + 1);

        cell.addEventListener('click', function () {
            cell.classList.toggle('ct-blue');
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