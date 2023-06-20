// Security hole: don't parse arbitrary JavaScript

var parseFunction = function (S) {
	var carets;
	carets = parseCaret(S);
	var output;

	i = 0;
	output = "";
	while (i < carets.length) {
		if (allowablechar(carets[i])) { output = output + carets[i]; i = i + 1; }
		else if (carets[i] === "x" && (i === carets.length - 1 || allowablechar(carets[i + 1]))) { output = output + carets[i]; i = i + 1; }
		else if (carets[i] === "v" && (i === carets.length - 1 || allowablechar(carets[i + 1]))) { output = output + carets[i]; i = i + 1; }
		else if (carets[i] === "y" && (i === carets.length - 1 || allowablechar(carets[i + 1]))) { output = output + carets[i]; i = i + 1; }
		else if (carets[i] === "e" && (i === carets.length - 1 || allowablechar(carets[i + 1]))) { output = output + "(Math.E)"; i = i + 1; }
		else if (carets[i] === "t" && (i === carets.length - 1 || allowablechar(carets[i + 1]))) { output = output + "x"; i = i + 1; }
		else if (carets.substring(i, i + 2) === "x'" && (i === carets.length - 2 || allowablechar(carets[i + 2]))) { output = output + "v"; i = i + 2; }
		else if (carets.substring(i, i + 2) === "pi" && (i === carets.length - 2 || allowablechar(carets[i + 2]))) { output = output + "(Math.PI)"; i = i + 2; }
		else if (carets.substring(i, i + 2) === "u(") { output = output + "u("; i = i + 2; }
		else if (carets.substring(i, i + 3) === "ln(") { output = output + "Math.log("; i = i + 3; }
		else if (carets.substring(i, i + 4) === "abs(") { output = output + "Math.abs("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "max(") { output = output + "Math.max("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "min(") { output = output + "Math.min("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "exp(") { output = output + "Math.exp("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "log(") { output = output + "Math.log("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "sin(") { output = output + "Math.sin("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "cos(") { output = output + "Math.cos("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "tan(") { output = output + "Math.tan("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "csc(") { output = output + "csc("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "sec(") { output = output + "sec("; i = i + 4; }
		else if (carets.substring(i, i + 4) === "cot(") { output = output + "cot("; i = i + 4; }
		else if (carets.substring(i, i + 5) === "sqrt(") { output = output + "Math.sqrt("; i = i + 5; }
		else if (carets.substring(i, i + 5) === "asin(") { output = output + "Math.asin("; i = i + 5; }
		else if (carets.substring(i, i + 5) === "acos(") { output = output + "Math.acos("; i = i + 5; }
		else if (carets.substring(i, i + 5) === "atan(") { output = output + "Math.atan("; i = i + 5; }
		else if (carets.substring(i, i + 5) === "acsc(") { output = output + "acsc("; i = i + 5; }
		else if (carets.substring(i, i + 5) === "asec(") { output = output + "asec("; i = i + 5; }
		else if (carets.substring(i, i + 5) === "acot(") { output = output + "acot("; i = i + 5; }
		else if (carets.substring(i, i + 7) === "arcsin(") { output = output + "Math.asin("; i = i + 7; }
		else if (carets.substring(i, i + 7) === "arccos(") { output = output + "Math.acos("; i = i + 7; }
		else if (carets.substring(i, i + 7) === "arctan(") { output = output + "Math.atan("; i = i + 7; }
		else if (carets.substring(i, i + 7) === "arccsc(") { output = output + "acsc("; i = i + 7; }
		else if (carets.substring(i, i + 7) === "arcsec(") { output = output + "asec("; i = i + 7; }
		else if (carets.substring(i, i + 7) === "arccot(") { output = output + "acot("; i = i + 7; }
		else if (carets.substring(i, i + 9) === "Math.pow(") { output = output + "Math.pow("; i = i + 9; }
		else { return ""; }
	}


	return output;
}

