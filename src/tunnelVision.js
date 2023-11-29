import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
//===================================================== SOCIAL MEDIA
const Box1T =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Social/2.png";
const Box2T =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Social/3.png";
const Box3T =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Social/6.png";
const Box4T =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Social/7.png";

//===================================================== PHOTOGRAPHY
const BoxP1 =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Photography/10.png";
const BoxP2 =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Photography/18.png";
const BoxP3 =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Photography/20.png";
const BoxP4 =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Photography/23.png";
const BoxP5 =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Photography/28.png";
const BoxP6 =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Photography/34.png";

//===================================================== BRANDING
const Box1B =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Branding/1.png";
const Box2B =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Branding/3.png";
const Box3B =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Branding/4.png";
const Box4B =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Branding/5.png";
const Box5B =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Branding/6.png";
const Box6B =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/Branding/8.png";

//===================================================== UIUX
const Box1U =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/UIUX/1.png";
const Box2U =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/UIUX/2.png";
const Box3U =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/UIUX/3.png";
const Box4U =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/UIUX/4.png";
const Box5U =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/UIUX/5.png";
const Box6U =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/UIUX/6.png";
const Box7U =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/UIUX/7.png";
const Box8U =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/UIUX/8.png";
//===================================================== Shaders
const vertexShader = `
  varying float vDistance;
  varying vec2 vUv;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      vDistance = -mvPosition.z; // Use negative Z-coordinate as distance from camera
      vUv = uv;
    }
`;
const fragmentShader = `
  uniform float maxDistance; // Adjust this value to control the maximum distance for full opacity
  varying float vDistance;
  varying vec2 vUv;
  uniform sampler2D imageTexture;

  void main() {
    float opacity = clamp(2.4 - (vDistance / 2.0), 0.0, 1.0);
    vec4 texColor = texture2D(imageTexture, vUv);
    gl_FragColor = vec4(texColor.rgb, opacity); // Adjust the color as needed
  }
`;
//===================================================== Init
let scrollCount = 0;
const textContainer = document.querySelector(".bz-animation-title");
const textureLoader = new THREE.TextureLoader();
const gs = gsap.timeline();
gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(ScrollTrigger);

//===================================================== Create a WebGL renderer
let animationStart = false;
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({ canvas });
// alert(window.innerWidth)
renderer.setSize(window.innerWidth, window.innerHeight);

//===================================================== Create an empty scene
var scene = new THREE.Scene();
scene.background = new THREE.Color("#ffffff ");
//===================================================== Create a perpsective camera
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.001,
  1000
);
camera.position.z = 150;

//===================================================== resize
window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//===================================================== Array of points
var points = [
  [0, 100],
  [0, 50],
];

//===================================================== Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = 0;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
}
//===================================================== Create a path from the points
var path = new THREE.CatmullRomCurve3(points);

//===================================================== Create the tube geometry from the path
var sides = 30;
var geometry = new THREE.TubeGeometry(path, 300, 3, sides, true);

//===================================================== Basic material
var material = new THREE.MeshBasicMaterial({
  side: THREE.BackSide,
  map: new THREE.TextureLoader().load(
    "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.3/src/assets/dap_texture.png"
  ),
});
material.map.wrapS = THREE.RepeatWrapping;
material.map.wrapT = THREE.RepeatWrapping;
material.map.repeat.set(2, 5);
//===================================================== Create a mesh
var tube = new THREE.Mesh(geometry, material);
tube.matrixAutoUpdate = false; //wont be moving so no need to update
scene.add(tube);

//===================================================== SOCIAL MEDAI
const texture1 = textureLoader.load(Box1T);
var boxGeometry1 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterial1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: texture1 },
  },
});
var box1 = new THREE.Mesh(boxGeometry1, boxMaterial1);
box1.position.set(-0.4, -0.2, 98);

// Box2
const texture2 = textureLoader.load(Box2T);
var boxGeometry2 = new THREE.BoxGeometry(0.3, 0.35, 0);
var boxMaterial2 = new THREE.MeshBasicMaterial({ map: texture2 });
var box2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
box2.position.set(0.4, -0.2, 97);

