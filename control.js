let autoR = true;
let zoomEn = true;
let rot_Speed = 1;
let rotation_top_limit = 1;
let rotation_bottom_limit = 2;
let zoom_in_limit = 0.5;
let zoom_out_limit = 0.25;
let bg1 = 0.529,
	bg2 = 0.808,
	bg3 = 0.922;

let rotation = () => {
	let rotationSwitch = document.getElementById('autoRotationControl').checked;
	autoR = rotationSwitch;
	//console.log(autoR);
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

let zoom = () => {
	let zoomSwitch = document.getElementById('zoomControl').checked;
	zoomEn = zoomSwitch;

	console.log(zoomSwitch, zoom_in_limit, zoom_out_limit);
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
let backGround = (v1, v2, v3) => {
	bg1 = v1;
	bg2 = v2;
	bg3 = v3;
	console.log(bg1);
	createScene();
};
