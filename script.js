function generateBoard(dimension){
    for (let i = 0; i < dimension; i++){
        let row = document.createElement("div")
        row.classList.add("row")
        board.appendChild(row)

        for (let j = 0; j < dimension; j++) {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            row.appendChild(cell)
        }
    }
}

function addInk(rgb){
    const cells = document.querySelectorAll(".cell")
    if (!rgb){
        cells.forEach(cell => {
            cell.addEventListener("mouseover", event => {
                cell.style.backgroundColor = "black"
            })
        })
    }
}
function startUp(){
    let dimension = parseInt(prompt("Enter length (in pixels)"))
    while (isNaN(dimension) || dimension > 100 || dimension < 1) {
        dimension = parseInt(prompt("Enter valid length"))
    }
    generateBoard(dimension)
    addInk(rgb)

    // const rgb_button = document.querySelector("button.rgb")
    // rgb_button.addEventListener("click", event => {
    //     rgb = true
    //     //reset addInk and the board
    // })

    const reset_button = document.querySelector("button.reset")
    reset_button.addEventListener("click", event => {
        const cells = document.querySelectorAll(".cell")
        cells.forEach(cell=> {
            cell.style.backgroundColor = "white"
        })
    })
}

// function getRandomRGBColor() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgb(${r}, ${g}, ${b})`;
// }

let rgb = false
const board = document.querySelector(".board")
startUp()