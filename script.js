import * as THREE from "three";

import vertexShader from "./shaders/shader.vert";
import fragmentShader from "./shaders/shader.frag";

var plane;
var camera, scene, renderer, clock;
var uniforms;

setup();

function setup() {
  camera = new THREE.Camera();
  camera.position.z = 0;

  scene = new THREE.Scene();
  clock = new THREE.Clock();

  uniforms = {
    u_time: { value: 1.0 },
    u_resolution: { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2() },
  };

  var geometry = new THREE.PlaneGeometry(2, 2);
  var material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });
  plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);

  document.body.appendChild(renderer.domElement);

  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);

  document.onmousemove = function (e) {
    uniforms.u_mouse.value.x = e.pageX;
    uniforms.u_mouse.value.y = e.pageY;
  };

  animate();
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.u_time.value += clock.getDelta();
  renderer.render(scene, camera);
}
