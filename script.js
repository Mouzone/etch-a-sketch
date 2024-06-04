// host on github pages to play around with

function generateBoard(dimension){
    const board = document.querySelector(".board")
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

function addRGB(){
    const cells = document.querySelectorAll(".cell")
    const gradient_slider = document.querySelector("input")

    cells.forEach(cell => {
        cell.addEventListener("mouseover", event => {
            cell.style.backgroundColor = getRandomRGBColor()
        })
    })

    gradient_slider.disabled = true
}

function addInk(color, gradient=100){
    const cells = document.querySelectorAll(".cell")

    cells.forEach(cell => {
        cell.addEventListener("mouseover", event => {
            console.log(cell.style.backgroundColor)
            let match = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([01]?\.?\d+)\s*)?\)$/);
            let r = match[1]
            let g = match[2]
            let b = match[3]
            let alpha = match[4] ?? 0
            cell.style.backgroundColor = `rgba(${r}, ${g}, ${b},${Math.min(1, alpha + (gradient * .01))})`;
        })
    })
}

function startUp(){
    const rgb_button = document.querySelector("button.rgb")
    const reset_button = document.querySelector("button.reset")
    reset_button.addEventListener("click", event => {
        generateBoard(dimension)
        if (rgb_button.classList.contains("active")){
            addRGB()
        } else {
            addInk(color, gradient)
        }
    })

    const color_buttons = document.querySelectorAll("button.color")
    color_buttons.forEach(color_button => {
        color_button.addEventListener("click", event => {
            gradient_slider.disabled = false
            color_buttons.forEach(color_button=>color_button.classList.remove("active"))
            color_button.classList.toggle("active")
            generateBoard(dimension)
            if (color_button.classList.contains("rgb")){
                addRGB()
            } else{
                color = window.getComputedStyle(color_button).backgroundColor
                addInk(color, gradient)
            }
        })
    })

    const gradient_slider = document.querySelector("input")
    gradient_slider.addEventListener("input", event => {
        gradient = gradient_slider.value
        generateBoard(dimension)
        addInk(color, gradient)
    })

    let dimension = parseInt(prompt("Enter length (in pixels)"))
    while (isNaN(dimension) || dimension > 100 || dimension < 1) {
        dimension = parseInt(prompt("Enter valid length"))
    }

    //make gradient work on startup with black color
    const black = document.querySelector("button.color.black")
    black.classList.add("active")
    let color = "rgba(0, 0, 0, 0)"
    let gradient = 100
    generateBoard(dimension)
    addInk(color)
}

startUp()