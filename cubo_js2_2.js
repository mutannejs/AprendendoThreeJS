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

	scene.add( cube );
};

var animateCube = function() {
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.position.z -= 0.1;// se afasta da tela
}

var init = function() {

	scene = new THREE.Scene();

	// cria uma câmera ortográfica
	//   left : limite esquerdo da tela (objetos fora dele não serão renderizados)
	//   right : limite direito
	//   top : limite superior
	//   bottom : limite inferior
	//   near : plano de recorte próximo
	//   fear : plano de recorte distante
	camera = new THREE.OrthographicCamera(
		-window.innerWidth/512,
		window.innerWidth/512,
		window.innerHeight/512,
		-window.innerHeight/512,
		15,
		80
	);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera.position.z = 5;

	this.createACube();

	this.render();

};

window.onload = this.init;
