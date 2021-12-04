const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 3)
camera.lookAt(0, 0, 0)

document.body.appendChild(renderer.domElement)

const points = []
points.push(new THREE.Vector3(2, 0, 0))
points.push(new THREE.Vector3(0, 1, 0))
points.push(new THREE.Vector3(-2, 0, 0))

const cube_geometry = new THREE.BoxGeometry();
const line_geometry = new THREE.BufferGeometry().setFromPoints(points);

const cube_material = new THREE.MeshBasicMaterial({ color: "#364f63"  });
const line_material = new THREE.LineBasicMaterial({ color: "#ffffff"  });

const cube  = new THREE.Mesh(cube_geometry, cube_material)
const line  = new THREE.Line(line_geometry, line_material)

scene.add(cube)
scene.add(line)

const animate = function(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    renderer.render(scene, camera)
}

animate()