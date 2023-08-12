// cria as variáveis globais
var scene;
var camera;
var renderer;
var cube;

// renderização da cena
var render = function() {
	requestAnimationFrame( render );

	//executa a animação do cubo
	this.animateCube();

	renderer.render( scene, camera );
};

// cria e adiciona um cubo à cena
var createACube = function() {
	// cria um modelo geométrico com formato de cubo
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	// cria um tipo de material com cor verde
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// cria um objeto unindo o modelo geométrico com o material 
	cube = new THREE.Mesh( geometry, material );
	//adiciona o cubo a cena (é adicionado na origem)
	scene.add( cube );
};

// cria a animação do cubo
var animateCube = function() {
	//rotaciona o objeto no eixo x e y
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
}

// inicializa os objetos e renderiza a cena
var init = function() {

	// cria a cena
	scene = new THREE.Scene();

	// cria a câmera com perspectiva
	//   fov : é o campo de visão da câmera
	//   aspect ratio : proporção da imagem (19/9, 4/3, ...)
	//   near : plano de recorte próximo
	//   far : plano de recorte distante
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

	//reposiciona a câmera, distanciando ela da origem
	camera.position.z = 5;

	//chama a função de criação do cubo
	this.createACube();

	//chama a função de renderização da cena
	this.render();

};

window.onload = this.init;