// Box3
const texture3 = textureLoader.load(Box3T);
var boxGeometry3 = new THREE.BoxGeometry(0.3, 0.35, 0);
var boxMaterial3 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: texture3 },
  },
});
var box3 = new THREE.Mesh(boxGeometry3, boxMaterial3);
box3.position.set(-0.4, 0.4, 96);
// Box4
const texture4 = textureLoader.load(Box4T);
var boxGeometry4 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterial4 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: texture4 },
  },
});
var box4 = new THREE.Mesh(boxGeometry4, boxMaterial4);
box4.position.set(0.4, 0.4, 95);

scene.add(box1, box2, box3, box4);
//===================================================== PHOTOGRAPHY
// BoxP1

const textureP1 = textureLoader.load(BoxP1);
var boxGeometryP1 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterialP1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureP1 },
  },
});
var boxP1 = new THREE.Mesh(boxGeometryP1, boxMaterialP1);
boxP1.position.set(-0.4, -0.2, 94);
// BoxP2
const textureP2 = textureLoader.load(BoxP2);
var boxGeometryP2 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterialP2 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureP2 },
  },
});
var boxP2 = new THREE.Mesh(boxGeometryP2, boxMaterialP2);
boxP2.position.set(0.4, -0.2, 93);
// BoxP3
const textureP3 = textureLoader.load(BoxP3);
var boxGeometryP3 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterialP3 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureP3 },
  },
});
var boxP3 = new THREE.Mesh(boxGeometryP3, boxMaterialP3);
boxP3.position.set(-0.4, 0.4, 92);
// BoxP4
const textureP4 = textureLoader.load(BoxP4);
var boxGeometryP4 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterialP4 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureP4 },
  },
});
var boxP4 = new THREE.Mesh(boxGeometryP4, boxMaterialP4);
boxP4.position.set(0.4, 0.4, 91);
// BoxP5
const textureP5 = textureLoader.load(BoxP5);
var boxGeometryP5 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterialP5 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureP5 },
  },
});
var boxP5 = new THREE.Mesh(boxGeometryP5, boxMaterialP5);
boxP5.position.set(-0.4, -0.2, 90);
// BoxP6
const textureP6 = textureLoader.load(BoxP6);
var boxGeometryP6 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterialP6 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureP6 },
  },
});
var boxP6 = new THREE.Mesh(boxGeometryP6, boxMaterialP6);
boxP6.position.set(0.4, -0.2, 89);

scene.add(boxP1, boxP2, boxP3, boxP4, boxP5, boxP6);
//===================================================== BRANDING
// BoxB1
const textureB1 = textureLoader.load(Box1B);
var boxGeometryB1 = new THREE.BoxGeometry(0.3, 0.3, 0);
var boxMaterialB1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureB1 },
  },
});
var boxB1 = new THREE.Mesh(boxGeometryB1, boxMaterialB1);
boxB1.position.set(-0.4, -0.2, 88);

// BoxB2
const textureB2 = textureLoader.load(Box2B);
var boxGeometryB2 = new THREE.BoxGeometry(0.3, 0.35, 0);
var boxMaterialB2 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureB2 },
  },
});
var boxB2 = new THREE.Mesh(boxGeometryB2, boxMaterialB2);
boxB2.position.set(0.4, -0.2, 87);
// BoxB3
const textureB3 = textureLoader.load(Box3B);
var boxGeometryB3 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialB3 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureB3 },
  },
});
var boxB3 = new THREE.Mesh(boxGeometryB3, boxMaterialB3);
boxB3.position.set(-0.4, 0.4, 86);

// BoxB4
const textureB4 = textureLoader.load(Box4B);
var boxGeometryB4 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialB4 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureB4 },
  },
});
var boxB4 = new THREE.Mesh(boxGeometryB4, boxMaterialB4);
boxB4.position.set(0.4, 0.4, 85);
// BoxB5
const textureB5 = textureLoader.load(Box5B);
var boxGeometryB5 = new THREE.BoxGeometry(0.3, 0.4, 0);
var boxMaterialB5 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureB5 },
  },
});
var boxB5 = new THREE.Mesh(boxGeometryB5, boxMaterialB5);
boxB5.position.set(-0.4, -0.2, 84);

// BoxB6
const textureB6 = textureLoader.load(Box6B);
var boxGeometryB6 = new THREE.BoxGeometry(0.3, 0.4, 0);
var boxMaterialB6 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureB6 },
  },
});
var boxB6 = new THREE.Mesh(boxGeometryB6, boxMaterialB6);
boxB6.position.set(0.4, -0.2, 83);

