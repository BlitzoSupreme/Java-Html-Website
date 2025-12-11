import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(50, 25, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 3, 0);
controls.autoRotate = true
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});

const spotLight = new THREE.SpotLight(0x00FF00, 3000, 100, 3, 1);
spotLight.position.set(0, 25, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const loader = new GLTFLoader().setPath('assets/Glasses/');
loader.load('scene.gltf', (gltf) => {
  console.log('loading model');
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.scale.set(2, 2.5, 2);

  mesh.position.set(0, -2, -1);
  scene.add(mesh);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

//create skybox function

const createskybox = () => {
  let bgMesh;
  const loader = new THREE.TextureLoader();

  loader.load('Assets/img/matrix-code.jpg', function(texture) {
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