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

//Custom Loading Scene
BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
	if (document.getElementById("customLoadingScreenDiv")) {
		// Do not add a loading screen if there is already one
		document.getElementById("customLoadingScreenDiv").style.display = "initial";
		return;
	}
	this._loadingDiv = document.createElement("div");
	this._loadingDiv.id = "customLoadingScreenDiv";
	this._loadingDiv.innerHTML = "loading";
	var customLoadingScreenCss = document.createElement('style');
	customLoadingScreenCss.type = 'text/css';
	customLoadingScreenCss.innerHTML = `
	#customLoadingScreenDiv{
		background-color: #87ceeb;
		color: white;
		font-size:50px;
		text-align:center;
	}
	`;
	document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
	this._resizeLoadingUI();
	window.addEventListener("resize", this._resizeLoadingUI);
	document.body.appendChild(this._loadingDiv);
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
	document.getElementById("customLoadingScreenDiv").style.display = "none";
	console.log("scene is now loaded");
}

var delayCreateScene = function () {
	
	engine.displayLoadingUI();
	var scene = new BABYLON.Scene(engine);  

	BABYLON.SceneLoader.ImportMesh(
		"",
		"https://models.babylonjs.com/CornellBox/",
		"cornellBox.glb",
		scene,
		function () {          
			scene.createDefaultCameraOrLight(true, true, true);
			scene.createDefaultEnvironment();
			scene.activeCamera.alpha = Math.PI / 2;
			engine.hideLoadingUI();
		}
	);
}


//Scene Creation 

var createScene = function () {
	// Creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);
	
	// Create a camera
	var camera = new BABYLON.ArcRotateCamera(
		'camera',
		2.372,
		(model.rotation_bottom_limit - model.rotation_top_limit),  //Top-Bottom Viewing Angel
		0.5,
		BABYLON.Vector3.Zero(),
		scene
	);

	//Zoom In-Out
	camera.upperRadiusLimit = model.zoom_in_limit;
	camera.lowerRadiusLimit = model.zoom_out_limit;
	camera.minZ = 0.01;

	//Scroll Zoom
	if (model.zoomEn===true){
	camera.wheelDeltaPercentage = 0.01;
	}
	else {	
	camera.wheelDeltaPercentage = 0.0000000000000000001;
	}

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
	
	//Select Background Color
	scene.clearColor = new BABYLON.Color3(model.bg1,model.bg2,model.bg3);


	meshTask.onSuccess = function (task) {
		task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
		// scene.debugLayer.show({embedMode:true});
		scene.debugLayer.select(task.loadedMeshes[0], 'VARIANTS');
	};

	//Rotation Control
	assetsManager.onFinish = function (tasks) {
		engine.runRenderLoop(function () {
			// Todo: add different controlls
			if (model.autoR === true) {
				camera.useAutoRotationBehavior = true;
				camera.autoRotationBehavior.idleRotationSpeed = model.rot_Speed;
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
