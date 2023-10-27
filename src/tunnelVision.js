import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
//===================================================== SOCIAL MEDIA
const Box1T =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Social/2.png";
const Box2T =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Social/3.png";
const Box3T =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Social/6.png";
const Box4T =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Social/7.png";

//===================================================== PHOTOGRAPHY
const BoxP1 =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Photography/10.png";
const BoxP2 =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Photography/18.png";
const BoxP3 =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Photography/20.png";
const BoxP4 =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Photography/23.png";
const BoxP5 =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Photography/28.png";
const BoxP6 =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Photography/34.png";

//===================================================== BRANDING
const Box1B =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Branding/1.png";
const Box2B =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Branding/3.png";
const Box3B =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Branding/4.png";
const Box4B =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Branding/5.png";
const Box5B =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Branding/6.png";
const Box6B =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Branding/8.png";

//===================================================== UIUX
const Box1U =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/UIUX/1.png";
const Box2U =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/UIUX/2.png";
const Box3U =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/UIUX/3.png";
const Box4U =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/UIUX/4.png";
const Box5U =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/UIUX/5.png";
const Box6U =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/UIUX/6.png";
const Box7U =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/UIUX/7.png";
const Box8U =
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/UIUX/8.png";
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
    "https://celestialcode.s3.us-west-2.amazonaws.com/Parvarish/RippleAnimationAssets/env_texture1.png"
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
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Video/1.mp4";
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
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Video/2.mp4";
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
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Video/3.mp4";
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
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Video/4.mp4";
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
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Video/5.mp4";
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
  "https://celestialcode.s3.us-west-2.amazonaws.com/DAP/Portfolio/Video/2.mp4";
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
  "M18.24 48.64C10.24 48.64 4.8 45.248 0.832 40.128L6.976 35.328C9.728 39.744 13.44 42.112 18.176 42.112C23.36 42.112 26.624 38.784 26.624 34.624C26.624 29.824 21.504 28.288 16.128 26.56C9.792 24.512 2.944 21.952 2.944 13.376C2.944 6.272 9.28 0.639999 17.92 0.639999C25.024 0.639999 29.44 3.392 33.024 7.552L27.328 11.776C25.216 8.512 22.08 6.784 17.92 6.784C13.184 6.784 10.112 9.6 10.112 13.248C10.112 17.728 15.04 19.2 20.416 20.992C26.816 23.168 33.792 25.92 33.792 34.624C33.792 41.792 27.904 48.64 18.24 48.64ZM62.2385 48.64C48.9905 48.64 38.3025 37.888 38.3025 24.64C38.3025 11.392 48.9905 0.639999 62.2385 0.639999C75.5505 0.639999 86.2385 11.392 86.2385 24.64C86.2385 37.888 75.5505 48.64 62.2385 48.64ZM62.2385 41.856C71.8385 41.856 79.2625 34.112 79.2625 24.64C79.2625 15.168 71.8385 7.36 62.2385 7.36C52.7025 7.36 45.2785 15.168 45.2785 24.64C45.2785 34.112 52.7025 41.856 62.2385 41.856ZM115.365 48.64C101.541 48.64 91.365 37.888 91.365 24.64C91.365 11.008 101.989 0.639999 115.365 0.639999C124.197 0.639999 131.877 5.376 136.037 12.416L129.957 16.192C127.077 10.816 121.957 7.36 115.365 7.36C105.637 7.36 98.341 15.04 98.341 24.64C98.341 34.112 105.637 41.792 115.301 41.792C122.533 41.792 127.717 37.824 130.405 32.192L136.677 35.52C132.645 43.328 124.901 48.64 115.365 48.64ZM141.845 48V1.28H148.821V48H141.845ZM154.411 48L171.563 1.28H178.731L195.883 48H188.651L185.003 38.016H165.291L161.707 48H154.411ZM175.147 10.88L167.723 31.36H182.571L175.147 10.88ZM201.022 48V1.28H207.998V41.344H226.878V48H201.022ZM249.272 48V1.28H256.184L272.056 23.232L288.44 1.28H295.032V48H288.12V12.416L271.928 34.24L256.248 12.928V48H249.272ZM302.209 48V1.28H330.241V7.872H309.185V21.248H330.241V27.84H309.185V41.344H330.241V48H302.209ZM336.772 48V1.28H349.7C364.868 1.28 374.212 11.392 374.212 24.64C374.212 37.952 363.972 48 349.956 48H336.772ZM348.996 7.68H343.748V41.536H349.252C360.004 41.536 367.172 34.24 367.172 24.64C367.172 14.848 360.708 7.68 348.996 7.68ZM380.47 48V1.28H387.446V48H380.47ZM393.036 48L410.188 1.28H417.356L434.508 48H427.276L423.628 38.016H403.916L400.332 48H393.036ZM413.772 10.88L406.348 31.36H421.196L413.772 10.88Z";
