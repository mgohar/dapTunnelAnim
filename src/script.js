import "./style.css";
import * as THREE from "three";
import {
  MapControls,
  OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";
import VShader from "./shaders/firstShaders/vertexShader.glsl";
import FShader from "./shaders/firstShaders/fragmentShader.glsl";

//Scene
const scene = new THREE.Scene();

//Resizing
window.addEventListener("resize", () => {
  //Update Size
  aspect.width = window.innerWidth;
  aspect.height = window.innerHeight;

  //New Aspect Ratio
  camera.aspect = aspect.width / aspect.height;
  camera.updateProjectionMatrix();

  //New RendererSize
  renderer.setSize(aspect.width, aspect.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Mesh
const geometry = new THREE.PlaneGeometry(1, 1, 20, 20);
console.log("geometry:", geometry);
const material = new THREE.RawShaderMaterial({
  uniforms: {
    u_amplitude: { value: 0.1 },
    u_time: { value: 0 },
  },
  side: THREE.DoubleSide,
  vertexShader: VShader,
  fragmentShader: FShader,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const amount = geometry.attributes.position.count;
const newAttributeArray = new Float32Array(amount);
for (let i = 0; i < amount; i++) {
  newAttributeArray[i] = Math.random();
}
// console.log("u_amplitude:",material.uniforms.u_amplitude.value);

geometry.setAttribute(
  "a_modulus",
  new THREE.BufferAttribute(newAttributeArray, 1)
);

//Camera
const aspect = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 2;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

//OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

//Clock Class
const clock = new THREE.Clock();

const animate = () => {
  //GetElapsedTime
  const elapsedTime = clock.getElapsedTime();
  material.uniforms.u_time.value = elapsedTime;

  //Update Controls
  orbitControls.update();

  //Renderer
  renderer.render(scene, camera);

  //RequestAnimationFrame
  window.requestAnimationFrame(animate);
};
animate();
