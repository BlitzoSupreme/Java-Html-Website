import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.x = -10

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube2 = new THREE.Mesh( geometry2, material2 );
scene.add( cube2 );
cube2.position.x = 10

const geometry3 = new THREE.BoxGeometry( 1, 1, 1 );
const material3 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube3 = new THREE.Mesh( geometry3, material3 );
scene.add( cube3 );
cube3.position.x = 8
cube3.position.y = 5

const geometry4 = new THREE.BoxGeometry( 1, 1, 1 );
const material4 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube4 = new THREE.Mesh( geometry4, material4 );
scene.add( cube4 );
cube4.position.x = -8
cube4.position.y = 5

const geometry5 = new THREE.BoxGeometry( 1, 1, 1 );
const material5 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube5 = new THREE.Mesh( geometry5, material5 );
scene.add( cube5 );
cube5.position.x = 8
cube5.position.y = -5

const geometry6 = new THREE.BoxGeometry( 1, 1, 1 );
const material6 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube6 = new THREE.Mesh( geometry6, material6 );
scene.add( cube6 );
cube6.position.x = -8
cube6.position.y = -5

camera.position.z = 10;

function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;

  cube3.rotation.x += 0.01;
  cube3.rotation.y += 0.01;

  cube4.rotation.x += 0.01;
  cube4.rotation.y += 0.01;

  cube5.rotation.x += 0.01;
  cube5.rotation.y += 0.01;

  cube6.rotation.x += 0.01;
  cube6.rotation.y += 0.01;

  if(cube.position >= 10) (
    cube.position.x = 10
  )

  if(cube2.position <= 10) (
    cube.position.x = - 10
  )

  renderer.render( scene, camera );

}

function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight );

}

window.addEventListener('resize', onWindowResize);


//create skybox function

const createskybox = () => {

  let bgMesh;

  const loader = new THREE.TextureLoader();

// load a resource
loader.load(
	// resource URL
	'Assets/img/galaxy.jpg',

	// onLoad callback
	function ( texture ) {
		// in this example we create the material when the texture is loaded
		const material = new THREE.MeshBasicMaterial( {
			map: texture
		 } );
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);

  let spheregeometry = new THREE.SphereGeometry(100,60,40);
  let spherematerial = new THREE.MeshBasicMaterial(
    {
      map: texture
      side: THREE.DoubleSide

    }
  )

  spheregeometry.scale(-1,1,1);

  bgMesh = new THREE.Mesh(spheregeometry,spherematerial);
  scene.add(bgMesh)
  bgMesh.position.set(0,0,0)


}

createskybox();