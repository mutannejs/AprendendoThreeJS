var scene;
var camera1;
var camera2;
var renderer;
var cube;
var plane;

var render = function() {
	requestAnimationFrame( render );

	this.animateCube();

	//adiciona renderização de sombras
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	renderer.render( scene, camera );
};

var createACube = function() {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	// cria um material próprio para usar com SpotLight
	var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} );

	cube = new THREE.Mesh( geometry, material );

	cube.position.set(0, 0, 0);

	// adiciona a propriedade de gerar sombra ao cubo
	cube.castShadow = true;

	scene.add( cube );
};

var animateCube = function() {
	cube.rotation.y += 0.01;
}

// cria uma fonte de luz e adiciona à cena
var createLight = function() {
	// argumentos: cor da luz, intensidade
	var spotLight = new THREE.SpotLight(0xffffff, 50);
	// seta uma nova posição para a fonte de luz
	spotLight.position.set(10, 10, 5);
	// adiciona a propriedade de gerar sombra ao cubo
	spotLight.castShadow = true;

	scene.add(spotLight);
};

// cria um plano e adiciona à cena
var createPlane = function() {
	// cria um modelo geométrico de plano, passando as dimensões do plano
	var planeGeometry = new THREE.PlaneGeometry(20, 20);
	// cria um material próprio para usar com SpotLight
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0xcccccc} );
	plane = new THREE.Mesh(planeGeometry, planeMaterial);

	// rotaciona o plano em 90º. Por padrão ele está na vertical
	plane.rotation.x = -0.5 * Math.PI;
	// posiciona o plano a baixo do cubo
	plane.position.y = -2;

	//adiciona a propriedade de receber sombra ao cubo 
	plane.receiveShadow = true;

	scene.add(plane);
};

// cria outro plano, para ficar como fundo da cena
var createSecondPlane = function() {
	var planeGeometry = new THREE.PlaneGeometry(20, 20);
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0xcccccc} );
	plane = new THREE.Mesh(planeGeometry, planeMaterial);

	// posiciona o plano átras do cubo
	plane.position.z = -2;

	plane.receiveShadow = true;

	scene.add(plane);
};

var init = function() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	// cria o renderizador
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );// define o tamanho da tela
	document.body.appendChild( renderer.domElement );// linka o código do renderizador no corpo do documento

	// reposiciona a câmera
	camera.position.y = 1;
	camera.position.z = 3;
	// rotaciona a câmera para que ela "aponte" para a cena
	camera.lookAt( scene.position);

	this.createACube();

	this.createPlane();

	this.createSecondPlane();

	this.createLight();

	this.render();

};

window.onload = this.init;
