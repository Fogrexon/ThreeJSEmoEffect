let width = window.innerWidth;
let height = window.innerHeight;

// renderer

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// camera

const camera = new THREE.PerspectiveCamera(70, width/height, 0.2, 1000);
camera.position.set(10,30,10);
camera.lookAt(new THREE.Vector3(0,0,0));

// orbitcontrols

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;

// scene

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xaaaaff );

// lights

const light = new THREE.DirectionalLight(0x4444ff);
light.position.set( 1, 1, 1 );
scene.add(light);

const Amblight = new THREE.AmbientLight(0x000077);
Amblight.position.set( 0, 1, 0 );
scene.add(Amblight);

// particle
let getPoint = (size)=>
{
    let x,y,z;
    x = (Math.random()-0.5)*2.0*size;
    y = (Math.random()-0.5)*2.0*size;
    z = (Math.random()-0.5)*2.0*size;

    if(x*x+y*y+z*z < size*size) return {x:x,y:y,z:z};
    return getPoint(size);
}

let particle;
const image = new Image();
image.addEventListener("load",(e)=>{
    
    const w = 80, h = 80;
    const pixels = ImageToPixel(image, w,h);
    let count = 0;
    for(let i=0;i<pixels.length / 4;i++)
    {
        if(pixels[i*4+0]+pixels[i*4+1]+pixels[i*4+2]<15||pixels[i*4+3]<5) continue;
        count ++;
    }

    console.log(count);

    particle = new CubeParticleGenerator(count);
    let {offsets, indexs} = particle.generateAttributes();

    let j=0;
    for(let i=0;i<w*h;i++)
    {
        if(pixels[i*4+0]+pixels[i*4+1]+pixels[i*4+2]<15||pixels[i*4+3]<5) continue;
        indexs.setX(j,i);
        let {x,y,z} = getPoint(w);
        offsets.setXYZ(j,x,y,z);
        j++;
    }
    particle.generateGeometry(indexs, offsets);
    particle.generateMaterial(
        LogoParticleShader.vertex
    );
    particle.uniforms.size.value = [w,h];

    scene.add(particle.generateMesh());
});
image.src = "./imgs/logo.png";

//resize

const onResize = ()=>{
    width = window.innerWidth;
    height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

window.addEventListener("resize", onResize, false);

// rendering

const start = Date.now();

let render = ()=> {
    controls.update();
    if(!!particle)
    {
        particle.uniforms.time.value = (Date.now() - start)/1000;
    }
    renderer.render(scene, camera);
    setTimeout(render, 1000/30);
}

render();