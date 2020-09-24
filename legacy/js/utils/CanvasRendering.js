class CanvasRendering
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;

        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");

        this.startTime = Date.now();

        this.material = new THREE.SpriteMaterial({
            map: new THREE.Texture(this.canvas),
            transparent:true});


        this.mesh = new THREE.Sprite(this.material);

        this.mesh.material.map.needsUpdate = true;
    }

    render()
    {
        this.rendering(this.context, Date.now() - this.startTime);
        this.mesh.material.map.needsUpdate = true;
    }
}