const boxBPath =
  "M0.584 48V1.28H15.944C25.864 1.28 32.84 8.448 32.84 17.664C32.84 26.816 25.864 34.048 15.88 34.048H7.56V48H0.584ZM15.432 7.68H7.56V27.584H15.432C21.832 27.584 25.864 23.232 25.864 17.664C25.864 12.032 21.832 7.68 15.432 7.68ZM66.9925 48V27.84H45.8725V48H38.8965V1.28H45.8725V21.184H66.9925V1.28H73.9045V48H66.9925ZM103.676 48.64C90.428 48.64 79.74 37.888 79.74 24.64C79.74 11.392 90.428 0.639999 103.676 0.639999C116.988 0.639999 127.676 11.392 127.676 24.64C127.676 37.888 116.988 48.64 103.676 48.64ZM103.676 41.856C113.276 41.856 120.7 34.112 120.7 24.64C120.7 15.168 113.276 7.36 103.676 7.36C94.14 7.36 86.716 15.168 86.716 24.64C86.716 34.112 94.14 41.856 103.676 41.856ZM141.115 48V7.808H127.867V1.28H161.275V7.808H148.027V48H141.115ZM185.301 48.64C172.053 48.64 161.365 37.888 161.365 24.64C161.365 11.392 172.053 0.639999 185.301 0.639999C198.613 0.639999 209.301 11.392 209.301 24.64C209.301 37.888 198.613 48.64 185.301 48.64ZM185.301 41.856C194.901 41.856 202.325 34.112 202.325 24.64C202.325 15.168 194.901 7.36 185.301 7.36C175.765 7.36 168.341 15.168 168.341 24.64C168.341 34.112 175.765 41.856 185.301 41.856ZM238.684 48.64C224.604 48.64 214.428 37.696 214.428 24.64C214.428 11.328 224.604 0.639999 238.62 0.639999C247.964 0.639999 255.58 5.504 259.612 12.672L253.532 16.32C250.524 10.688 245.34 7.296 238.62 7.296C228.508 7.296 221.404 15.168 221.404 24.64C221.404 34.176 228.635 41.92 238.684 41.92C247.516 41.92 253.084 36.544 254.556 28.992H237.788V22.4H261.852V24.896C261.852 37.568 253.212 48.64 238.684 48.64ZM267.647 48V1.28H282.175C292.095 1.28 298.687 8 298.687 16.512C298.687 22.72 295.231 28.608 288.575 30.656L299.711 48H291.711L277.631 25.728H281.407C288.383 25.728 291.711 20.8 291.711 16.512C291.711 11.264 288.319 7.744 281.471 7.744H274.623V48H267.647ZM302.974 48L320.126 1.28H327.294L344.446 48H337.214L333.566 38.016H313.854L310.27 48H302.974ZM323.71 10.88L316.286 31.36H331.134L323.71 10.88ZM349.584 48V1.28H364.944C374.864 1.28 381.84 8.448 381.84 17.664C381.84 26.816 374.864 34.048 364.88 34.048H356.56V48H349.584ZM364.432 7.68H356.56V27.584H364.432C370.832 27.584 374.864 23.232 374.864 17.664C374.864 12.032 370.832 7.68 364.432 7.68ZM415.993 48V27.84H394.873V48H387.897V1.28H394.873V21.184H415.993V1.28H422.905V48H415.993ZM443.012 48V25.856L427.844 1.28H435.524L446.468 19.2L457.476 1.28H465.156L449.924 25.92V48H443.012Z";
