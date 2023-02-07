// constant values
let CIF_EOF      = 0xffffffff;
let CIF_RESERVED = 0x20;

const MAGIC_Number = {
  v0: 0xdbfe
};

function cif_header_t(magic, width, height){
  this.magic = magic;
  this.width = width;
  this.height = height;
}

function cif_pixel_t(r, g, b){
  this.r = r;
  this.g = g;
  this.b = b;
}

const plot_pix = (x, y, col) => {
  var c   = document.getElementById("cif");
  var ctx = c.getContext("2d");

  ctx.fillStyle = col || '#000';
  ctx.fillRect(x, y, 1, 1);
}

document.querySelector("#read-file").addEventListener("click", () => {
  // does file exist?
  if(document.querySelector("#file").value == ""){
    alert("no file loaded!\n");
    return; // do not continue past this point
  }

	var file = document.querySelector("#file").files[0];

	var reader = new FileReader();
	reader.onload = (e) => {
		console.log(`Raw data: ${e.target.result}`);
    let buffer = e.target.result;
    // now we should parse it

    
    let magic = ((buffer[0].charCodeAt(0) << 8) | buffer[1].charCodeAt(0));
    let version = 0;

    let width  = ((buffer[2].charCodeAt(0)));
    let height = ((buffer[4].charCodeAt(0)));
    
    switch(magic){
      case MAGIC_Number.v0:
        version = 0;
        break;
        
        default:
          version = -4;
          break;
        }
        
    let hdr = new cif_header_t(magic, width, height);
  
    if(version == -4){
      alert("Invalid version specified");
      return;
    }

    let ct_pixels = 1;
    for(let i = 5; i < buffer.length; i++){
      try {
        if(buffer[i+3].charCodeAt(0) == 0x20){
          if(ct_pixels > (hdr.height * hdr.width)){
            console.log(`CT_Pixels: ${ct_pixels}\nDimensions: ${hdr.height * hdr.width}`);
            alert("Too many/too few pixels!");
            return;
          }

          let r = buffer[i].charCodeAt(0);
          let g = buffer[i+1].charCodeAt(0);
          let b = buffer[i+2].charCodeAt(0);
          
          console.log(`Color: ${r} | ${g} | ${b} (pix: ${ct_pixels})`);

          ct_pixels++;
        }
      } catch {
        continue; /* TODO */
      }
    }
  };

  // was there an error?
	reader.onerror = (e) => {
    alert(`Error: ${e.type}`)
	};

  reader.readAsBinaryString(file);
});