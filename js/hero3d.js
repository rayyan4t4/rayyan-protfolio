/* Real-time 3D: hero "signal bloom" + learning-section wireframe.
   Vanilla three.js, light-theme studio lighting, mouse parallax. */
import * as THREE from "three";

(function () {
  "use strict";
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ACCENT = 0xff4d00;
  var INK = 0x171410;

  function makeRenderer(canvas, alpha) {
    var r = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: alpha });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    return r;
  }

  function softDotTexture() {
    var c = document.createElement("canvas"); c.width = c.height = 64;
    var g = c.getContext("2d");
    var grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(23,20,16,0.85)");
    grad.addColorStop(0.4, "rgba(23,20,16,0.35)");
    grad.addColorStop(1, "rgba(23,20,16,0)");
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
    var t = new THREE.CanvasTexture(c); return t;
  }

  /* ================= HERO ================= */
  function initHero() {
    var canvas = document.getElementById("heroCanvas");
    if (!canvas || !window.WebGLRenderingContext) return;
    var renderer, scene, camera, group, knot, ring, sats = [], particles, pGeo;
    try {
      renderer = makeRenderer(canvas, true);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0.4, 11);
    } catch (e) { canvas.style.display = "none"; return; }

    /* studio lighting for a light theme */
    scene.add(new THREE.HemisphereLight(0xffffff, 0xe6dcc8, 1.05));
    var key = new THREE.DirectionalLight(0xfff4e6, 2.4); key.position.set(5, 7, 6); scene.add(key);
    var rim = new THREE.DirectionalLight(0xdfe8ff, 1.1); rim.position.set(-6, -2, -4); scene.add(rim);
    var fill = new THREE.DirectionalLight(0xffffff, 0.55); fill.position.set(-3, 4, 5); scene.add(fill);

    group = new THREE.Group(); scene.add(group);

    /* the bloom: torus knot in signal orange */
    var knotGeo = new THREE.TorusKnotGeometry(1.55, 0.46, 220, 36);
    var knotMat = new THREE.MeshPhysicalMaterial({
      color: ACCENT, roughness: 0.3, metalness: 0.08,
      clearcoat: 1, clearcoatRoughness: 0.28,
      sheen: 0.4, sheenColor: new THREE.Color(0xffb08a)
    });
    knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    /* thin ink orbit ring */
    var ringGeo = new THREE.TorusGeometry(2.9, 0.016, 12, 180);
    var ringMat = new THREE.MeshBasicMaterial({ color: INK, transparent: true, opacity: 0.5 });
    ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.25;
    ring.rotation.y = 0.35;
    group.add(ring);

    /* small satellite spheres on the ring */
    var satGeo = new THREE.SphereGeometry(0.09, 24, 24);
    var satMat = new THREE.MeshStandardMaterial({ color: INK, roughness: 0.4 });
    for (var i = 0; i < 3; i++) {
      var s = new THREE.Mesh(satGeo, satMat);
      s.userData.a = (i / 3) * Math.PI * 2;
      sats.push(s); group.add(s);
    }

    /* drifting dust particles */
    var COUNT = 130;
    var pos = new Float32Array(COUNT * 3);
    var spd = new Float32Array(COUNT);
    for (var j = 0; j < COUNT; j++) {
      pos[j * 3] = (Math.random() - 0.5) * 16;
      pos[j * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[j * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      spd[j] = 0.08 + Math.random() * 0.25;
    }
    pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size: 0.14, map: softDotTexture(), transparent: true, opacity: 0.55,
      depthWrite: false, color: INK, sizeAttenuation: true
    }));
    scene.add(particles);

    /* layout: right side on desktop, centered-back on mobile */
    function layout() {
      var w = canvas.clientWidth || window.innerWidth;
      var h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      if (w < 720) { group.position.set(0, 0.6, -1.5); group.scale.setScalar(0.72); }
      else { group.position.set(w / h > 1.4 ? 3.1 : 1.6, 0.2, 0); group.scale.setScalar(1); }
    }
    layout();
    window.addEventListener("resize", layout);

    /* mouse parallax */
    var mx = 0, my = 0, tx = 0, ty = 0;
    window.addEventListener("pointermove", function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    var visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(canvas);
    }

    var clock = new THREE.Clock();
    function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      var t = clock.getElapsedTime();
      mx += (tx - mx) * 0.045; my += (ty - my) * 0.045;

      knot.rotation.x = t * 0.16 + my * 0.25;
      knot.rotation.y = t * 0.22 + mx * 0.35;
      var breathe = 1 + Math.sin(t * 0.9) * 0.022;
      knot.scale.set(breathe, breathe, breathe);

      ring.rotation.z = t * 0.12;
      sats.forEach(function (s, i) {
        var a = s.userData.a + t * (0.28 + i * 0.05);
        s.position.set(Math.cos(a) * 2.9, Math.sin(a) * 2.9 * Math.cos(0.44), Math.sin(a) * 2.9 * Math.sin(0.44) * -1);
        s.position.applyEuler(ring.rotation);
      });

      var arr = pGeo.attributes.position.array;
      for (var k = 0; k < COUNT; k++) {
        arr[k * 3 + 1] += spd[k] * 0.016;
        arr[k * 3] += Math.sin(t * 0.4 + k) * 0.0012;
        if (arr[k * 3 + 1] > 5.5) arr[k * 3 + 1] = -5.5;
      }
      pGeo.attributes.position.needsUpdate = true;

      group.rotation.y = mx * 0.18;
      group.rotation.x = -my * 0.12;
      camera.position.x = mx * 0.5;
      camera.position.y = 0.4 - my * 0.35;
      camera.lookAt(group.position.x * 0.6, 0.2, 0);

      renderer.render(scene, camera);
    }

    if (prefersReduced) { renderer.render(scene, camera); }
    else frame();
  }

  /* ================= LEARNING (dark section wireframe) ================= */
  function initLearning() {
    var canvas = document.getElementById("learningCanvas");
    if (!canvas || !window.WebGLRenderingContext) return;
    var renderer, scene, camera, wire, inner;
    try {
      renderer = makeRenderer(canvas, true);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(0, 0, 8);
    } catch (e) { canvas.style.display = "none"; return; }

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    var dl = new THREE.DirectionalLight(0xffffff, 1.4); dl.position.set(4, 6, 5); scene.add(dl);

    var geo = new THREE.IcosahedronGeometry(2.1, 1);
    wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.85 })
    );
    scene.add(wire);
    inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshStandardMaterial({ color: 0x2a251d, roughness: 0.5, metalness: 0.3, flatShading: true })
    );
    scene.add(inner);

    function layout() {
      var w = canvas.clientWidth || 300, h = canvas.clientHeight || 300;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    layout();
    window.addEventListener("resize", layout);

    var visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(canvas);
    }
    var clock = new THREE.Clock();
    function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      var t = clock.getElapsedTime();
      wire.rotation.y = t * 0.18; wire.rotation.x = t * 0.1;
      inner.rotation.y = -t * 0.28; inner.rotation.z = t * 0.14;
      var s = 1 + Math.sin(t * 1.1) * 0.03;
      wire.scale.set(s, s, s);
      renderer.render(scene, camera);
    }
    if (prefersReduced) { renderer.render(scene, camera); }
    else frame();
  }

  try { initHero(); } catch (e) { /* hero stays static */ }
  try { initLearning(); } catch (e) { /* section stays static */ }
})();