const boxCPath =
  "M0.584 48V1.28H16.392C25.864 1.28 31.752 6.016 31.752 14.016C31.752 18.176 29.896 21.504 26.248 23.552C30.728 25.472 33.224 29.248 33.224 34.496C33.224 43.136 27.016 48 17.48 48H0.584ZM17.16 27.2H7.56V41.6H17.48C22.984 41.6 26.248 38.72 26.248 34.368C26.248 29.952 23.624 27.2 17.16 27.2ZM16.392 7.616H7.56V20.736H16.648C22.28 20.736 24.776 17.92 24.776 14.016C24.776 9.984 21.896 7.616 16.392 7.616ZM39.0215 48V1.28H53.5495C63.4695 1.28 70.0615 8 70.0615 16.512C70.0615 22.72 66.6055 28.608 59.9495 30.656L71.0855 48H63.0855L49.0055 25.728H52.7815C59.7575 25.728 63.0855 20.8 63.0855 16.512C63.0855 11.264 59.6935 7.744 52.8455 7.744H45.9975V48H39.0215ZM74.3485 48L91.5005 1.28H98.6685L115.821 48H108.589L104.941 38.016H85.2285L81.6445 48H74.3485ZM95.0845 10.88L87.6605 31.36H102.509L95.0845 10.88ZM120.959 48V1.28H128.831L152.511 36.608V1.28H159.423V48H152.063L127.935 12.096V48H120.959ZM166.584 48V1.28H179.512C194.68 1.28 204.024 11.392 204.024 24.64C204.024 37.952 193.784 48 179.768 48H166.584ZM178.808 7.68H173.56V41.536H179.064C189.816 41.536 196.984 34.24 196.984 24.64C196.984 14.848 190.52 7.68 178.808 7.68ZM210.282 48V1.28H217.258V48H210.282ZM224.897 48V1.28H232.769L256.449 36.608V1.28H263.361V48H256.001L231.873 12.096V48H224.897ZM293.434 48.64C279.354 48.64 269.178 37.696 269.178 24.64C269.178 11.328 279.354 0.639999 293.37 0.639999C302.714 0.639999 310.33 5.504 314.362 12.672L308.282 16.32C305.274 10.688 300.09 7.296 293.37 7.296C283.258 7.296 276.154 15.168 276.154 24.64C276.154 34.176 283.385 41.92 293.434 41.92C302.266 41.92 307.834 36.544 309.306 28.992H292.538V22.4H316.602V24.896C316.602 37.568 307.962 48.64 293.434 48.64Z";
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