scene.add(boxB1, boxB2, boxB3, boxB4, boxB5, boxB6);
//===================================================== UI/UX
// BoxU1
const textureU1 = textureLoader.load(Box1U);
var boxGeometryU1 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialU1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureU1 },
  },
});
var boxU1 = new THREE.Mesh(boxGeometryU1, boxMaterialU1);
boxU1.position.set(-0.4, -0.2, 82);

// BoxU2
const textureU2 = textureLoader.load(Box2U);
var boxGeometryU2 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialU2 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureU2 },
  },
});
var boxU2 = new THREE.Mesh(boxGeometryU2, boxMaterialU2);
boxU2.position.set(0.4, -0.2, 81);
// BoxU3
const textureU3 = textureLoader.load(Box3U);
var boxGeometryU3 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialU3 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureU3 },
  },
});
var boxU3 = new THREE.Mesh(boxGeometryU3, boxMaterialU3);
boxU3.position.set(-0.4, 0.4, 80);

// BoxU4
const textureU4 = textureLoader.load(Box4U);
var boxGeometryU4 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialU4 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureU4 },
  },
});
var boxU4 = new THREE.Mesh(boxGeometryU4, boxMaterialU4);
boxU4.position.set(0.4, 0.4, 79);
// BoxU5
const textureU5 = textureLoader.load(Box5U);
var boxGeometryU5 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialU5 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureU5 },
  },
});
var boxU5 = new THREE.Mesh(boxGeometryU5, boxMaterialU5);
boxU5.position.set(-0.4, -0.2, 78);

// BoxU6
const textureU6 = textureLoader.load(Box6U);
var boxGeometryU6 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialU6 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureU6 },
  },
});
var boxU6 = new THREE.Mesh(boxGeometryU6, boxMaterialU6);
boxU6.position.set(0.4, -0.2, 77);
// BoxU7
const textureU7 = textureLoader.load(Box7U);
var boxGeometryU7 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialU7 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureU7 },
  },
});
var boxU7 = new THREE.Mesh(boxGeometryU7, boxMaterialU7);
boxU7.position.set(-0.4, 0.4, 76);

// BoxU8
const textureU8 = textureLoader.load(Box8U);
var boxGeometryU8 = new THREE.BoxGeometry(0.4, 0.3, 0);
var boxMaterialU8 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: textureU8 },
  },
});
var boxU8 = new THREE.Mesh(boxGeometryU8, boxMaterialU8);
boxU8.position.set(0.4, 0.4, 75);

scene.add(boxU1, boxU2, boxU3, boxU4, boxU5, boxU6, boxU7, boxU8);
//===================================================== VIDEOGRAPHY
// BoxV1
var videoV1 = document.createElement("video");
var videoTextureV1 = new THREE.VideoTexture(videoV1);
videoV1.src =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/1.mp4";
videoV1.crossOrigin = "anonymous";
videoV1.muted = "muted";
videoV1.loop = true;
videoV1.preload = "auto";
videoV1.play();
var boxGeometryV1 = new THREE.BoxGeometry(0.3, 0.45, 0);
var boxMaterialV1 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: videoTextureV1 },
  },
});
var boxV1 = new THREE.Mesh(boxGeometryV1, boxMaterialV1);
boxV1.position.set(-0.4, -0.2, 74);

