// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webglCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Fire effect using shader material
const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 }
    },
    vertexShader: \`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    \`,
    fragmentShader: \`
        varying vec2 vUv;
        uniform float time;
        void main() {
            vec3 color = vec3(abs(sin(time + vUv.x * 10.0)), 0.2, 0.0);
            gl_FragColor = vec4(color, 1.0);
        }
    \`
});
const fire = new THREE.Mesh(geometry, material);
scene.add(fire);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    fire.material.uniforms.time.value += 0.05;
    renderer.render(scene, camera);
}
animate();

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
