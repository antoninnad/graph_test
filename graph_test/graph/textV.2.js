document.querySelector("*").style.zIndex = 4;

const filter = (nombre) => {
	return Math.round(nombre * 10) / 10
}

function arrayMax(arr) {
	return arr.reduce(function (p, v) {
		return (Math.abs(p) > Math.abs(v) ? Math.abs(p) : Math.abs(v));
	});
}





class graph_classic {

	constructor() {
		this.id = null;
		this.data_object = [];
		this.x = []
		this.y = []

		this.axecolor = "red";
		this.color = "#ccc";
		this.liaison_color = "black";
		this.dimy = 120;

		this.pointer = true;
		this.ax_x_diplay = true

		this.ax_y_diplay = true;
		this.graduation = true;
		this.style_fonction = "";
	}



	add_point(json) {


		if (json.data == undefined) {
			console.error("Vous n'avez pas l'attibut data")
		}

		let data = json.data;

		for (data of data) {

			this.data_object.push(data);

			this.x.push(data[0]);

			this.y.push(data[1]);


		}


		console.log(this.data_object);

	}

	change_style(json) {

		if (json.axecolor != undefined) {
			this.axecolor = json.axecolor;
		}

		if (json.color != undefined) {
			this.color = json.color;
		}

		if (json.liaison == false) {
			this.liaison_color = "transparent";
		}

		if (json.point_display == false) {
			this.point_diplay = true;
		}

		if (json.style == "plus") {
			this.style = "plus"
		}

		if (json.style == "croix") {
			this.style = "croix"
		}

		if (json.ax_x_diplay == false) {
			this.ax_x_diplay = false;
		}

		if (json.ax_y_diplay == false) {
			this.ax_y_diplay = false;
		}

		if (!json.graduation) {
			this.graduation = false;
		}

		if (json.style_fonction) {
			this.style_fonction = json.style_fonction;
		}

	}

	label(txt) {

		this.labelx = txt.x;

	}

	afficher(id) {

		if (document.querySelector("#" + id) != null) {

			let selector = document.querySelector("#" + id);

			let maxi = arrayMax(this.y);

			let maxi_x = arrayMax(this.x)


			if (this.ax_x_diplay) {

				selector.innerHTML += `         
		<polygon points="0,100 0,99 210,99 210, 100" fill="${this.axecolor}" style='z-index: 5' class="x"/>`;
			}


			if (this.ax_y_diplay) {

				selector.innerHTML += `<polygon points="0,-6 0,100 1,100 1, -6" fill="${this.axecolor}" class="y"/>`;

			}










			let attribut1 = 0, attribut2 = -.5;

			let stop_y = 5;

			for (let nombre of this.y) {

				if (nombre < 0) {
					selector.setAttribute("viewBox", "-20 -20 250 240")
					stop_y = 11;
					this.dimy = 240;
					this.dimx = 500;
					break;
				}

			}

			for (let i = 0; i != stop_y; i++) {

				let num_axe = ((i > 5) ? -1 : 1) * filter(maxi * Math.abs(i - 5) / 5);

				let marg = (i > 5) ? -15 : -17

				if (this.ax_x_diplay && this.graduation) {

					selector.innerHTML += `<g>
											
											<polygon points="0,${attribut1} 0,${attribut2} 210,${attribut2} 210, ${attribut1}" fill="${this.color}"/>
											<text y="${attribut1}" x="${marg}" style="fill: black;" font-family="Verdana" font-size="6">${num_axe}</text>
										</g>
					`

				} else if (!this.graduation) {



					selector.innerHTML += `<g>
											
										<text y="${attribut1}" x="${marg}" style="fill: black;" font-family="Verdana" font-size="6">${num_axe}</text>
										</g>
					`
				}

				attribut1 += 20;
				attribut2 += 20;

			}

			let attribut_1_x = 40;

			let start_x = -6, stop_x = 100;

			for (let i = 0; i != stop_y; i++) {


				if (i != 5 && this.ax_y_diplay && this.graduation) {
					selector.innerHTML += `<polygon points="${attribut_1_x},${start_x} ${attribut_1_x},${stop_x} ${attribut_1_x + .5},${stop_x} ${attribut_1_x + .5}, ${start_x}" fill="${this.color}"/>`
					attribut_1_x += 40;

				} else if (this.ax_y_diplay && i == 5) {
					start_x = 100;
					stop_x = 206;
					attribut_1_x = 40;
					selector.innerHTML += `<polygon points="0,${start_x} 0,${stop_x} 1,${stop_x} 1, ${start_x}" fill="${this.axecolor}" class="y"/>`
				}




			}




			let point = this.data_object.sort((a, b) => Math.abs(a[0]) - Math.abs(b[0]));

			console.log(point)


			for (let i = 0; i != (this.data_object.length - 1); i++) {

				let xa = (200 * point[i][0]) / maxi_x + 1.5 - 1;
				let ya = Math.abs((100 * point[i][1] / maxi) - 100) - .5;
				let xb = (200 * point[i + 1][0]) / maxi_x + 1.5 - 1;
				let yb = Math.abs((100 * point[i + 1][1] / maxi) - 100) - .5;

				console.log(xa, ya)




				selector.innerHTML += `   <path d="M${xa} ${ya} C ${xa} ${ya}, ${xb} ${yb}, ${xb} ${yb}" stroke="${this.style_fonction}"/> `


			}



			for (let point of this.data_object) {


				if (!this.point_diplay) {
					if (!this.style) {
						let x = (200 * point[0]) / maxi_x - 1;
						let y = Math.abs((100 * point[1] / maxi) - 100) - 3;

						selector.innerHTML += `<rect x="${x}" y="${y}" width="3" height="3" fill="white" stroke="black"/>`;
					} else if (this.style == "plus") {
						selector.innerHTML += `
						<g>
							<text y="${y}" x="${x}" style="fill: red;" font-family="Verdana" font-size="12">+</text>
						</g>	
					`
					} else {
						let x = (200 * point[0]) / maxi_x - 1.5 - 1;
						let y = Math.abs((100 * point[1] / maxi) - 100) + 1.5 - 1;
						selector.innerHTML += `
						<g>
							<text y="${y}" x="${x}" style="fill: red;" font-family="Monospace" font-size="12">x</text>
						</g>	
					`
					}
				}
			}


			if (this.labelx) {

				selector.innerHTML += `
					<g>
						<text y="-12" x="-15" style="fill: black;" font-family="Verdana" font-size="6">${this.labelx}</text>
					</g>	
				`

			}


		}


	}


}

let g = new graph_classic();

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

let somme_initial = 30
let l = []


for (let i = 0; i != 177; i++) {
	if (i % 2) {
		somme_initial -= getRandomInt(30);
	} else {
		somme_initial += getRandomInt(32);
	}

	l.push([i, somme_initial])
}


g.add_point({

	data: l

});

g.change_style({
	axecolor: "#363636",
	color: "rgb(0,0,0,.15)",
	liaison: true,
	point_display: false,
	graduation: true,
	style_fonction: " #2989b9"
})

g.label({
	x: "Valeur en euros"
})

let time_a = Date.now();

g.afficher("svg");

console.log(Date.now() - time_a);