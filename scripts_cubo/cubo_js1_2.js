var scene;
var camera;
var renderer;
var cube;

var render = function() {
	requestAnimationFrame( render );

	//executa a animação do cubo
	this.animateCube();

	renderer.render( scene, camera );
};

var createACube = function() {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
};

// cria a animação do cubo
var animateCube = function() {
	//rotaciona o objeto no eixo x e y
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
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
