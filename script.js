class Grid {
	constructor(numberOfTiles, color = "black") {
		this.numberOfTiles = numberOfTiles;
		this.color = color;
		this.mousePressed = false;
		this.checkMousePressed();
	}

	checkMousePressed() {
		document.addEventListener("mousedown", () => {
			this.mousePressed = true;
		});
		document.addEventListener("mouseup", () => {
			this.mousePressed = false;
		});
	}

	makeGrid(numberOfTiles = undefined) {
		if (numberOfTiles) {
			this.numberOfTiles = numberOfTiles;
		}
		this.deleteGrid();
		const gridContainer = document.getElementById("grid-container");
		for (let i = 0; i < this.numberOfTiles * this.numberOfTiles; i += 1) {
			const newTile = document.createElement("div");
			newTile.classList.add("tile");
			newTile.value = "";
			newTile.addEventListener("mouseenter", () => {
				if (this.mousePressed) {
					newTile.style.backgroundColor = this.color;
				}
			});
			newTile.addEventListener("mousedown", () => {
				newTile.style.backgroundColor = this.color;
			});
			newTile.style.width = `${100 / this.numberOfTiles}%`;
			gridContainer.appendChild(newTile);
		}
	}

	// eslint-disable-next-line class-methods-use-this
	deleteGrid() {
		const gridContainer = document.getElementById("grid-container");
		while (gridContainer.firstChild) {
			gridContainer.removeChild(gridContainer.lastChild);
		}
	}

	setColor(color) {
		this.color = color;
	}
}

function main() {
	const slider = document.getElementById("grid-slider");
	const sliderHeader = document.getElementById("slider-header");
	sliderHeader.innerHTML = `${slider.value} x ${slider.value}`;

	const grid = new Grid(slider.value);
	grid.makeGrid();

	slider.oninput = () => {
		grid.makeGrid(slider.value);
		sliderHeader.innerHTML = `${slider.value} x ${slider.value}`;
	};

	const clearButton = document.getElementById("clear-button");
	clearButton.addEventListener("click", () => {
		document.querySelectorAll(".tile").forEach((tile) => {
			// eslint-disable-next-line no-param-reassign
			tile.style.backgroundColor = "white";
		});
	});

	const colorSelector = document.getElementById("color-selector");
	colorSelector.oninput = () => {
		grid.setColor(colorSelector.value);
	};
}

main();
