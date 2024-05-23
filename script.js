function startUp(){
    const board = document.querySelector(".board")
    let length = parseInt(prompt("Enter length (in pixels)"))
    while ((isNaN(length) || length > 100 || length < 1)) {
        length = parseInt(prompt("Enter valid length"))
    }

    for (let i = 0; i < length; i++){
        let row = document.createElement("div")
        row.classList.add("row")
        board.appendChild(row)

        for (let j = 0; j < length; j++) {
            let cell = document.createElement("div")
            cell.classList.add("cell")

            cell.addEventListener("mouseover", event => {
                event.currentTarget.style.backgroundColor = "black"
            })
            row.appendChild(cell)
        }
    }
    const rgb_button = document.querySelector("button.rgb")
    rgb_button.addEventListener("click", event => {

    })

    const reset_button = document.querySelector("button.reset")
    reset_button.addEventListener("click", event => {
        const cells = document.querySelectorAll(".cell")
        cells.forEach(cell=> {
            cell.style.backgroundColor = "white"
        })
    })
}

function getRandomRGBColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// set value for color changing button
// if button is click set
startUp()