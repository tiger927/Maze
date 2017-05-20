
function Spot(i,j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.neighbors = [];
	this.previous = undefined;
	this.wall = false;


	this.show = function(col) {
		//fill(col);
		if( this.wall) {
		//	fill(0);
		}
		//noStroke();
		//rect(this.i*w,this.j*w,w-1,w-1);
	}

	this.addNeighbors = function(grid) {
		var i = this.i;
		var j = this.j;
		if(net[index(i+1,j)] && !net[index(i,j)].walls[1]) {
			this.neighbors.push(grid[i+1][j]);
		}
		if(net[index(i-1,j)] && !net[index(i,j)].walls[3]){
			this.neighbors.push(grid[i-1][j]);
		}
		if(net[index(i,j+1)] && !net[index(i,j)].walls[2]){
			this.neighbors.push(grid[i][j+1]);
		}
		if(net[index(i,j-1)] && !net[index(i,j)].walls[0]){
			this.neighbors.push(grid[i][j-1]);
		}

	}
}