window.addEventListener("wheel", function (event) {
  // console.log("Wheel",event.deltaY,animationStart);
  if (animationStart) {
    if (event.deltaY > 0) {
      percentage += 0.009;
      scrollCount++;
    } else if (event.deltaY < 0) {
      if (percentage > 0.005) {
        percentage -= 0.009;
        scrollCount--;
      }
    }
    console.log("scrollCount:", scrollCount);

    if (scrollCount > -2 && scrollCount < 10) {
      if (delayCall == 0) {
        svgElement.setAttribute("viewBox", "0 0 435 49");
        gsap.to(boxA, {
          morphSVG: boxAPath,
          duration: 0.3,
          ease: "power1.inOut",
        });
        // Modify the path data
        let canvasParent = this.document.querySelector(".canvasParent");
        event.deltaY > 0 ? window.scrollTo(0, canvasParent.offsetTop) : null;
        event.deltaY > 0
          ? (document.body.style.overflow = "hidden")
          : (document.body.style.overflow = "auto");

        // boxA.setAttribute("d", boxAPath);
        // svgElement.appendChild(boxA);
        delayCall = 1;
        animationStart = true;
      }
    } else if (scrollCount >= 10 && scrollCount < 23) {
      if (delayCall == 0) {
        event.deltaY > 0 ? window.scrollTo(0, canvasParent.offsetTop) : null;
        svgElement.setAttribute("viewBox", "0 0 466 49");
        gsap.to(boxA, {
          morphSVG: boxBPath,
          duration: 0.3,
          ease: "power1.inOut",
        });
        // boxA.setAttribute("d", boxBPath);
        // svgElement.appendChild(boxA);
        delayCall = 1;
        animationStart = true;
        event.deltaY > 0 ? (document.body.style.overflow = "hidden") : null;
      }
    } else if (scrollCount >= 23 && scrollCount < 37) {
      if (delayCall == 0) {
        event.deltaY > 0 ? window.scrollTo(0, canvasParent.offsetTop) : null;
        svgElement.setAttribute("viewBox", "0 0 317 49");
        gsap.to(boxA, {
          morphSVG: boxCPath,
          duration: 0.3,
          ease: "power1.inOut",
        });
        // boxA.setAttribute("d", boxCPath);
        // svgElement.appendChild(boxA);
        delayCall = 1;
        animationStart = true;
        event.deltaY > 0 ? (document.body.style.overflow = "hidden") : null;
      }
    } else if (scrollCount >= 37 && scrollCount < 53) {
      if (delayCall == 0) {
        svgElement.setAttribute("viewBox", "0 0 163 48");
        gsap.to(boxA, {
          morphSVG: boxDPath,
          duration: 0.3,
          ease: "power1.inOut",
        });
        // boxA.setAttribute("d", boxDPath);
        // svgElement.appendChild(boxA);
        delayCall = 1;
        animationStart = true;
      }
    } else if (scrollCount >= 53 && scrollCount < 90) {
      if (delayCall == 0) {
        svgElement.setAttribute("viewBox", "0 0 441 49");
        gsap.to(boxA, {
          morphSVG: boxEPath,
          duration: 0.3,
          ease: "power1.inOut",
        });
        // boxA.setAttribute("d", boxEPath);
        // svgElement.appendChild(boxA);
        delayCall = 1;
        animationStart = true;
      }
    } else if (scrollCount >= 90 && scrollCount <= 99) {
      debounce(AnimateSVG, 2000,event);
      
     
      event.deltaY > 0 ? null : (animationStart = true);
      delayCall = 1;
      animationStart = true;
  
    } else if (scrollCount >= 100) {
     
      // event.deltaY > 0? gsap.to(SVGMain, { opacity: 1, scale:  window.innerWidth/(window.innerWidth/2), duration: 0.9 }):gsap.to(SVGMain, { opacity: 1, scale: 1, duration: 0.9 });
      let canvasParent = this.document.querySelector(".canvasParent");
      event.deltaY < 0 ? window.scrollTo(0, canvasParent.offsetTop) : null;
      animationStart = true;
      event.deltaY > 0 ? null : (animationStart = true);
      event.deltaY > 0
        ?document.body.style.overflow = "auto"
        : (document.body.style.overflow = "hidden");
      // console.log("Over_____________________");
    }
    setTimeout(() => {
      delayCall = 0;
    }, 1000);

    // Get the camera position and lookAt based on the updated percentage
    var p1 = path.getPointAt(percentage);
    var p2 = path.getPointAt(percentage);
    light.position.set(p2.x, p2.y, p2.z);

    if (event.deltaY < 0) {
      gsap.to(camera.position, { z: p1.z, duration: 2 });
    } else {
      gsap.to(camera.position, { z: p1.z, duration: 2 });
    }
  }
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
  trigger: ".canvasParent",
  start: "top 5%",
  end: "bottom 70%",
  markers: false,
  animation,
  onEnter: () => {
    animationStart = true;
    // console.log("Element entered the viewport");
    const SVGMain = document.getElementById("SVGMain");
    gsap.to(SVGMain, { opacity: 1, scale: 1, duration: 2 });
    const body = document.querySelector("body");
  },
  onLeave: () => {
    // document.body.style.overflow = 'auto'
    // console.log("Element left the viewport");
    animationStart = false;
    // gsap.to(SVGMain, { opacity: 1, scale: 3, duration: 1 });
  },
  onToggle: ({ isActive }) => {
    console.log("Active:", isActive);
    if (isActive) {
      // gsap.to(SVGMain, { opacity: 1, scale: 1, duration: 2 });
      animationStart = true;
      // document.body.style.overflow = 'hidden'
    } else {
      animationStart = false;
      // gsap.to(SVGMain, { opacity: 1, scale: 3, duration: 1 });
      // document.body.style.overflow = 'auto'
    }
  },
});

let check=1;
function debounce(func, wait,event) {
  let timeout;
  if(check==1) func(event);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      check=1;
    }, wait);
}
function AnimateSVG(event) {
  console.log('asdfasdfasfasfasfasfsafsfs---------------------------------------');
  event.deltaY < 0
        ? gsap.to(SVGMain, { opacity: 1, scale: 1, duration: 0.9 })
        :  gsap.to(SVGMain, { opacity: 1, scale: window.innerWidth/(window.innerWidth/2), duration: 0.9 });;

  check=0
}