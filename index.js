let buf = "";

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