class CanvasRendering
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.startTime = Date.now();

        this.material = new THREE.SpriteMaterial({
            map: new THREE.Texture(this.canvas),
            transparent:true});

        this.material.map.needsUpdate = true;

        this.mesh = new THREE.Sprite(this.material);
    }

    render()
    {
        (this.rendering.bind(this))(Date.now() - this.start);
    }
}