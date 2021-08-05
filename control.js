let autoR = true;
let rot_Speed = 1;
let rotation_top_limit = 1;
let rotation_bottom_limit = 2;
let zoom_in_limit = 0.5;
let zoom_out_limit = 0.25;
let bg = 1;

let rotation = () => {
	let rotationSwitch = document.getElementById(
		'flexSwitchCheckChecked'
	).checked;
	autoR = rotationSwitch;
	createDefaultEngine();
};

let rotationSpeed = () => {
	let rSpeed = document.getElementById('rotation_speed').value;
	//console.log(rSpeed);
	rot_Speed = rSpeed;
	createDefaultEngine();
};

let rotationTopLimit = () => {
	let rotationTop = document.getElementById('rotation_top_limit').value;
	//console.log(rotationTop);
	rotation_top_limit = rotationTop;
	//console.log(rotation_top_limit);
	createScene();
};

let rotationBottomLimit = () => {
	let rotationBottom = document.getElementById('rotation_bottom_limit').value;
	//console.log(rotationBottom);
	rotation_bottom_limit = rotationBottom;
	createScene();
};

let zoomInLimit = () => {
	let zoomIn = document.getElementById('zoom_in_limit').value;
	//console.log(rotationBottom);
	zoom_in_limit = zoomIn * -1;
	createScene();
};

let zoomOutLimit = () => {
	let zoomOut = document.getElementById('zoom_out_limit').value;
	//console.log(rotationBottom);
	zoom_out_limit = zoomOut;
	createScene();
};
let backGround = (value) => {};
