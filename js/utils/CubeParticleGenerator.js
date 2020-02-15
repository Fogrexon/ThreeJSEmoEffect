
class CubeParticleGenerator
{
    constructor(num){
        this.number = num;
    }

    generateAttributes()
    {
        return {
            offsets: new THREE.InstancedBufferAttribute(new Float32Array(this.number * 3), 3, false, 1),
            indexs: new THREE.InstancedBufferAttribute(new Float32Array(this.number), 1, false, 1)
        };
    }

    generateGeometry(indexs, offsets)
    {
        const original = new THREE.BoxBufferGeometry(0.3,0.3,0.3);

        this.geometry = new THREE.InstancedBufferGeometry();

        this.geometry.setAttribute("position", original.attributes.position.clone());
        this.geometry.setAttribute("normals", original.attributes.normal.clone());
        this.geometry.setAttribute("uv", original.attributes.normal.clone());
        this.geometry.setIndex(original.index.clone());
        
        this.geometry.setAttribute("index", indexs);
        this.geometry.setAttribute("offset", offsets);
    }

    generateMaterial(vert)
    {
        let cUni = {
            time: {
                value: 0
            }
        }
        
        this.uniforms = THREE.UniformsUtils.merge([THREE.ShaderLib.standard.uniforms,cUni]);
        this.uniforms.diffuse.value = new THREE.Vector3(1.0,1.0,1.0);
        this.uniforms.roughness.value = 0.1;
        
        this.material = new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: THREE.ShaderLib.standard.fragmentShader,
            uniforms: this.uniforms,
            flatShading: true,
            lights: true
        });
    }

    generateMesh()
    {
        this.particle = new THREE.Mesh(this.geometry, this.material);
        return this.particle;
    }


}