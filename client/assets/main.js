window.onload = function () {

  /**
   * ----------------    Setup
   */

  var colorThief = new ColorThief();

  /**
   * ----------------    Vue Setup
   */

  var vueApp = new Vue( {
    el: "#app",

    data: {
      colorCount: "",       // Size of palette
      search: "",           // x11 search term / hex code (no #)
        // Colors must always be stored in HEX codes unless in utils
      primaryColor: "",     // selected base color
      x11colors: x11colors, // list of all HTML color names
      imageName: "",        // Image name for display after upload
      image: {}             // Actual Image file TODO: Look for another home?
    },

    methods: {
      addPrimaryColor: function(colorStr){
        this.search = "";
        this.primaryColor = colorStr;
      },

      removePrimaryColor: function(){
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
    var userInput = $("#color-name-input").val();
    if(userInput.substr(0, 1) === "#" || userInput.length > 6){
      userInput = userInput.slice(-6)
    }
    vueApp.search = "";
    vueApp.primaryColor = userInput;
  });

  $("#go-button").on("click", function( e ) {
    var img = new Image;
    img.onload = function() {
      var palette = colorThief.getPalette(img, Number(vueApp.colorCount || 8));
        //.map(colorUtils.rgbToHex);
      URL.revokeObjectURL(img.src);
      if(vueApp.primaryColor !== "") {
        palette = colorUtils.translatePalette(palette, colorUtils.hexToRgb(vueApp.primaryColor));
      }
    };
    img.src = URL.createObjectURL(vueApp.image);
  });

  $("#reset-button").on("click", function( e ) {
    // KABOOM!
  });

  /**
   * ----------------    Get File (click handlers and drop event)
   */

  // Click handler to intitiate upload
  $( "#dropzone" ).on( "click", function () {
      $( "#file-input" ).click();
  });
  // Handler on hidden input that accepts the file
  $( "#file-input" ).on( "change", function () {
      handleImage( this.files[0] );
  });

  // Listeners for drop events with preventDefaults
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

  // store the image and title data in vueApp
  var handleImage = function ( file ) {
    if(file.type.substr(0, 5) !== "image"){
      throw new Error("Only image files allowed. You entered: " + file.type);
    } else {
      vueApp.imageName = file.name;
      vueApp.image = file;
    }
  };


};
