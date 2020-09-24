
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

const light = new THREE.HemisphereLight(0xFFFFFF, 0x3333aa);
light.position.set( 0, 1, 0 );
scene.add(light);

const geometry = new THREE.SphereGeometry(5,32,32);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0,10,0);
scene.add(sphere);

const particle = new ParticleGenerator(10000);
let {indexs, offsets} = particle.generateAttributes();


for(let i=0;i<particle.number;i++)
{
    indexs[i] = i;
    offsets[i*3+0] = (Math.random()-0.5)*2.0*100;
    offsets[i*3+1] = (Math.random()-0.5)*2.0*100;
    offsets[i*3+2] = (Math.random()-0.5)*2.0*100;
}
particle.generateGeometry(indexs, offsets);
let uniforms = {
    uTime: {value: 0},
    uSize: {value: 1.0}
};
particle.generateMaterial(
    uniforms ,
    ParticleShader.vertex ,
    ParticleShader.fragment
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

const render = ()=> {
    controls.update();
    renderer.render(scene, camera);
    setTimeout(render, 1000/30);
}

render();