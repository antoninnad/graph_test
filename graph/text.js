document.querySelector("*").style.zIndex = 4;

const filter = (nombre) => {
	return Math.round(nombre * 10) / 10
}

function arrayMax(arr) {
	return arr.reduce(function (p, v) {
	  return ( p > v ? p : v );
	});
  }

class graph{

	constructor () {
		this.id = null;
		this.data_object = [];
		this.x = []
		this.y = []

		this.axecolor = "red";
		this.color = "#ccc";

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
		
		if(json.color != undefined){
			this.color = json.color;
		}

	}

	afficher (id) {

		if (document.querySelector("#" + id) != null) {

			let selector = document.querySelector("#" + id);

			let maxi = arrayMax(this.y);

			let maxi_x = arrayMax(this.x)

			selector.innerHTML += `           
		
		//axe y

		<text x="-18" y="0" font-family="Verdana" font-size="6" text-anchor="start" >${filter(maxi)}</text>
		
		<text x="-18" y="20" font-family="Verdana" font-size="6" text-anchor="start" >${filter(maxi * 4 / 5)}</text>
	
		<text x="-18" y="40" font-family="Verdana" font-size="6" text-anchor="start" >${filter(maxi * 3 / 5)}</text>

		<text x="-18" y="60" font-family="Verdana" font-size="6" text-anchor="start" >${filter(maxi * 2 / 5)}</text>

		<text x="-18" y="80" font-family="Verdana" font-size="6" text-anchor="start" >${filter(maxi / 5)}</text>


		
		<polygon points="0,100 0,98 210,98 210, 100" fill="${this.axecolor}" style='z-index: 5' class="x"/>

		<polygon points="0,80 0,79.5 210,79.5 210, 80" fill="${this.color}"/>

		<polygon points="0,60 0,59.5 210,59.5 210, 60" fill="${this.color}"/>


		<polygon points="0,40 0,39.5 210,39.5 210, 40" fill="${this.color}"/>


		<polygon points="0,20 0,19.5 210,19.5 210, 20" fill="${this.color}"/>


		<polygon points="0,0 0,-.5 210,-.5 210, 0" fill="${this.color}"/>





		<polygon points="0,-6 0,100 2,100 2, -6" fill="${this.axecolor}" class="y"/>

		

		<polygon points="40,-6 40,100 40.5,100 40.5, -6" fill="${this.color}"/>

		<polygon points="80,-6 80,100 80.5,100 80.5, -6" fill="${this.color}"/>

		<polygon points="120,-6 120,100 120.5,100 120.5, -6" fill="${this.color}"/>

		<polygon points="160,-6 160,100 160.5,100 160.5, -6" fill="${this.color}"/>

		<polygon points="200,-6 200,100 200.5,100 200.5, -6" fill="${this.color}"/>

		
		`;


		for (let point of this.data_object) {

			let x = (200 * point[0]) / maxi_x;
			let y = Math.abs((100 * point[1] / maxi) - 100);

			console.log(x + " " + y)

			selector.innerHTML += `<rect x="${x}" y="${y}" width="3" height="3" fill="none" stroke="black"/>`;

		}

		

		let point = this.data_object.sort((a, b) => a[0] - b[0]);

		console.log(point)

		for (let i = 0;i != (this.data_object.length - 1);i++){

			let xa = (200 * point[i][0]) / maxi_x;
			let ya = Math.abs((100 * point[i][1] / maxi) - 100);
			let xb = (200 * point[i + 1][0]) / maxi_x;
			let yb = Math.abs((100 * point[i + 1][1] / maxi) - 100);

			console.log(xa,ya)


			

			selector.innerHTML += `   <path d="M${xa} ${ya} C ${xa} ${ya}, ${xb} ${yb}, ${xb} ${yb}" fill="transparent" stroke="black"/> `


		}


		}

	}


}

let g = new graph();

g.add_point({

	data:[
		[10,2],
		[2,2], 
		[4,4]
	]
	
});

g.change_style({
	axecolor: "#47ab52",
	color: "rgb(0,0,0,.15)"
})

g.afficher("svg");