import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.141.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.141.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('canvas-container');
const width = container.clientWidth;
const height = container.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// OrbitControls so you can rotate with mouse
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Loader
const loader = new GLTFLoader();

// Replace this with your base64 model
const modelData = 'data:application/octet-stream;base64,AAAAAArXIz0K16M9j8L1PQrXIz7NzEw...'; // truncated

loader.parse(atob(modelData.split(',')[1]), '', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1,1,1);
    scene.add(model);

    const mixer = gltf.animations.length > 0 ? new THREE.AnimationMixer(model) : null;
    if (mixer) {
        gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
    }

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (mixer) mixer.update(clock.getDelta());
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
});
