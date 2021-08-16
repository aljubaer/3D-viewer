# 3D-viewer
This is to render a 3D model using the available resources of the browser. Babylon JS is used here. 

First, we take the values from the slide-bars and store them in model object. A separate function is used to take the values.

The auto rotation toggle takes the value for auto rotate in Boolean. It is passed as the value for `camera.useAutoRotationBehavior` to toggle the auto rotation feature. 

The `model.rot_Speed` controls the rotation speed and rotation direction. It is passed as the value for `camera.autoRotationBehavior.idleRotationSpeed`. A negative value makes the model clockwise and a positive value makes the model anti-clockwise. The speed is controlled by the number. A larger value makes the model rotate faster. Setting it 0 will pause the rotation.

`model.rotation_top_limit` is used for camera angel. Increasing the top limit variable provides top view of the while ` model.rotation_bottom_limit` is increased for the bottom view. This is passed as the second argument of the ArcRotateCamera. 
```
BABYLON.ArcRotateCamera(
		'camera',
		2.372,
		(model.rotation_bottom_limit - model.rotation_top_limit),  //Top-Bottom Viewing Angel
		0.5,
		BABYLON.Vector3.Zero(),
		scene
);
  ```
  
  
  For zoom operations, first of all the `model.zoomEn` is used to enable or disable zoom in and out by using the mouse wheel. While it is set to true, `camera.wheelDeltaPercentage` gets the default value of 0.01. Whent `model.zoomEn` is 'false', the  `camera.wheelDeltaPercentage` is given a value so small that it does not affect the comera settings.
  ```
  if (model.zoomEn===true){
	camera.wheelDeltaPercentage = 0.01;
	}
	else {	
	camera.wheelDeltaPercentage = 0.0000000000000000001;
	}
  ```
  
  `camera.upperRadiusLimit` is used for zooming in and `camera.lowerRadiusLimit` is for zooming out. Zoom works by controlling the radius of the Camera in Babylon.
  ```
  camera.upperRadiusLimit = model.zoom_in_limit;
	camera.lowerRadiusLimit = model.zoom_out_limit;
	camera.minZ = 0.01;
```

In Babylon, the background or the scene color can be changed by `scene.clearColor = new BABYLON.Color3(r,g,b);` Here, the `BABYLON.Color3(,,)` takes the RGB fractions of a color to produce that color. When the background color is selected, each color returns their RGB value which is then passed in the `BABYLON.Color3(,,)`
In HTML the code looks like 
```
<div
		class="bc1 bg-info"
		onclick="backGround('0.529', '0.808', '0.922')"
></div>
```
These values are then saved in the model object,
```
let backGround = (v1,v2,v3) => {
	model.bg1=v1;
	model.bg2=v2;
	model.bg3=v3;
	createScene();
 }
```
These are then passed to the `BABYLON.Color3()` function.
`scene.clearColor = new BABYLON.Color3(model.bg1,model.bg2,model.bg3);`
