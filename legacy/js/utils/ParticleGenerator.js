
class ParticleGenerator
{
    constructor(num){
        this.number = num;
    }

    generateAttributes()
    {
        return {
            indexs: new Uint16Array(this.number),
            offsets: new Float32Array(this.number * 3)
        };
    }

    generateGeometry(indexs, offsets)
    {
        this.geometry = new THREE.InstancedBufferGeometry();

        const positions = new THREE.BufferAttribute(new Float32Array(4*3), 3);
        positions.setXYZ(0, -0.5,  0.5,  0.0);
		positions.setXYZ(1,  0.5,  0.5,  0.0);
		positions.setXYZ(2, -0.5, -0.5,  0.0);
        positions.setXYZ(3,  0.5, -0.5,  0.0);
        this.geometry.setAttribute("position", positions);

        const uvs = new THREE.BufferAttribute(new Float32Array(4*2), 2);
		uvs.setXYZ(0,  0.0,  0.0);
		uvs.setXYZ(1,  1.0,  0.0);
		uvs.setXYZ(2,  0.0,  1.0);
		uvs.setXYZ(3,  1.0,  1.0);
        this.geometry.setAttribute('uv', uvs);
        
        this.geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([ 0, 2, 1, 2, 3, 1 ]), 1));

        this.geometry.setAttribute("pindex", new THREE.InstancedBufferAttribute(indexs, 1, false));
        this.geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(offsets, 3, false));

    }

    generateMaterial(uniforms,vert, frag)
    {
        this.material = new THREE.RawShaderMaterial({
            uniforms: uniforms,
            vertexShader: vert,
            fragmentShader: frag,
            depthTest: true,
            transparent: true
        });
        this.material.side = THREE.DoubleSide;
    }

    generateMesh()
    {
        this.particle = new THREE.Mesh(this.geometry, this.material);
        return this.particle;
    }


}