// BoxV2
var videoV2 = document.createElement("video");
var videoTextureV2 = new THREE.VideoTexture(videoV2);
videoV2.src =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/2.mp4";
videoV2.crossOrigin = "anonymous";
videoV2.muted = "muted";
videoV2.loop = true;
videoV2.preload = "auto";
videoV2.play();
var boxGeometryV2 = new THREE.BoxGeometry(0.3, 0.45, 0);
var boxMaterialV2 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: videoTextureV2 },
  },
});
var boxV2 = new THREE.Mesh(boxGeometryV2, boxMaterialV2);
boxV2.position.set(0.4, -0.2, 73);
// BoxV3
var videoV3 = document.createElement("video");
var videoTextureV3 = new THREE.VideoTexture(videoV3);
videoV3.src =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/3.mp4";
videoV3.crossOrigin = "anonymous";
videoV3.muted = "muted";
videoV3.loop = true;
videoV3.preload = "auto";
videoV3.play();
var boxGeometryV3 = new THREE.BoxGeometry(0.3, 0.45, 0);
var boxMaterialV3 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: videoTextureV3 },
  },
});
var boxV3 = new THREE.Mesh(boxGeometryV3, boxMaterialV3);
boxV3.position.set(-0.4, 0.4, 72);
// BoxV4
var videoV4 = document.createElement("video");
var videoTextureV4 = new THREE.VideoTexture(videoV4);
videoV4.src =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/4.mp4";
videoV4.crossOrigin = "anonymous";
videoV4.muted = "muted";
videoV4.loop = true;
videoV4.preload = "auto";
videoV4.play();
var boxGeometryV4 = new THREE.BoxGeometry(0.3, 0.45, 0);
var boxMaterialV4 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: videoTextureV4 },
  },
});
var boxV4 = new THREE.Mesh(boxGeometryV4, boxMaterialV4);
boxV4.position.set(0.4, 0.4, 71);
// BoxV5
var videoV5 = document.createElement("video");
var videoTextureV5 = new THREE.VideoTexture(videoV5);
videoV5.src =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/5.mp4";
videoV5.crossOrigin = "anonymous";
videoV5.muted = "muted";
videoV5.loop = true;
videoV5.preload = "auto";
videoV5.play();
var boxGeometryV5 = new THREE.BoxGeometry(0.3, 0.45, 0);
var boxMaterialV5 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: videoTextureV5 },
  },
});
var boxV5 = new THREE.Mesh(boxGeometryV5, boxMaterialV5);
boxV5.position.set(-0.4, -0.2, 70);

// BoxV2
var videoV6 = document.createElement("video");
var videoTextureV6 = new THREE.VideoTexture(videoV6);
videoV6.src =
  "https://cdn.jsdelivr.net/gh/mgohar/dapTunnelAnim@0.1.2/src/assets/2.mp4";
videoV6.crossOrigin = "anonymous";
videoV6.muted = "muted";
videoV6.loop = true;
videoV6.preload = "auto";
videoV6.play();
var boxGeometryV6 = new THREE.BoxGeometry(0.3, 0.45, 0);
var boxMaterialV6 = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    maxDistance: { value: 3 }, // Adjust the maximum distance
    imageTexture: { value: videoTextureV6 },
  },
});
var boxV6 = new THREE.Mesh(boxGeometryV6, boxMaterialV6);
boxV6.position.set(0.4, -0.2, 69);
scene.add(boxV1, boxV2, boxV3, boxV4, boxV5, boxV6);
//===================================================== Create a point light in our scene
var light = new THREE.PointLight(new THREE.Color("white"), 1, 100);
scene.add(light);

