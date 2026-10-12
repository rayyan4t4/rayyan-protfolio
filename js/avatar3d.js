import * as THREE from "three";

(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var INK = 0x171410, ACCENT = 0xff4d00;

  var canvas = document.getElementById("avaCanvas");
  var renderer, scene, camera, bot, eyeL, eyeR, tip;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(76, 76, false);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
    camera.position.set(0, 0.15, 3.4);
    camera.lookAt(0, 0.1, 0);
  } catch (e) { return; }

  scene.add(new THREE.HemisphereLight(0xffffff, 0xe6dcc8, 1.1));
  var key = new THREE.DirectionalLight(0xfff4e6, 2.2); key.position.set(3, 4, 4); scene.add(key);
  var rim = new THREE.DirectionalLight(0xdfe8ff, 0.9); rim.position.set(-4, -1, -3); scene.add(rim);

  bot = new THREE.Group(); scene.add(bot);
  var inkMat = new THREE.MeshStandardMaterial({ color: INK, roughness: 0.35, metalness: 0.15 });

  var head = new THREE.Mesh(new THREE.SphereGeometry(0.62, 40, 32), inkMat);
  head.scale.set(1, 0.9, 0.88); bot.add(head);

  var eyeMat = new THREE.MeshStandardMaterial({ color: ACCENT, emissive: ACCENT, emissiveIntensity: 1.6, roughness: 0.3 });
  eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.095, 20, 16), eyeMat);
  eyeL.position.set(-0.21, 0.1, 0.5); bot.add(eyeL);
  eyeR = eyeL.clone(); eyeR.position.x = 0.21; bot.add(eyeR);

  var ant = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.42, 12), inkMat);
  ant.position.set(0, 0.72, 0); ant.rotation.z = 0.18; bot.add(ant);
  tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), eyeMat);
  tip.position.set(0.075, 0.94, 0); bot.add(tip);

  var mouseX = 0, mouseY = 0;
  window.addEventListener("pointermove", function (e) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  var t = 0, nextBlink = 2.5, blinkT = -1;
  function frame() {
    requestAnimationFrame(frame);
    t += 0.016;
    bot.position.y = Math.sin(t * 2.1) * 0.05;
    var targetY = Math.sin(t * 0.7) * 0.28 + mouseX * 0.35;
    var targetX = Math.cos(t * 0.5) * 0.1 - mouseY * 0.2;
    bot.rotation.y += (targetY - bot.rotation.y) * 0.06;
    bot.rotation.x += (targetX - bot.rotation.x) * 0.06;
    tip.material.emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.6;
    if (t > nextBlink) { blinkT = t; nextBlink = t + 2.2 + Math.random() * 2.5; }
    var s = (blinkT > 0 && t - blinkT < 0.12) ? 0.12 : 1;
    eyeL.scale.y = eyeR.scale.y = s;
    renderer.render(scene, camera);
  }
  if (reduced) { renderer.render(scene, camera); } else { frame(); }

  var btn = document.getElementById("avaBtn");
  var panel = document.getElementById("avaPanel");
  var close = document.getElementById("avaClose");
  var frameEl = document.getElementById("avaFrame");
  var SRC = "https://portfolio-rag-chat-5k6zrbaixyywuxah4nykew.streamlit.app/?embed=true";
  var loaded = false;

  function open() {
    if (!loaded) { frameEl.src = SRC; loaded = true; }
    panel.hidden = false;
  }
  function shut() { panel.hidden = true; }
  btn.addEventListener("click", function () { panel.hidden ? open() : shut(); });
  close.addEventListener("click", shut);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") shut(); });
})();
