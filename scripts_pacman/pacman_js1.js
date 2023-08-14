var scene;
var camera;
var renderer;
var base;
var base2;

var render = function() {
	requestAnimationFrame( render );

	if (camera.position.x < 0.78) {
		this.animateBase();
		this.animateBase2();
		camera.position.x += 0.01;
	}

	renderer.render( scene, camera );
};

// cria a base do pacman
var createABase = function() {
	// argumentos : escala, linhas horizontais, linhas verticais, "o quanto da esfera desenhar, com Math.PI desenha só metade"
	var geometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI );
	var material = new THREE.MeshBasicMaterial( { color: 'yellow' } );
	base = new THREE.Mesh( geometry, material );
	// rotaciona a metade da esfera 45º em torno do eixo x
	base.rotation.x += Math.PI*0.5;
	scene.add( base );
};

var createASecondBase = function() {
	var geometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI );
	var material = new THREE.MeshBasicMaterial( { color: 'yellow' } );
	base2 = new THREE.Mesh( geometry, material );
	base2.rotation.x -= Math.PI*0.5;
	scene.add( base2 );
};

// cria a animação da base
var animateBase = function() {
	base.rotation.y -= 0.01;// rotaciona em torno de y
	base.position.x += 0.01;// anda para frente
}

var animateBase2 = function() {
	base2.rotation.y -= 0.01;
	base2.position.x += 0.01;
}

var init = function() {

	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera(//usando essa câmera só para a aimagem não distorcer por causa da perspectiva
		-window.innerWidth/512,
		window.innerWidth/512,
		window.innerHeight/512,
		-window.innerHeight/512,
		1,
		100
	);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera.position.z = 5;

	this.createABase();
	this.createASecondBase();

	this.render();

};

window.onload = this.init;