// const orbitControls = new OrbitControls(camera, canvas);
// orbitControls.enableDamping = true;
//===================================================== Animate
// var percentage = 0;
// Initialize your variables
var percentage = 0.002; // Initial position along the path
var delayCall = 0;
// Add an event listener for the scroll event
const boxAPath =
  "M0.583984 48V1.28002H13.512C28.68 1.28002 38.024 11.392 38.024 24.64C38.024 37.952 27.784 48 13.768 48H0.583984ZM12.808 7.68002H7.55998V41.536H13.064C23.816 41.536 30.984 34.24 30.984 24.64C30.984 14.848 24.52 7.68002 12.808 7.68002ZM44.282 48V1.28002H51.258V48H44.282ZM81.8085 48.64C67.7285 48.64 57.5525 37.696 57.5525 24.64C57.5525 11.328 67.7285 0.640015 81.7445 0.640015C91.0885 0.640015 98.7045 5.50401 102.737 12.672L96.6565 16.32C93.6485 10.688 88.4645 7.29602 81.7445 7.29602C71.6325 7.29602 64.5285 15.168 64.5285 24.64C64.5285 34.176 71.7605 41.92 81.8085 41.92C90.6405 41.92 96.2085 36.544 97.6805 28.992H80.9125V22.4H104.977V24.896C104.977 37.568 96.3365 48.64 81.8085 48.64ZM111.22 48V1.28002H118.196V48H111.22ZM137.802 48V7.80802H124.554V1.28002H157.962V7.80802H144.714V48H137.802ZM153.411 48L170.563 1.28002H177.731L194.883 48H187.651L184.003 38.016H164.291L160.707 48H153.411ZM174.147 10.88L166.723 31.36H181.571L174.147 10.88ZM200.022 48V1.28002H206.998V41.344H225.878V48H200.022ZM248.72 48V1.28002H255.696V48H248.72ZM277.99 48.64C269.99 48.64 264.55 45.248 260.582 40.128L266.726 35.328C269.478 39.744 273.19 42.112 277.926 42.112C283.11 42.112 286.374 38.784 286.374 34.624C286.374 29.824 281.254 28.288 275.878 26.56C269.542 24.512 262.694 21.952 262.694 13.376C262.694 6.27202 269.03 0.640015 277.67 0.640015C284.774 0.640015 289.19 3.39202 292.774 7.55202L287.078 11.776C284.966 8.51202 281.83 6.78402 277.67 6.78402C272.934 6.78402 269.862 9.60002 269.862 13.248C269.862 17.728 274.79 19.2 280.166 20.992C286.566 23.168 293.542 25.92 293.542 34.624C293.542 41.792 287.654 48.64 277.99 48.64ZM343.368 48V27.84H322.248V48H315.272V1.28002H322.248V21.184H343.368V1.28002H350.28V48H343.368ZM355.411 48L372.563 1.28002H379.731L396.883 48H389.651L386.003 38.016H366.291L362.707 48H355.411ZM376.147 10.88L368.723 31.36H383.571L376.147 10.88ZM402.022 48V1.28002H416.55C426.47 1.28002 433.062 8.00001 433.062 16.512C433.062 22.72 429.606 28.608 422.95 30.656L434.086 48H426.086L412.006 25.728H415.782C422.758 25.728 426.086 20.8 426.086 16.512C426.086 11.264 422.694 7.74402 415.846 7.74402H408.998V48H402.022ZM439.397 48V1.28002H452.325C467.493 1.28002 476.837 11.392 476.837 24.64C476.837 37.952 466.597 48 452.581 48H439.397ZM451.621 7.68002H446.373V41.536H451.877C462.629 41.536 469.797 34.24 469.797 24.64C469.797 14.848 463.333 7.68002 451.621 7.68002Z";
const boxBPath =
  "M14.04 48L0.600006 1.28002H7.89601L17.816 37.056L29.08 1.28002H35.864L47.064 37.12L57.24 1.28002H64.28L50.52 48H43.608L32.408 12.096L21.144 48H14.04ZM69.459 48V1.28002H97.491V7.87202H76.435V21.248H97.491V27.84H76.435V41.344H97.491V48H69.459ZM119.897 48V1.28002H126.809L142.681 23.232L159.065 1.28002H165.657V48H158.745V12.416L142.553 34.24L126.873 12.928V48H119.897ZM170.786 48L187.938 1.28002H195.106L212.258 48H205.026L201.378 38.016H181.666L178.082 48H170.786ZM191.522 10.88L184.098 31.36H198.946L191.522 10.88ZM245.173 48L231.157 24.512L224.373 32.64V48H217.397V1.28002H224.373V23.552L242.933 1.28002H251.444L236.085 19.712L253.109 48H245.173ZM257.772 48V1.28002H285.804V7.87202H264.748V21.248H285.804V27.84H264.748V41.344H285.804V48H257.772ZM308.657 48V1.28002H315.633V48H308.657ZM335.24 48V7.80802H321.992V1.28002H355.4V7.80802H342.152V48H335.24ZM377.084 48V1.28002H405.116V7.87202H384.06V21.248H405.116V27.84H384.06V41.344H405.116V48H377.084ZM409.599 48L426.751 1.28002H433.919L451.071 48H443.839L440.191 38.016H420.479L416.895 48H409.599ZM430.335 10.88L422.911 31.36H437.759L430.335 10.88ZM471.365 48.64C463.365 48.64 457.925 45.248 453.957 40.128L460.101 35.328C462.853 39.744 466.565 42.112 471.301 42.112C476.485 42.112 479.749 38.784 479.749 34.624C479.749 29.824 474.629 28.288 469.253 26.56C462.917 24.512 456.069 21.952 456.069 13.376C456.069 6.27202 462.405 0.640015 471.045 0.640015C478.149 0.640015 482.565 3.39202 486.149 7.55202L480.453 11.776C478.341 8.51202 475.205 6.78402 471.045 6.78402C466.309 6.78402 463.237 9.60002 463.237 13.248C463.237 17.728 468.165 19.2 473.541 20.992C479.941 23.168 486.917 25.92 486.917 34.624C486.917 41.792 481.029 48.64 471.365 48.64ZM503.575 48V25.856L488.407 1.28002H496.087L507.031 19.2L518.039 1.28002H525.719L510.487 25.92V48H503.575Z";
