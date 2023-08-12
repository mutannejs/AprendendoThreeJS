var scene;
var camera;
var renderer;
var cube;

var render = function() {
	requestAnimationFrame( render );
	this.animateCube();
	renderer.render( scene, camera );
};

var createACube = function() {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );

	//seta uma nova posição para o cubo (x, y, z)
	cube.position.set(2, 1, -1);

	scene.add( cube );
};

var animateCube = function() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.position.z -= 0.1;// se afasta da tela
}

var init = function() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera.position.z = 5;

	this.createACube();

	this.render();

};

window.onload = this.init;
