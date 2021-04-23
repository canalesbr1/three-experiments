let scene, camera, renderer, objects, tween_up, tween_down, x, y, raycaster, mouse

function getI(x, xsize) {
    return (y * xsize + x)
}
function getX(i, xsize) {
    return (i % xsize)
}
function getY(i, xsize) {
    return Math.floor(i / xsize)
}

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(20, 25, 30)// Set position like this
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, .6))
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(2, 3, 1.5).normalize()
    scene.add(light)

    raycaster = new THREE.Raycaster()
    mouse = new THREE.Vector2()

    const geometry = new THREE.BoxGeometry(.25, .25, .25)
    const material = new THREE.MeshLambertMaterial({ color: 0xf19f8d })
    xnum = 20
    ynum = 20

    const xt = .29
    const yt = .29

    objects = new Array(xnum * ynum)
    // tween_up = new Array(xnum * ynum)
    // tween_down = new Array(xnum * ynum)

    for (let i = 0; i < objects.length; i++) {
        objects[i] = new THREE.Mesh(geometry, material)
        const xpos = getX(i, xnum)
        const ypos = getY(i, ynum)

        objects[i].position.x += xpos * xt - ((xnum - 1) * xt) * .5
        objects[i].position.z += ypos * yt - ((ynum - 1) * yt) * .5
        //objects[i].rotation.x = i * .001
        scene.add(objects[i])
        //tween_up[i] = new TWEEN.Tween(objects[i].position).to({ y: 1 }, 300)
        //tween_down[i] = new TWEEN.Tween(objects[i].position).to({ y: 0 }, 2000)
        //tween_up[i].chain(tween_down[i])
    }
}

function clamp(a, b, c) {
    return Math.max(b, Math.min(c, a));
}

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true)

    for (let i = 0; i < intersects.length; i++) {
        //intersects[i].object.position.y += .1
        //intersects[i].object.rotation.y += .05
        intersects[i].object.scale.y += .2;
        intersects[i].object.position.y += .0125 * 2

    }
}

function animate() {
    requestAnimationFrame(animate)
    for (let i = 0; i < objects.length; i++) {
        //objects[i].rotation.y += .01
        objects[i].scale.y *= .998;
        objects[i].scale.y = clamp(objects[i].scale.y, 1, 100000)
        objects[i].position.y *= .95;
    }
    TWEEN.update()
    renderer.render(scene, camera)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)
window.addEventListener('mousemove', onMouseMove)

init()
animate()