function allowablechar(x) {
	if (x === ".") { return true; }
	else if (x === ",") { return true; }
	else if (x === "0") { return true; }
	else if (x === "1") { return true; }
	else if (x === "2") { return true; }
	else if (x === "3") { return true; }
	else if (x === "4") { return true; }
	else if (x === "5") { return true; }
	else if (x === "6") { return true; }
	else if (x === "7") { return true; }
	else if (x === "8") { return true; }
	else if (x === "9") { return true; }
	else if (x === "+") { return true; }
	else if (x === "-") { return true; }
	else if (x === "*") { return true; }
	else if (x === "/") { return true; }
	else if (x === "(") { return true; }
	else if (x === ")") { return true; }
	else if (x === "[") { return true; }
	else if (x === "]") { return true; }
	else { return false; }
}

// Some functions Math doesn't know
var csc = function (x) { return 1.0 / Math.sin(x) };
var sec = function (x) { return 1.0 / Math.cos(x) };
var cot = function (x) { return (1.0 / Math.tan(x)) };
var acsc = function (x) { return Math.asin(1.0 / x) };
var asec = function (x) { return Math.acos(1.0 / x) };
var acot = function (x) { return Math.atan(1.0 / x) };
var u = function (x) { if (x < 0) { return 0 } else { return 1 } };

// Teaching Javascript what ^ means is hard
// so we instead scan through the string and replace it with
// Math.pow( , )
var parseCaret = function (S) {
	var caretPosition = 0;
	for (i = 1; i < S.length; i++) {
		if (S[i] === '^') {
			caretPosition = i;
		}
	}
	if (caretPosition === 0) {
		return S;
	}
	else {
		var result;
		var firstPart, head, base;
		var secondPart, exponent, tail;
		firstPart = lastParentheses(S.substring(0, caretPosition));
		head = firstPart[0];
		base = firstPart[1];
		secondPart = firstParentheses(S.substring(caretPosition + 1, S.length));
		exponent = secondPart[0];
		tail = secondPart[1];
		result = head
			+ "Math.pow(" + base + "," + exponent + ")"
			+ tail;
		return parseCaret(result);
	}
};

var firstParentheses = function (S) {
	if (S[0] === '(' || S[0] === '[') {
		var parentheses = 1;
		var cutoff = 1;
		while (parentheses > 0) {
			if (S[cutoff] === '(') {
				parentheses = parentheses + 1;
			}
			if (S[cutoff] === ')') {
				parentheses = parentheses - 1;
			}
			if (S[cutoff] === '[') {
				parentheses = parentheses + 1;
			}
			if (S[cutoff] === ']') {
				parentheses = parentheses - 1;
			}
			cutoff = cutoff + 1;
		}
		return [S.substring(0, cutoff), S.substring(cutoff, S.length)];
	}
	else {
		return [S[0], S.substring(1, S.length)];
	}
}
var lastParentheses = function (S) {
	if (S[S.length - 1] === ')' || S[S.length - 1] === ']') {
		var parentheses = 1;
		var cutoff = S.length - 2;
		while (parentheses > 0) {
			if (S[cutoff] === ')') {
				parentheses = parentheses + 1;
			}
			if (S[cutoff] === '(') {
				parentheses = parentheses - 1;
			}
			if (S[cutoff] === ']') {
				parentheses = parentheses + 1;
			}
			if (S[cutoff] === '[') {
				parentheses = parentheses - 1;
			}
			cutoff = cutoff - 1;
		}
		return [S.substring(0, cutoff + 1), S.substring(cutoff + 1, S.length)];
	}
	else {
		return [S.substring(0, S.length - 1), S[S.length - 1]];
	}
}

// Some global variables

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var xscale, yscale;
var xmin, xmax, ymin, ymax;
var x0, y0;