const boxCPath =
  "M0.584 48V1.28002H28.616V7.87202H7.56V21.248H28.616V27.84H7.56V41.344H28.616V48H0.584ZM35.1465 48V1.28002H61.5785V7.87202H42.1225V21.248H61.5785V27.84H42.1225V48H35.1465ZM68.209 48V1.28002H94.641V7.87202H75.185V21.248H94.641V27.84H75.185V48H68.209ZM101.72 48V1.28002H108.696V48H101.72ZM138.99 48.64C125.166 48.64 114.99 37.888 114.99 24.64C114.99 11.008 125.614 0.640015 138.99 0.640015C147.822 0.640015 155.502 5.37602 159.662 12.416L153.582 16.192C150.702 10.816 145.582 7.36002 138.99 7.36002C129.262 7.36002 121.966 15.04 121.966 24.64C121.966 34.112 129.262 41.792 138.926 41.792C146.158 41.792 151.342 37.824 154.03 32.192L160.302 35.52C156.27 43.328 148.526 48.64 138.99 48.64ZM165.47 48V1.28002H172.446V48H165.47ZM180.084 48V1.28002H208.116V7.87202H187.06V21.248H208.116V27.84H187.06V41.344H208.116V48H180.084ZM214.647 48V1.28002H222.519L246.199 36.608V1.28002H253.111V48H245.751L221.623 12.096V48H214.647ZM272.24 48V7.80802H258.992V1.28002H292.4V7.80802H279.152V48H272.24ZM348.132 48L344.1 43.968C340.324 46.848 335.844 48.704 330.916 48.704C317.54 48.704 312.612 40.576 312.612 33.472C312.612 27.392 316.004 22.72 320.932 19.968C319.396 17.6 318.5 15.104 318.5 12.096C318.5 5.76002 323.62 0.640015 331.236 0.640015C338.02 0.640015 341.924 4.09602 343.844 8.06402L337.444 10.944C336.42 8.70402 334.564 6.78402 331.364 6.78402C327.972 6.78402 325.732 9.15201 325.732 12.096C325.732 15.872 327.588 17.792 333.476 23.744L344.612 34.944C346.98 31.808 348.516 28.16 349.156 24.64H341.412V18.112H356.004V21.184C356.004 27.008 353.38 33.856 348.964 39.232L357.604 48H348.132ZM330.852 42.56C334.116 42.56 337.124 41.472 339.684 39.68L327.78 27.648L324.9 24.768C321.38 26.816 319.524 29.504 319.524 33.408C319.524 37.952 323.236 42.56 330.852 42.56ZM378.209 48V1.28002H406.241V7.87202H385.185V21.248H406.241V27.84H385.185V41.344H406.241V48H378.209ZM412.772 48V1.28002H428.132C438.052 1.28002 445.028 8.44802 445.028 17.664C445.028 26.816 438.052 34.048 428.068 34.048H419.748V48H412.772ZM427.62 7.68002H419.748V27.584H427.62C434.02 27.584 438.052 23.232 438.052 17.664C438.052 12.032 434.02 7.68002 427.62 7.68002ZM451.532 48V1.28002H458.508V48H451.532ZM488.803 48.64C474.979 48.64 464.803 37.888 464.803 24.64C464.803 11.008 475.427 0.640015 488.803 0.640015C497.635 0.640015 505.315 5.37602 509.475 12.416L503.395 16.192C500.515 10.816 495.395 7.36002 488.803 7.36002C479.075 7.36002 471.779 15.04 471.779 24.64C471.779 34.112 479.075 41.792 488.739 41.792C495.971 41.792 501.155 37.824 503.843 32.192L510.115 35.52C506.083 43.328 498.339 48.64 488.803 48.64Z";
