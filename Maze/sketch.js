var cols,row;
var net = [];
var cols = 30;
var rows = 30;
var w;
var grid = new Array(cols);
var start;
var end;
var openSet = [];
var closedSet = [];
var count = 0;

var current;
var current2;
var path;

var stack = [];

function setup() {
	createCanvas(750,750);
	w = width / cols;
	//frameRate(5);

	cols = floor(width/w);
	rows = floor(height/w);

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i <cols; i++) {
			var cell = new Cell(i,j);
			net.push(cell);
		}
	}


	openSet.push(start);

	current2 = net[0];
}

function draw() {
	background(51);
	for (var i = 0; i < net.length; i++) {
		net[i].show();
	}
	if(count != 2){
		if(current2 == net[0]){
			count += 1;
		}

		if(count == 2) {

			for (var i = 0; i < cols; i++) {
				grid[i] = new Array(rows);
			}

			for (var i = 0; i <cols; i++) {
				for (var j = 0; j < rows; j++) {
					grid[i][j] = new Spot(i,j);
				}
			}
			for (var i = 0; i <cols; i++) {
				for (var j = 0; j < rows; j++) {
					grid[i][j].addNeighbors(grid);
				}
			}

			start = grid[0][0];
			end = grid[cols-1][rows-1];
			openSet[0] = start;
		}

		current2.visited = true;
		current2.highlight();
		var next = current2.checkNeighbors();
		if(next) {
			next.visited = true;

			stack.push(current2);

			removeWalls(current2,next);

			current2 = next;
		} else if(stack.length > 0){
			current2 = stack.pop();
		}
	}else{
		if(openSet.length > 0) {
		//we can keep going
		var winner = 0;
		for (var i = 0; i < openSet.length; i++) {
			if(openSet[i].f < openSet[winner].f) {
				winner = i;
			}
		}
		var current = openSet[winner];
		if(current === end) {

			noLoop();
			console.log("DONE!");
		}
		removeFromArray(openSet, current);
		closedSet.push(current);

		var neighbors = current.neighbors;
		for (var i = 0; i < neighbors.length; i++){
			var neighbor = neighbors[i];

			if(!closedSet.includes(neighbor) && !neighbor.wall){
				var tempG = current.g + 1;
				var newPath = false;
				if(openSet.includes(neighbor)){
					if (tempG < neighbor.g) {
						neighbor.g = tempG;
						newPath = true;
					}
				}else{
					neighbor.g = tempG;
					newPath = true;
					openSet.push(neighbor);
				}
				if(newPath){
					neighbor.h = heurisitic(neighbor,end);
					neighbor.f = neighbor.g + neighbor.h;
					neighbor.previous = current;
				}

			}
		}
	}else{
		//no solution
		console.log('no solution');
		noLoop();
		return;
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].show(color(255));
		}
	}

	for (var i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255,0,0));
	}
	for (var i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0,255,0));
	}
	path = [];
	var temp = current;
	path.push(temp);
	while(temp.previous) {
		path.push(temp.previous);
		temp = temp.previous;
	}


	for(var i = 0; i < path.length; i++){

		path[i].show(color(0,0,255));
	}

	noFill();
	stroke(150);
	beginShape();
	for (var i = 0; i < path.length; i++) {
		vertex(path[i].i*w+w/2,path[i].j*w+w/2);
	}
	endShape();

	}
}


function index(i, j) {
	if (i < 0 || j < 0 || i > cols-1 || j > rows-1){
		return -1;
	}
	return i + j * cols;
}

function heurisitic(a,b) {
	var d = abs(a.i-b.i)+abs(a.j-b.j);
	//var d = dist(a.i,a.j,b.i,b.j);
	return d;
}

function removeFromArray(arr,elt) {
	for (var i =arr.length-1; i >=0; i--) {
		if (arr[i] == elt) {
			arr.splice(i, 1);
		}
	}
}