// Draw the axes and the phase plane
function draw() {
	console.log('draw');
	// console.log(document.getElementById('isStrong').checked);
	// Strong 

	let x_formula = ``;
	let y_formula = ``;

	// Strong Alee Effect 
	if (document.getElementById('isStrong').checked) {
		x_formula = `x*(1-x)*(x-${document.getElementById('beta').value})-${document.getElementById('alpha').value}*x*y`;
		y_formula = `${document.getElementById('gamma').value}*x*y-${document.getElementById('theta').value}*y`;

	} // Weak Alee Effect 
	else {
		x_formula = `x*(1-x)*(x+${document.getElementById('beta').value})-${document.getElementById('alpha').value}*x*y`;
		y_formula = `${document.getElementById('gamma').value}*x*y-${document.getElementById('theta').value}*y`;
	}
	console.log("x: " + x_formula);
	console.log("y: " + y_formula);

	document.getElementById('xprime_id').value = x_formula;
	document.getElementById('yprime_id').value = y_formula;


	// Week

	var steps = document.getElementById('arrownumber_id').value;;

	var xAxis = document.getElementById("xAxisCanvas");
	var yAxis = document.getElementById("yAxisCanvas");
	var xCtx = xAxis.getContext("2d");
	var yCtx = yAxis.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	xCtx.clearRect(0, 0, xAxis.width, xAxis.height);
	yCtx.clearRect(0, 0, yAxis.width, yAxis.height);

	context.lineWidth = 1;

	setDerivatives();

	xmin = document.getElementById('xmin_id').value;
	xmax = document.getElementById('xmax_id').value;
	ymin = document.getElementById('ymin_id').value;
	ymax = document.getElementById('ymax_id').value;
	var arrow = document.getElementById('arrow_id').value;

	xscale = canvas.width / (xmax - xmin);
	yscale = canvas.height / (ymax - ymin);

	x0 = (-1) * xmin * xscale;
	y0 = ymax * yscale;
	var xstep = (xmax - xmin) / steps;
	var ystep = (ymax - ymin) / steps;


	// Draw some grid lines
	context.strokeStyle = "rgba(192, 192, 255, 1)"; // light blue lines
	context.beginPath();
	xCtx.textAlign = "center";
	yCtx.textAlign = "end";
	xCtx.textBaseline = "top";
	yCtx.textBaseline = "middle";
	xstepsize = 0.25 * Math.ceil(4 * ((xmax - xmin) / 20));
	ystepsize = 0.25 * Math.ceil(4 * ((ymax - ymin) / 20));
	var x; x = 0.5 * Math.ceil(2 * (xmin + xstepsize * 1.0));
	while (x <= xmax - 0.2) {
		if (x != 0) {
			context.moveTo(x * xscale + x0, 0);
			context.lineTo(x * xscale + x0, canvas.height);
		}
		xCtx.fillText(x, x * xscale + x0, 1);
		x = x + xstepsize;
	}
	var y; y = 0.5 * Math.ceil(2 * (ymin + ystepsize * 1.0));
	while (y <= ymax - 0.2) {
		if (y != 0) {
			context.moveTo(0, y0 - y * yscale);
			context.lineTo(canvas.width, y0 - y * yscale);
		}
		yCtx.fillText(y, yAxis.width - 1, y0 - y * yscale);
		y = y + ystepsize;
	}
	context.stroke();

	// Draw the x-axis, y-axis
	context.strokeStyle = "blue"; // blue lines
	context.beginPath();
	context.moveTo(x0, 0);
	context.lineTo(x0, canvas.height);
	context.moveTo(0, y0);
	context.lineTo(canvas.width, y0);
	context.stroke();


	context.strokeStyle = "black"; // black lines
	context.beginPath();

	var dx, dy;
	var arrowdx, arrowdy;

	// The next line helps in debugging the function parser
	// context.fillText(yprimeString,canvas.width/2,canvas.height/2);

	// Draw the direction field
	x = 1.0 * xmin + xstep / 2;
	while (x <= xmax) {
		y = 1.0 * ymin + ystep / 2;
		while (y <= ymax) {
			plotdiagonal = Math.sqrt((ymax - ymin) * (ymax - ymin) + (xmax - xmin) * (xmax - xmin));
			dx = (xprime(x, y)) * arrow * (ymax - ymin) / plotdiagonal;
			dy = (yprime(x, y)) * arrow * (xmax - xmin) / plotdiagonal;
			arrowlength = Math.sqrt(dx * dx + dy * dy);
			if (document.getElementById("variableArrows").checked) {
				arrowdx = 0.5 * dx / (1 + arrowlength / 20);
				arrowdy = 0.5 * dy / (1 + arrowlength / 20);
			}
			else {
				dx = dx * arrow / arrowlength;
				dy = dy * arrow / arrowlength;
				arrowlength = 1;
				arrowdx = 0.3 * dx;
				arrowdy = 0.3 * dy;
			}
			context.moveTo(
				x0 + x * xscale - dx / 2,
				y0 - y * yscale + dy / 2);
			context.lineTo(
				x0 + x * xscale + dx / 2,
				y0 - y * yscale - dy / 2);
			context.moveTo(
				x0 + x * xscale + dx / 2 - arrowdx + 0.5 * arrowdy,
				y0 - y * yscale - dy / 2 + arrowdy + 0.5 * arrowdx);
			context.lineTo(
				x0 + x * xscale + dx / 2,
				y0 - y * yscale - dy / 2);
			context.lineTo(
				x0 + x * xscale + dx / 2 - arrowdx - 0.5 * arrowdy,
				y0 - y * yscale - dy / 2 + arrowdy - 0.5 * arrowdx);
			y = y + ystep;
		}
		x = x + xstep;
	}
	context.stroke();

}