const boxDPath =
  "M16.84 47.64C7.368 47.64 0.456 41.304 0.456 31.256V0.279999H7.432V31.704C7.432 36.888 11.464 41.112 16.776 41.112C22.152 41.112 26.312 36.888 26.312 31.704V0.279999H33.224V31.256C33.224 41.304 26.248 47.64 16.84 47.64ZM40.7195 47V0.279999H47.6955V47H40.7195ZM52.966 47L75.11 0.279999H82.47L60.326 47H52.966ZM103.403 47.64C93.9305 47.64 87.0185 41.304 87.0185 31.256V0.279999H93.9945V31.704C93.9945 36.888 98.0265 41.112 103.339 41.112C108.715 41.112 112.875 36.888 112.875 31.704V0.279999H119.787V31.256C119.787 41.304 112.811 47.64 103.403 47.64ZM154.999 47L143.607 29.08L132.279 47H124.471L139.51 23.256L125.111 0.279999H132.919L143.671 17.176L154.359 0.279999H162.167L147.703 23.064L162.807 47H154.999Z";
const boxEPath =
  "M16.856 48L0.536 1.28H7.768L20.376 37.696L32.984 1.28H40.216L23.896 48H16.856ZM45.782 48V1.28H52.758V48H45.782ZM60.3965 48V1.28H73.3245C88.4925 1.28 97.8365 11.392 97.8365 24.64C97.8365 37.952 87.5965 48 73.5805 48H60.3965ZM72.6205 7.68H67.3725V41.536H72.8765C83.6285 41.536 90.7965 34.24 90.7965 24.64C90.7965 14.848 84.3325 7.68 72.6205 7.68ZM103.647 48V1.28H131.679V7.872H110.623V21.248H131.679V27.84H110.623V41.344H131.679V48H103.647ZM161.114 48.64C147.866 48.64 137.178 37.888 137.178 24.64C137.178 11.392 147.866 0.639999 161.114 0.639999C174.426 0.639999 185.114 11.392 185.114 24.64C185.114 37.888 174.426 48.64 161.114 48.64ZM161.114 41.856C170.714 41.856 178.138 34.112 178.138 24.64C178.138 15.168 170.714 7.36 161.114 7.36C151.578 7.36 144.154 15.168 144.154 24.64C144.154 34.112 151.578 41.856 161.114 41.856ZM214.496 48.64C200.416 48.64 190.24 37.696 190.24 24.64C190.24 11.328 200.416 0.639999 214.432 0.639999C223.776 0.639999 231.392 5.504 235.424 12.672L229.344 16.32C226.336 10.688 221.152 7.296 214.432 7.296C204.32 7.296 197.216 15.168 197.216 24.64C197.216 34.176 204.448 41.92 214.496 41.92C223.328 41.92 228.896 36.544 230.368 28.992H213.6V22.4H237.664V24.896C237.664 37.568 229.024 48.64 214.496 48.64ZM243.459 48V1.28H257.987C267.907 1.28 274.499 8 274.499 16.512C274.499 22.72 271.043 28.608 264.387 30.656L275.523 48H267.523L253.443 25.728H257.219C264.195 25.728 267.523 20.8 267.523 16.512C267.523 11.264 264.131 7.744 257.283 7.744H250.435V48H243.459ZM278.786 48L295.938 1.28H303.106L320.258 48H313.026L309.378 38.016H289.666L286.082 48H278.786ZM299.522 10.88L292.098 31.36H306.946L299.522 10.88ZM325.397 48V1.28H340.757C350.677 1.28 357.653 8.448 357.653 17.664C357.653 26.816 350.677 34.048 340.693 34.048H332.373V48H325.397ZM340.245 7.68H332.373V27.584H340.245C346.645 27.584 350.677 23.232 350.677 17.664C350.677 12.032 346.645 7.68 340.245 7.68ZM391.805 48V27.84H370.685V48H363.709V1.28H370.685V21.184H391.805V1.28H398.717V48H391.805ZM418.825 48V25.856L403.657 1.28H411.337L422.281 19.2L433.289 1.28H440.969L425.737 25.92V48H418.825Z";
const boxA = document.getElementById("SVGA");
MorphSVGPlugin.convertToPath(boxA);
// const morphTimeline = gsap
//   .timeline({ paused: true })
//   .to(boxA, { duration: 1, morphSVG: boxBPath, ease: "power1.inOut" })
//   .to(boxA, { duration: 1, morphSVG: boxAPath, ease: "power1.inOut" });
const svgElement = document.getElementById("SVGMain");

let startY = 0;

document.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

