// host on github pages to play around with

function generateBoard(dimension){
    board.innerHTML = ""

    for (let i = 0; i < dimension; i++){
        let row = document.createElement("div")
        row.classList.add("row")
        board.appendChild(row)

        for (let j = 0; j < dimension; j++) {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            cell.style.backgroundColor = "rgba(0, 0, 0, 0)"
            row.appendChild(cell)
        }
    }
}

// function getRandomRGBColor() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgba(${r}, ${g}, ${b}, 1)`;
// }

function addInk(color, gradient){
    const cells = document.querySelectorAll(".cell")

    cells.forEach(cell => {
        cell.addEventListener("mouseover", event => {
            let match = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([01]?\.?\d+)\s*)?\)$/);
            let r = match[1]
            let g = match[2]
            let b = match[3]
            let alpha = match[4] ?? 0
            // gradient effect not really working 
            cell.style.backgroundColor = `rgba(${r}, ${g}, ${b},${Math.min(1, alpha + (gradient * .01))})`;
            console.log(cell.style.backgroundColor)
        })
    })
}

function startUp(){
    let dimension = parseInt(prompt("Enter length (in pixels)"))
    while (isNaN(dimension) || dimension > 100 || dimension < 1) {
        dimension = parseInt(prompt("Enter valid length"))
    }

    generateBoard(dimension)
    addInk(color, gradient)

    const reset_button = document.querySelector("button.reset")
    reset_button.addEventListener("click", event => {
        generateBoard(dimension)
        addInk(color, gradient)
    })

    // auto set to black color first
    const black = document.querySelector("button.color.black")
    black.classList.add("active")

    const color_buttons = document.querySelectorAll("button.color")
    color_buttons.forEach(color_button => {
        color_button.addEventListener("click", event => {
            color_buttons.forEach(color_button=>color_button.classList.remove("active"))
            color_button.classList.toggle("active")
            color = window.getComputedStyle(color_button).backgroundColor
            generateBoard(dimension)
            addInk(color, gradient)
        })
    })

    // const rgb_button = document.querySelector("button.rgb")
    // rgb_button.addEventListener("click", event => {
    //     rgb_button.classList.toggle("active")
    //     gradient_slider.value = "100"
    //     const gradient_slider_text = document.querySelector("p#rangeValue")
    //     gradient_slider_text.textContent = "100"
    //     rgb = !rgb
    //     gradient = 100
    //     generateBoard(dimension)
    //     addInk(rgb, color, gradient)
    // })

    const gradient_slider = document.querySelector("input")
    gradient_slider.addEventListener("input", event => {
        gradient = gradient_slider.value
        generateBoard(dimension)
        addInk(color, gradient)
    })
}

// make these default arguments of addInk later
let gradient = 100
let color = "rgba(0, 0, 0, 1)"
const board = document.querySelector(".board")
startUp()