// Trace Runge-Kutta approximations to solutions on mouse click

canvas.addEventListener('mousedown', function (evt) {
	var mousePos = getMousePos(canvas, evt);
	doMouseDown(canvas, mousePos.x, mousePos.y);
}, false);

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}


var doMouseDown = function (canvas, xcoord, ycoord) {
	context.strokeStyle = "rgba(0, 120, 0, 1)"; // dark red
	var arrow = document.getElementById('arrow_id').value;
	console.log(arrow);
	var dt;
	var dT;
	dT = 0.05 * arrow / Math.max(xscale, yscale);
	console.log(dT);
	var X, Y, prevX, prevY;
	var dx, dy, t, T;
	var startingX, startingY, isMoving, isNotBlowingUp;
	var RKX1, RKX2, RKX3, RKX4;
	var RKY1, RKY2, RKY3, RKY4;

	for (i = -1; i <= 1; i = i + 2) {
		context.beginPath();
		context.moveTo(xcoord, ycoord);
		X = (xcoord - x0) / xscale;
		Y = -(ycoord - y0) / yscale;
		prevX = X;
		prevY = Y;
		t = 0;
		isMoving = false;
		isNotBlowingUp = true;
		startingX = X;
		startingY = Y;
		prevX = X;
		prevY = Y;
		while (t < 30000
			&& X < xmax + 100 * (xmax - xmin)
			&& X > xmin - 100 * (xmax - xmin)
			&& Y < ymax + 100 * (xmax - xmin)
			&& Y > ymin - 100 * (xmax - xmin)
			&& Math.abs(X - prevX) < (xmax - xmin) / 20
			&& Math.abs(Y - prevY) < (ymax - ymin) / 20
			&& isNotBlowingUp
		) {
			t = t + 1;
			//Runge-Kutta
			RKX1 = i * xprime(X, Y);
			RKY1 = i * yprime(X, Y);
			dt = dT / (1 + Math.sqrt(RKX1 * RKX1 + RKY1 * RKY1));
			RKX2 = i * xprime(X + 0.5 * dt * RKX1, Y + 0.5 * dt * RKY1);
			RKY2 = i * yprime(X + 0.5 * dt * RKX1, Y + 0.5 * dt * RKY1);
			RKX3 = i * xprime(X + 0.5 * dt * RKX2, Y + 0.5 * dt * RKY2);
			RKY3 = i * yprime(X + 0.5 * dt * RKX2, Y + 0.5 * dt * RKY2);
			RKX4 = i * xprime(X + dt * RKX3, Y + dt * RKY3);
			RKY4 = i * yprime(X + dt * RKX3, Y + dt * RKY3);
			dx = (1 / 6) * dt * (RKX1 + 2 * RKX2 + 2 * RKX3 + RKX4);
			dy = (1 / 6) * dt * (RKY1 + 2 * RKY2 + 2 * RKY3 + RKY4);
			prevX = X;
			prevY = Y;
			X = X + dx;
			Y = Y + dy;
			isNotBlowingUp = false;
			if (Math.abs(dx) / (xmax - xmin) + Math.abs(dy) / (ymax - ymin) < 0.01) {
				context.lineTo(x0 + X * xscale, y0 - Y * yscale);
				isNotBlowingUp = true;
			}
			if (Math.abs((startingX - X) * xscale) > 2) {
				isMoving = true;
			}
			if (Math.abs((startingY - Y) * yscale) > 2) {
				isMoving = true;
			}
		}
		context.stroke();
	}


}