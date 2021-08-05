// babylon code start here
var canvas = document.getElementById('renderCanvas');

var engine = null;
var scene = null;
var sceneToRender = null;

var createDefaultEngine = function () {
	return new BABYLON.Engine(canvas, true, {
		preserveDrawingBuffer: true,
		stencil: true,
		disableWebGL2Support: false,
	});
};
var createScene = function () {
	// Creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);
	
	// Create a camera
	var camera = new BABYLON.ArcRotateCamera(
		'camera',
		2.372,
		(rotation_bottom_limit - rotation_top_limit),
		0.5,
		BABYLON.Vector3.Zero(),
		scene
	);
	camera.upperRadiusLimit = zoom_in_limit;
	camera.lowerRadiusLimit = zoom_out_limit;
	camera.minZ = 0.01;

	// Attaches the camera to the canvas
	camera.attachControl(canvas, true);

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	var light = new BABYLON.HemisphericLight(
		'light',
		new BABYLON.Vector3(0, 1, 0),
		scene
	);

	// Use asset Manager to load the asset
	var assetsManager = new BABYLON.AssetsManager(scene);
	var meshTask = assetsManager.addMeshTask(
		'shoe task',
		'',
		'https://assets.babylonjs.com/meshes/',
		'shoe_variants.glb'
	);
		
	var bg1 = new BABYLON.Color3(0.529, 0.808, 0.922); 
    var bg2 = new BABYLON.Color3(0, 0.3, 0.3);
    var bg3 = new BABYLON.Color3(0.2, 0.3, 0.3);
	if(bg=1){
    scene.clearColor = bg1;}
	else {
	scene.clearColor = bg2;}

	meshTask.onSuccess = function (task) {
		task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
		// scene.debugLayer.show({embedMode:true});
		scene.debugLayer.select(task.loadedMeshes[0], 'VARIANTS');
	};

	assetsManager.onFinish = function (tasks) {
		engine.runRenderLoop(function () {
			// Todo: add different controlls
			if (autoR === true) {
				camera.useAutoRotationBehavior = true;
				camera.autoRotationBehavior.idleRotationSpeed = rot_Speed;
			} else {
				camera.useAutoRotationBehavior = false;
			}
			scene.render();
		});
	};

	assetsManager.load();

	return scene;
};
window.initFunction = async function () {
	var asyncEngineCreation = async function () {
		try {
			return createDefaultEngine();
		} catch (e) {
			console.log(
				'the available createEngine function failed. Creating the default engine instead'
			);
			return createDefaultEngine();
		}
	};

	window.engine = await asyncEngineCreation();
	if (!engine) throw 'engine should not be null.';
	window.scene = createScene();
};
initFunction().then(() => {
	sceneToRender = scene;
	engine.runRenderLoop(function () {
		if (sceneToRender && sceneToRender.activeCamera) {
			sceneToRender.render();
		}
	});
});

// Resize
window.addEventListener('resize', function () {
	engine.resize();
});
