let scene, camera, renderer, cube, line
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    const loader = new THREE.GLTFLoader()

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.set(0, 0, 3)
    camera.lookAt(0, 0, 0)

    document.body.appendChild(renderer.domElement)

    const points = []
    points.push(new THREE.Vector3(2, 0, 0))
    points.push(new THREE.Vector3(0, 1, 0))
    points.push(new THREE.Vector3(-2, 0, 0))

    const light = new THREE.AmbientLight("#fff");
    const floor_geometry = new THREE.PlaneGeometry(20, 20);
    const cube_geometry = new THREE.BoxGeometry();
    const line_geometry = new THREE.BufferGeometry().setFromPoints(points);

    const crate_texture = new THREE.TextureLoader().load('../textures/crate.jpg') 
    const grid_texture = new THREE.TextureLoader().load('../textures/grid.jpg') 

    const cube_material = new THREE.MeshBasicMaterial({
        map: crate_texture
    });
    const line_material = new THREE.LineBasicMaterial({
        color: "#ffffff"
    });


    cube = new THREE.Mesh(cube_geometry, cube_material)
    line = new THREE.Line(line_geometry, line_material)

    cube.rotation.set(0.8, 2.35, 0)

    // scene.add(cube)
    scene.add(light)
    scene.add(line)

    loader.load("../models/RoboAnt.gltf", function(gltf){
        let obj = gltf.scene
        obj.position.set(0, 0, -7)
        obj.rotation.set(0, 11, 0)
        scene.add(obj)
    }, undefined, function ( error ) {

        console.error( error );
    
    } )
}

const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false)

init()
animate()