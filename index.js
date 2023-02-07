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
		alert(`Raw data: ${e.target.result}`);
    let k = e.target.result;
    // now we should parse it
	};

  // was there an error?
	reader.onerror = (e) => {
    alert(`Error: ${e.type}`)
	};
});