const track = document.querySelector(".animationHeight");
const tl = gsap.timeline({ paused: true });
tl.to(camera.position, {
  duration: 10,
  z: 54,
});
window.addEventListener("scroll", function (event) {
  const trackHeight = track.offsetHeight;
  const windowHeight = window.innerHeight;
  const progress =
    (window.pageYOffset - track.offsetTop) / (trackHeight - windowHeight);
  if (progress * 100 >= 50) {
    svgElement.setAttribute("viewBox", "0 0 511 49");
    gsap.to(boxA, {
      morphSVG: boxCPath,
      duration: 0.3,
      ease: "power1.inOut",
    });
  } else if (progress * 100 >= 38) {
    svgElement.setAttribute("viewBox", "0 0 526 49");
    gsap.to(boxA, {
      morphSVG: boxBPath,
      duration: 0.3,
      ease: "power1.inOut",
    });
  } else if (progress * 100 >= 5) {
    svgElement.setAttribute("viewBox", "0 0 477 49");
    gsap.to(boxA, {
      morphSVG: boxAPath,
      duration: 0.3,
      ease: "power1.inOut",
    });
  }
  // } else if (scrollCount >= 10 && scrollCount < 23) {
  //   if (delayCall == 0) {
  //     svgElement.setAttribute("viewBox", "0 0 477 49");
  //     gsap.to(boxA, {
  //       morphSVG: boxAPath,
  //       duration: 0.3,
  //       ease: "power1.inOut",
  //     });
  //   }
  // } else if (scrollCount >= 23 && scrollCount < 37) {
  //   if (delayCall == 0) {
  //     svgElement.setAttribute("viewBox", "0 0 526 49");
  //     gsap.to(boxA, {
  //       morphSVG: boxBPath,
  //       duration: 0.3,
  //       ease: "power1.inOut",
  //     });
  //   }
  // } else if (scrollCount >= 37 && scrollCount < 53) {
  //   if (delayCall == 0) {
  //     svgElement.setAttribute("viewBox", "0 0 526 48");
  //     gsap.to(boxA, {
  //       morphSVG: boxBPath,
  //       duration: 0.3,
  //       ease: "power1.inOut",
  //     });
  //   }
  // } else if (scrollCount >= 53 && scrollCount < 90) {
  //   if (delayCall == 0) {
  //     svgElement.setAttribute("viewBox", "0 0 511 49");
  //     gsap.to(boxA, {
  //       morphSVG: boxCPath,
  //       duration: 0.3,
  //       ease: "power1.inOut",
  //     });
  //   }
  // } else if (scrollCount >= 90 && scrollCount <= 99) {
  //   debounce(AnimateSVG, 2000,event);
  // } else if (scrollCount >= 100) {
  //   // animationStart = true;
  // }
  tl.progress(progress);
});

window.addEventListener("mousemove", function (e) {
  const x = e.clientX * 0.0003 - 0.3;
  const y = e.clientY * 0.0003 - 0.25;
  gsap.to(camera.position, { x: x, y: -y, duration: 2 });
});
var p1 = path.getPointAt(0 % 1);
// camera.position.set(p1.x, p1.y, p1.z);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
const axesHelper = new THREE.AxesHelper(50); // Adjust the size as needed
// scene.add(axesHelper);

const animation = gsap.from(".element", {
  opacity: 0,
  y: 100,
  duration: 1,
  paused: true, // Animation is initially paused
});

ScrollTrigger.create({
  trigger: ".animationHeight",
  start: "top 5%",
  end: "bottom 70%",
  markers: true,
  animation,
  onEnter: () => {
    // console.log("Element entered the viewport");
    const SVGMain = document.getElementById("SVGMain");
    gsap.to(SVGMain, { opacity: 1, scale: 1, duration: 2 });
    const body = document.querySelector("body");
  },
  onLeave: () => {},
  onToggle: ({ isActive }) => {
    console.log("Active:", isActive);
    if (isActive) {
      animationStart = true;
    } else {
      animationStart = false;
    }
  },
});

let check = 1;
function debounce(func, wait, event) {
  let timeout;
  if (check == 1) func(event);
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    check = 1;
  }, wait);
}
function AnimateSVG(event) {
  event.deltaY < 0
    ? gsap.to(SVGMain, { opacity: 1, scale: 1, duration: 0.9 })
    : gsap.to(SVGMain, {
        opacity: 1,
        scale: window.innerWidth / (window.innerWidth / 2),
        duration: 0.9,
      });

  check = 0;
}
