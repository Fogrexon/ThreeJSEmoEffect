class THREEjsInitialize
{
	constructor()
	{
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth/ window.innerHeight, 0.2, 1000);
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
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
		}).bind(this));


	}

	add(object)
	{
		this.scene.add(object);
	}

	render()
	{
		this.controls.update();
		this.rederer.render(this.scene, this.camera);
	}
}

const three = new THREEjsInitialize();

const sprite = new CanvasRendering(500,500);
sprite.mesh.scale.set(50,50);
sprite.rendering = (t)=>{
	const ctx = this.context;
	ctx.clearRect(0,0,500,500);
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(250, 250);
	ctx.lineTo(250 * Math.cos(t/1000), 250 * Math.sin(t/1000));
	ctx.strokeColor = "#FFFFFF";
	ctx.stroke();
}

three.add(sprite.mesh);
setInterval(()=>{
	sprite.render();
	three.render();
}, 1000 / 30);