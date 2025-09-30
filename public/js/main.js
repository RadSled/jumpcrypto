// Grab container
const container = document.getElementById('canvas-container');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 0.8);
directional.position.set(5, 10, 7.5);
scene.add(directional);

// Load GLTF model
const loader = new THREE.GLTFLoader();
loader.load('/models/jump2.gltf',
    function (gltf) {
        scene.add(gltf.scene);
        console.log('Model loaded!');
    },
    undefined,
    function (error) {
        console.error('Error loading model:', error);
    }
);

// Handle resize
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
