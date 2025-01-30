const CELL_NUMBER = 4;
const DEFAULT_COLOR = "rgb(102, 131, 212)";

function initContainer() {
   const container = document.createElement("div");
   container.className = "container";
   document.body.appendChild(container);
   console.log("Container created:", container); 
   return container;
}

function createGrid(container, numberCellsPerSide = 4) {
    if (typeof numberCellsPerSide !== "number" || numberCellsPerSide <= 0) {
        throw new Error("Only positive number type is allowed.");
    }

    if (!container) {
        throw new Error("Container not found. Ensure initContainer() is called first.");
    }

    console.log("Attempting to create grid in:", container); 
    const containerSize = parseInt(getComputedStyle(container).width, 10);
    const gapSize = parseInt(getComputedStyle(container).gap, 10);

    const totalGapSize = gapSize * numberCellsPerSide;
    const cellSize = (containerSize-totalGapSize) / numberCellsPerSide;
    console.log(`Container size: ${containerSize}px, Cell size: ${cellSize}px`);
    container.innerHTML = "";


    for (let i = 0; i < numberCellsPerSide ** 2; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        container.appendChild(cell);
    }
}

function getRGBColors() {
    const randRGB = [];
    for (let i = 0; i < 3; i++) {
        const color = Math.floor(Math.random() * 256);
        console.log(i, color);
        randRGB.push(color);
    }
    return randRGB;
}

function resetGridColor() {
    document.querySelectorAll(".cell").forEach(cell => {
        cell.style.backgroundColor = DEFAULT_COLOR;
    });
}

function initButton(name) {
    const button = document.createElement("button");
    button.className = "button";
    button.id = name.toLowerCase().replaceAll(/\s+/g, '-');;
    button.textContent = name;
    document.body.prepend(button);
}

function askForInput() {
    let cellPerSide = prompt("Specify a number of squares per side for new grid.");
    cellPerSide = Number(cellPerSide);
    if (isNaN(cellPerSide)) {
        alert("Please provide a number, not text or symbols.");
        askForInput();
    }

    if (cellPerSide > 100) {
        alert("Number must be less than or equal to 100");
        askForInput();
    }

    const container = document.querySelector(".container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    createGrid(container, cellPerSide);

}

function main() {
    const container = initContainer();
    initButton("Reset");
    initButton("New Grid");
    createGrid(container, CELL_NUMBER);

    document.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("cell")) {
            const colors = getRGBColors();
            const rgbRandColor = `rgb(${colors.join(",")})`;
            event.target.style.backgroundColor = rgbRandColor;
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.id === "reset") {
            resetGridColor();
        } else if (event.target.id === "new-grid") {
            askForInput();
        }
    });

}

main();