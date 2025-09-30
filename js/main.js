import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.141.0/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById('canvas-container');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Model loader
const loader = new GLTFLoader();

// Paste your base64 model here (example: your "buffers" JSON converted to GLB)
const modelData = 'data:application/octet-stream;base64,AAAAAArXIz0K16M9j8L1PQrXIz7NzEw...'; // truncated

loader.parse(atob(modelData.split(',')[1]), '', (gltf) => {
  const model = gltf.scene;
  model.scale.set(1, 1, 1); // adjust model size
  scene.add(model);

  // Optional: animate model
  const mixer = gltf.animations.length > 0 ? new THREE.AnimationMixer(model) : null;
  if (mixer) {
    gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
  }

  // Animation loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(clock.getDelta());
    renderer.render(scene, camera);
  }
  animate();
});
