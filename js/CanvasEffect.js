class THREEjsInitialize
{
	constructor()
	{
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		this.camera = new THRRE.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.2, 1000);
		this.camera.position.set(10,30,10);
		this.camera.lookAt(new THREE.Vector3(0,0,0));

		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		this.controls.autoRotate = true;

		this.scene = new THREE.Scene();

		this.light = new THREE.DirectionalLight(0xffffff);
		this.light.position.set(1,1,1);
		this.scene.add(this.light);

		window.addEventListener("resize", (()=>{
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.renderer.setSize(window.innerWidth / window.innerHeight);
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		}).bind(this));
	}

	tick()
	{
		this.rederer.render(this.scene, this.camera);
	}
}



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

var loader = new THREE.FontLoader();
loader.load('./fonts/gentilis_regular.typeface.json', function(font){
	var textGeometry = new THREE.TextGeometry("1", {
		font: font,
		size: 20,
		height: 5,
		curveSegments: 12
	});
	var materials = [
		new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
		new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
	];
	var textMesh = new THREE.Mesh(textGeometry, materials);
	scene.add(textMesh);
});

let render = ()=> {
    controls.update();
    renderer.render(scene, camera);
    setTimeout(render, 1000/30);
}

render();