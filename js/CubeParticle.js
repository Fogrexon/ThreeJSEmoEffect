let width = window.innerWidth;
let height = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(70, width/height, 0.2, 1000);
camera.position.set(10,30,10);
camera.lookAt(new THREE.Vector3(0,0,0));

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xFFFFFF);
light.position.set( 0, 1, 0 );

scene.add(light);
const Amblight = new THREE.AmbientLight(0x222277);
Amblight.position.set( 0, 1, 0 );

scene.add(Amblight);

// const geometry = new THREE.SphereGeometry(5,32,32);
// const material = new THREE.MeshStandardMaterial();
// const sphere = new THREE.Mesh(geometry, material);
// sphere.position.set(0,10,0);
// scene.add(sphere);

const particle = new CubeParticleGenerator(10000);
let {offsets, indexs} = particle.generateAttributes();

let theta, phi, r;
for(let i=0;i<particle.number;i++)
{
    indexs.setX(i,i);
    theta = Math.PI * Math.random();
    phi = Math.PI * 2 * Math.random();
    r = Math.random() * 20;
    
    x = r * Math.sin(theta) * Math.cos(phi);
    y = r * Math.sin(theta) * Math.sin(phi);
    z = r * Math.cos(theta);
    offsets.setXYZ(i,x,y,z);
}
particle.generateGeometry(indexs, offsets);
particle.generateMaterial(
    CubeParticleShader.vertex
);

scene.add(particle.generateMesh());


const onResize = ()=>{
    width = window.innerWidth;
    height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener("resize", onResize, false);

const start = Date.now();

const render = ()=> {
    controls.update();
    if(!!particle) particle.uniforms.time.value = (Date.now() - start)/1000;
    renderer.render(scene, camera);
    setTimeout(render, 1000/30);
}

render();