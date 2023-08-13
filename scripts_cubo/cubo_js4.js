var scene;
var camera;
var renderer;
var cube;
var plane;

var render = function() {
	requestAnimationFrame( render );

	this.animateCube();

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.render( scene, camera );
};

var createACube = function() {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );

	cube = new THREE.Mesh( geometry, material );

	cube.position.set(0, 0, 0);

	cube.castShadow = true;

	scene.add( cube );
};

var animateCube = function() {
	cube.rotation.x += 0.01;
}

var createLight = function() {
	var spotLight = new THREE.SpotLight(0xffffff, 50);
	spotLight.position.set(5, 5, 5);
	spotLight.castShadow = true;

	scene.add(spotLight);
};

var createPlane = function() {
	var planeGeometry = new THREE.PlaneGeometry(20, 20);
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0xcccccc} );
	plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.y = -1;

	plane.receiveShadow = true;

	scene.add(plane);
};

var createSecondPlane = function() {
	var planeGeometry = new THREE.PlaneGeometry(20, 20);
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0xcccccc} );
	plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.position.z = -1;

	plane.receiveShadow = true;

	scene.add(plane);
};

// cria as duas câmeras e posicionas elas
var createCamera = function() {
	// cria a subcâmera da esquerda
	var cameraL = new THREE.PerspectiveCamera(
		50,
		(window.innerWidth * 0.5) / window.innerHeight,
		0.1,
		1000
	);
	cameraL.position.multiplyScalar( 2 );
	// posiciona a subcâmera na tela
	cameraL.viewport = new THREE.Vector4(0, 0, window.innerWidth*0.5, window.innerHeight);

	// cria a subcâmera da direita
	var cameraR = new THREE.PerspectiveCamera(
		50,
		(window.innerWidth * 0.5) / window.innerHeight,
		0.1,
		1000
	);
	cameraR.position.multiplyScalar( 2 );
	// posiciona a subcâmera na tela
	cameraR.viewport = new THREE.Vector4(window.innerWidth*0.5, 0, window.innerWidth*0.5, window.innerHeight);

	// adiciona as duas câmeras a uma ArrayCamera (para amabas serem renderizadas)
	camera = new THREE.ArrayCamera( [cameraL, cameraR]);

	// reposiciona ambas as câmeras
	cameraL.position.x = 2;
	cameraL.position.y = 1;
	cameraL.position.z = 3;
	cameraL.lookAt(scene.position);
	cameraL.updateMatrixWorld();
	cameraR.position.x = -2;
	cameraR.position.y = 1;
	cameraR.position.z = 3;
	cameraR.lookAt(scene.position);
	cameraR.updateMatrixWorld();
};

var init = function() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	this.createACube();

	this.createPlane();

	this.createSecondPlane();

	this.createLight();

	this.createCamera();

	this.render();

};

window.onload = this.init;
