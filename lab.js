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

// cubes array
const cubes = [cube, cube2, cube3, cube4, cube5, cube6];

// Raycaster and mouse for click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Exploding cubes state
const explodingCubes = new Set();

renderer.domElement.addEventListener('pointerdown', (event) => {
  mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
  mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubes);

  if (intersects.length > 0) {
    const clickedCube = intersects[0].object;
    explodingCubes.add(clickedCube);
  }

  if (intersects.length > 0) {
    window.score = (window.score || 0) + 1;
    console.log('Score:', window.score);
  }
});

function animate() {
  cubes.forEach((c) => {
    c.rotation.x += 0.01;
    c.rotation.y += 0.01;

    // If cube is exploding, scale it up and fade out
    if (explodingCubes.has(c)) {
      c.scale.x += 0.2;
      c.scale.y += 0.2;
      c.scale.z += 0.2;
      c.material.opacity = (c.material.opacity || 1) - 0.05;
      c.material.transparent = true;
      if (c.material.opacity <= 0) {
        scene.remove(c);
        explodingCubes.delete(c);
      }

    }

    if (!c.userData.originalPosition) {
      c.userData.originalPosition = c.position.clone();
    }

    if (!scene.children.includes(c) && !c.userData.respawnScheduled) {
      c.userData.respawnScheduled = true;
      setTimeout(() => {
        // reset transform and material
        c.scale.set(1, 1, 1);
        c.rotation.set(0, 0, 0);
        if (c.material) {
          c.material.opacity = 1;
          c.material.transparent = false;
        }
        // restore original position
        if (c.userData.originalPosition) c.position.copy(c.userData.originalPosition);
        // add back to scene and allow scoring again
        scene.add(c);
        c.userData.explodeCounted = false;
        c.userData.respawnScheduled = false;
      }, 5000);
    }
  });

  // create score UI 
  let score = document.getElementById('scoreBoard');
  if (!score) {
    score = document.createElement('div');
    score.id = 'scoreBoard';
    score.style.position = 'fixed';
    score.style.left = '10px';
    score.style.top = '10px';
    score.style.padding = '8px 12px';
    score.style.background = 'rgba(0,0,0,0.6)';
    score.style.color = '#fff';
    score.style.fontFamily = 'monospace, monospace';
    score.style.fontSize = '18px';
    score.style.zIndex = '999';
    document.body.appendChild(score);
  }

  // tracked score for explosions (separate from any existing window.score)
  window.explodeScore = window.explodeScore || 0;

  // update score display
  score.textContent = 'Score: ' + window.explodeScore;

  // detect cubes removed from scene and award points once per cube explosion
  cubes.forEach(c => {
    if (!c.userData.explodeCounted && !scene.children.includes(c)) {
      c.userData.explodeCounted = true;
      window.explodeScore++;
      score.textContent = 'Score: ' + window.explodeScore;
    }


  });

  renderer.render( scene, camera );
}

  renderer.render( scene, camera );

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

  loader.load('Assets/img/skybox.jpg', function(texture) {
    var sphereGeometry = new THREE.SphereGeometry(100, 60, 40);
    var sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    sphereGeometry.scale(-1, 1, 1);
    bgMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(bgMesh);
    bgMesh.position.set(0, 0, 0);
  });
};

// Ensure renderer uses correct encoding for textures
renderer.outputEncoding = THREE.sRGBEncoding;

// Call the createskybox function so it is used
createskybox();

