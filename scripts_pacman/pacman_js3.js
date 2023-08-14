var scene;
var camera;
var renderer;
var base;
var base_circle;
var base_circle2;
var base2;
var fase;
var abrir;

var render = function() {
	requestAnimationFrame( render );

	// muda de abrir para fechar a boca de 30 em 30 (abre 45º)
	if (fase >= 39) {
		if (abrir == 1) {
			abrir = 0;
		} else {
			abrir = 1;
		}
		fase = 0;
	} else {
		fase++;
	}
	// anima as duas partes do pacman
	this.animateBase();
	this.animateBase2();

	//adiciona renderização de sombras
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.render( scene, camera );
};

// cria a base do pacman
var createABase = function() {
	// argumentos : escala, linhas horizontais, linhas verticais, "o quanto da esfera desenhar, com Math.PI desenha só metade"
	var geometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI );
	// argumentos : escala, linhas de contorno
	var circle = new THREE.CircleGeometry( 1, 32 );
	var material = new THREE.MeshPhongMaterial( { color: 'yellow' } );

	base = new THREE.Mesh( geometry, material );
	base.castShadow = true;
	base.receiveShadow = true;
	base.rotation.x += Math.PI*0.5;// rotaciona a metade da esfera 45º em torno do eixo x
	scene.add( base );

	base_circle = new THREE.Mesh( circle, material );
	base_circle.castShadow = true;
	base_circle.receiveShadow = true;
	base_circle.rotation.x += Math.PI*0.5;
	scene.add( base_circle );
};

var createASecondBase = function() {
	var geometry = new THREE.SphereGeometry( 1, 32, 16, 0, Math.PI );
	var circle2 = new THREE.CircleGeometry( 1, 32 );
	var material = new THREE.MeshPhongMaterial( { color: 'yellow' } );
	base2 = new THREE.Mesh( geometry, material );
	base2.castShadow = true;
	base2.receiveShadow = true;
	base2.rotation.x -= Math.PI*0.5;
	scene.add( base2 );
	base_circle2 = new THREE.Mesh( circle2, material );
	base_circle2.castShadow = true;
	base_circle2.receiveShadow = true;
	base_circle2.rotation.x -= Math.PI*0.5;
	scene.add( base_circle2 );
};

// cria a animação da base
var animateBase = function() {
	if (abrir == 1) {
		base.rotation.y -= 0.02;
		base_circle.rotation.y += 0.02;
	} else {
		base.rotation.y += 0.02;
		base_circle.rotation.y -= 0.02;
	}
}

var animateBase2 = function() {
	if (abrir == 1) {
		base2.rotation.y -= 0.02;
		base_circle2.rotation.y += 0.02;
	} else {
		base2.rotation.y += 0.02;
		base_circle2.rotation.y -= 0.02;
	}
}

var createDirectionalLight = function() {
	var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
	directionalLight.position.set(5, 5, 5);
	directionalLight.name='directional';
	directionalLight.castShadow = true;
	scene.add(directionalLight);
};

var createAmbientLight = function() {
	var ambientLight = new THREE.AmbientLight(0x888888);
	ambientLight.name='ambient';
	ambientLight.castShadow = true;
	scene.add(ambientLight);
};

var createPlane = function() {
	var planeGeometry = new THREE.PlaneGeometry(100, 100);
	var planeMaterial = new THREE.MeshPhongMaterial( { color: 0x6959CD} );
	plane = new THREE.Mesh(planeGeometry, planeMaterial);

	plane.castShadow = true;
	plane.receiveShadow = true;

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.y = -1.5;

	plane.receiveShadow = true;

	scene.add(plane);
};

var init = function() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		50,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera.position.x = 1;
	camera.position.y = 1;
	camera.position.z = 5;
	camera.lookAt(scene.position);

	// necessário para animar o pacman
	fase = -1;
	abrir = 1;

	this.createABase();
	this.createASecondBase();
	this.createPlane();
	this.createDirectionalLight();
	this.createAmbientLight();

	this.render();

};

window.onload = this.init;
