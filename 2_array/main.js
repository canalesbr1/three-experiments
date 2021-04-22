let scene, camera, renderer, object, objects

let theta = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        .1,
        100
    );
    camera.position.set(0, 0, 15);
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, .6));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const geometry = new THREE.BoxGeometry(.5, .5, .5);
    const material = new THREE.MeshLambertMaterial({ color: 0xE5FF00 });
    objects = new Array(16);
    for (let i = 0; i < objects.length; i++) {
        objects[i] = new THREE.Mesh(geometry, material);
        objects[i].position.x += (i - (objects.length - 1) * .5) * .5;
        scene.add(objects[i]);
    }

    // object = new THREE.Mesh(geometry, material);
    // scene.add(object);


}


function animate() {
    requestAnimationFrame(animate);
    theta += .1;
    for (let i = 0; i < objects.length; i++) {
        objects[i].rotation.x += .01 + i * .005;
        objects[i].scale.x = Math.sin(theta * .35 + i * .1);
    }
    // object.rotation.x += .01;
    // object.rotation.z += .02;
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false)

init();
animate();
