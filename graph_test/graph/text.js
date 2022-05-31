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

	}

	afficher(id) {

		if (document.querySelector("#" + id) != null) {

			let selector = document.querySelector("#" + id);

			let maxi = arrayMax(this.y);

			let maxi_x = arrayMax(this.x)

			selector.innerHTML += `           
		
		//axe y


		
		<polygon points="0,100 0,98 210,98 210, 100" fill="${this.axecolor}" style='z-index: 5' class="x"/>

		




		<polygon points="0,-6 0,100 2,100 2, -6" fill="${this.axecolor}" class="y"/>

		



		
		`;

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

				let marg = (i > 5) ? -15 : -12

				selector.innerHTML += `<g>
											
											<polygon points="0,${attribut1} 0,${attribut2} 210,${attribut2} 210, ${attribut1}" fill="${this.color}"/>
											<text y="${attribut1}" x="${marg}" style="fill: black;" font-family="Verdana" font-size="6">${num_axe}</text>
										</g>
					`
				attribut1 += 20;
				attribut2 += 20;

			}

			let attribut_1_x = 40;

			let start_x = -6, stop_x = 100;

			for (let i = 0; i != stop_y; i++) {

				if (i != 5) {
					selector.innerHTML += `<polygon points="${attribut_1_x},${start_x} ${attribut_1_x},${stop_x} ${attribut_1_x + .5},${stop_x} ${attribut_1_x + .5}, ${start_x}" fill="${this.color}"/>`
					attribut_1_x += 40;
				} else {
					start_x = 100;
					stop_x = 206;
					attribut_1_x = 40;
					selector.innerHTML += `<polygon points="0,${start_x} 0,${stop_x} 2,${stop_x} 2, ${start_x}" fill="${this.axecolor}" class="y"/>`
				}




			}




			let point = this.data_object.sort((a, b) => Math.abs(a[0]) - Math.abs(b[0]));

			console.log(point)


			for (let i = 0; i != (this.data_object.length - 1); i++) {

				let xa = (200 * point[i][0]) / maxi_x + 1.5;
				let ya = Math.abs((100 * point[i][1] / maxi) - 100) + -.5;
				let xb = (200 * point[i + 1][0]) / maxi_x + 1.5;
				let yb = Math.abs((100 * point[i + 1][1] / maxi) - 100);

				console.log(xa, ya)




				selector.innerHTML += `   <path d="M${xa} ${ya} C ${xa} ${ya}, ${xb} ${yb}, ${xb} ${yb}" fill="transparent" stroke="${this.liaison_color}"/> `


			}



			for (let point of this.data_object) {

				let x = (200 * point[0]) / maxi_x;
				let y = Math.abs((100 * point[1] / maxi) - 100) - 2;

				console.log(x + " " + y)

				selector.innerHTML += `<rect x="${x}" y="${y}" width="3" height="3" fill="white" stroke="black"/>`;

			}





		}


	}


}

let g = new graph_classic();

g.add_point({

	data: [
		[0, 0],
		[1, -2],
		[2, -7],
		[4, 8],
		[5, 10],

	]

});

g.change_style({
	axecolor: "#47ab52",
	color: "rgb(0,0,0,.15)",
	liaison: true
})

g.afficher("svg");