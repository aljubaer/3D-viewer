const model = {
	autoR: true,
	zoomEn: true,
	rot_Speed: 1,
	rotation_top_limit: 1,
	rotation_bottom_limit: 2,
	zoom_in_limit: 0.5,
	zoom_out_limit: 0.25,
	bg1: 0.529, 
	bg2: 0.808, 
	bg3: 0.922
}

//Auto Rotation
let rotation = () => {
	let rotationSwitch = document.getElementById(
		'autoRotationControl'
	).checked;
	model.autoR = rotationSwitch;
	createDefaultEngine();
};

//Rotation Speed
let rotationSpeed = () => {	
    let rSpeed = document.getElementById(
		'rotation_speed'
	).value;
    model.rot_Speed=rSpeed;
    createDefaultEngine();
};

//Rotation Top View
let rotationTopLimit = () => {
    let rotationTop = document.getElementById(
		'rotation_top_limit'
	).value;
    model.rotation_top_limit=rotationTop;
    createScene();
};

//Rotation Bottom View
let rotationBottomLimit = () => {
    let rotationBottom = document.getElementById(
		'rotation_bottom_limit'
	).value;
    model.rotation_bottom_limit=rotationBottom;
    createScene();
};

//Scroll Zoom 
let zoom = () => {
	let zoomSwitch = document.getElementById(
		'zoomControl'
	).checked;
	model.zoomEn = zoomSwitch;
	createScene();
};

//Zoom In
let zoomInLimit = () => {
    let zoomIn = document.getElementById(
		'zoom_in_limit'
	).value;
    model.zoom_in_limit=zoomIn*-1;
    createScene();
};

//Zoom Out
let zoomOutLimit = () => {
    let zoomOut = document.getElementById(
		'zoom_out_limit'
	).value;
    model.zoom_out_limit=zoomOut;
    createScene();
};

//Choose Background
 let backGround = (v1,v2,v3) => {
	model.bg1=v1;
	model.bg2=v2;
	model.bg3=v3;
	createScene();
 }
