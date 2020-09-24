
const ImageToPixel = (img, width, height)=>{
    if(!width)
    {
        width = img.width;
        height = img.height;
    }else if(!height){
        height = img.height / img.width * width;
    }

    const cnv = document.createElement("canvas");
    cnv.width = width;
    cnv.height = height;

    const ctx = cnv.getContext("2d");

    ctx.drawImage(img, 0,0,width, height);

    return ctx.getImageData(0,0,width,height).data;
}