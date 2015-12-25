window.onload = function () {

  /**
   * ----------------    Vue Setup
   */

  new Vue( {
    el: '#app',

    data: {
      search: '',
      colors: x11colors
    },
  });

  /**
   * ----------------    File Upload
   */

  // Click handler to intitiate upload
  $( "#dropzone" ).on( "click", function () {
      $( "#file-input" ).click();
  });
  // Handler on hidden input that accepts the file
  $( "#file-input" ).on( "change", function () {
      handleImage( this.files[0] );
  });

  var dropzone = document.getElementById("dropzone");
  dropzone.addEventListener("dragenter", dragenter, false);
  dropzone.addEventListener("dragover", dragover, false);
  dropzone.addEventListener("drop", drop, false);
  function dragenter(e) { e.stopPropagation(); e.preventDefault();}
  function dragover(e) { e.stopPropagation(); e.preventDefault();}
  function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    handleImage( e.dataTransfer.files[0]);
  }

  var handleImage = function ( file ) {
    if(file.type.substr(0, 5) !== "image"){
      throw new Error("Only image files allowed. You entered: " + file.type);
    } else {
      console.log(file.name);
    }
  };

};
