var container;
var camera, scene, renderer, clock, loader;
var uniforms;


init();
animate();

function init() {
    container = document.getElementById('container');

    camera = new THREE.Camera();
    camera.position.z = 1;

    scene = new THREE.Scene();
    loader = new THREE.TextureLoader();
    clock = new THREE.Clock();

    var geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        u_time: { type: "f", value: 1.0 },
        u_resolution: { type: "v2", value: new THREE.Vector2() },
        u_mouse: { type: "v2", value: new THREE.Vector2() },
        iChannel0: { type: "t", value: loader.load("./texture/texture.png") }
    };

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    document.onmousemove = function (e) {
        //console.log("mousemove",e.pageX,e.pageY,uniforms.u_resolution.value.x,uniforms.u_resolution.value.y,window.innerWidth,window.innerHeight)
        
        uniforms.u_mouse.value.x = e.pageX / window.innerWidth * uniforms.u_resolution.value.x;
        uniforms.u_mouse.value.y = e.pageY / window.innerHeight * uniforms.u_resolution.value.y;
    }
}

function onWindowResize(event) {

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