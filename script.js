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

function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}

function addInk(rgb, gradient){
    const cells = document.querySelectorAll(".cell")

    cells.forEach(cell => {
        cell.addEventListener("mouseover", event => {
            if (!rgb && gradient) {
                let alpha_value = parseFloat(cell.style.backgroundColor.split(',')[3].replace(')', ''))
                cell.style.backgroundColor =
                    `rgba(0, 0, 0, ${alpha_value + (gradient * .01)})`
            } else if (!rgb) {
                cell.style.backgroundColor = "rgba(0, 0, 0, 1)"
            } else {
                cell.style.backgroundColor = getRandomRGBColor()
            }
        })
    })
}

function startUp(){
    let dimension = parseInt(prompt("Enter length (in pixels)"))
    while (isNaN(dimension) || dimension > 100 || dimension < 1) {
        dimension = parseInt(prompt("Enter valid length"))
    }

    generateBoard(dimension)
    addInk(rgb, gradient)

    const clear_button = document.querySelector("button.clear")
    clear_button.addEventListener("click", event => {
        generateBoard(dimension)
        addInk(rgb, gradient)
    })

    const rgb_button = document.querySelector("button.rgb")
    rgb_button.addEventListener("click", event => {
        rgb_button.classList.toggle("active")
        gradient_slider.value = "100"
        const gradient_slider_text = document.querySelector("p#rangeValue")
        gradient_slider_text.textContent = "100"
        rgb = !rgb
        gradient = 100
        generateBoard(dimension)
        addInk(rgb, gradient)
    })

    const gradient_slider = document.querySelector("input")
    gradient_slider.addEventListener("click", event => {
        rgb_button.classList.remove("active")
        rgb = false
        gradient = gradient_slider.value
        generateBoard(dimension)
        addInk(rgb, gradient)
    })
}

let rgb = false
let gradient = 100
const board = document.querySelector(".board")
startUp()