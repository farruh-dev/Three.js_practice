let scene, camera, renderer, loader, cube, line, light, floor
let sphere

window.addEventListener("resize", onWindowResize, false)

init()
animate()

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    loader = new THREE.GLTFLoader()

    scene.background = new THREE.Color("#000");
    scene.fog = new THREE.Fog( "#000", 20, 100 );

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.set(0, 0, 3)
    camera.lookAt(0, 0, 0)

    document.body.appendChild(renderer.domElement)

    const points = []
    points.push(new THREE.Vector3(2, 0, 0))
    points.push(new THREE.Vector3(0, 1, 0))
    points.push(new THREE.Vector3(-2, 0, 0))

    light = new THREE.PointLight( 0xffee88, 4, 100, 2 );
    const floor_geometry = new THREE.PlaneGeometry(20, 20);
    const cube_geometry = new THREE.BoxGeometry();
    const line_geometry = new THREE.BufferGeometry().setFromPoints(points);

    const crate_texture = new THREE.TextureLoader().load('../textures/crate.jpg') 
    const grid_texture = new THREE.TextureLoader().load('../textures/grid.png') 

    const cube_material = new THREE.MeshBasicMaterial({
        map: crate_texture
    });
    const floor_material = new THREE.MeshBasicMaterial({
        map: grid_texture
    })
    const line_material = new THREE.LineBasicMaterial({
        color: "#ffffff"
    });


    floor = new THREE.Mesh(floor_geometry, floor_material)
    cube = new THREE.Mesh(cube_geometry, cube_material)

    floor.receiveShadow = true
    floor.rotation.x = (-Math.PI / 2.0);
    floor.position.set(0, -2, 0)

    cube.rotation.set(0.8, 2.35, 0)

    // scene.add(cube)
    scene.add(light)
    // scene.add(floor)

    loader.load("../models/sphere.gltf", function(gltf){
        sphere = gltf.scene
        sphere.position.set(0, -1, -5)
        sphere.rotation.set(0, 11, 0)
        scene.add(sphere)
    }, undefined, function ( error ) {
        console.error( error );
    } )
}

function animate () {
    requestAnimationFrame(animate);

    sphere.rotation.y += 0.01
    sphere.rotation.x += 0.01

    renderer.render(scene, camera)
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight);
}
