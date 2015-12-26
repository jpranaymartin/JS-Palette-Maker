window.onload = function () {

  /**
   * ----------------    Vue Setup
   */

  var vueApp = new Vue( {
    el: "#app",

    data: {
      search: "",
      primaryColor: "",
      x11colors: x11colors,
      imageName: ""
    },

    methods: {
      addPrimaryColor: function(colorStr){
        this.search = "";
        this.primaryColor = colorStr;
      },

      removePrimaryColor: function(colorStr){
        this.search = "";
        this.primaryColor = "";
      }
    }
  });

  /**
   * ----------------    Form handlers
   */

  $("#color-picker-form").on("submit", function( e ) {
    e.preventDefault();
    e.stopPropagation();
    var userInput = $("#form-control").val();
    if(userInput.substr(0, 1) === "#" || userInput.length > 6){
      userInput = userInput.slice(-6)
    }
    vueApp.search = "";
    vueApp.primaryColor = userInput;
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
      vueApp.imageName = file.name;
    }
  };


};
