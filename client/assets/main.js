window.onload = function () {

  /**
   * ----------------    Setup
   */
  var colorThief = new ColorThief();

  var initialState = {
    colorCount: "",       // Size of palette
    colorSearch: "",      // x11 search term / hex code (no #)
    primaryColor: "",     // selected base color
    x11colors: x11colors, // list of all HTML color names
    imageName: "",        // Image name for display after upload
    image: {},            // Actual Image file TODO: Look for another home?
    palette: [],          // Working palette
    brandSearch: "",      // searched brand
    brandNames: Object.keys(brands), // list of all brand names
    brandSelection: "",
  };

  /**
   * ----------------    Vue Setup
   */
  var vm = new Vue( {
    el: "#app",

    data: JSON.parse(JSON.stringify(initialState)),

    methods: {
      addPrimaryColor: function(colorStr){
        this.colorSearch = "";
        this.primaryColor = colorStr;
      },

      removePrimaryColor: function(){
        this.colorSearch = "";
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
    vm.colorSearch = "";
    vm.primaryColor = userInput;
  });

  $("#go-button").on("click", function( e ) {
    var img = new Image;
    img.onload = function() {
      // Get RGB palette and destroy objectURL from memory
      vm.palette = colorThief.getPalette(img, Number(vm.colorCount || 8));
      URL.revokeObjectURL(img.src);
      showColors(vm.palette);
      // If a primary color is input, transpose the palette
      if(vm.primaryColor !== "") {
        vm.palette = cU.translatePalette( vm.palette, cU.hexToRgb(vm.primaryColor) );
        showColors(vm.palette);
      }
      // Initiate palette generation
    };
    img.src = URL.createObjectURL(vm.image);
  });

  $("#reset-button").on("click", function( e ) {
    // KABOOM! - move to vm proper when possible
    vm.colorCount = "";
    vm.colorSearch = "";
    vm.primaryColor = "";
    vm.imageName = "";
    vm.image = {};
    vm.image = [];
    vm.brandSelection = "";
    vm.brandSearch = "";
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
  // dropzone.addEventListener("dragenter", dragenter, false);
  // dropzone.addEventListener("dragover", dragover, false);
  dropzone.addEventListener("drop", drop, false);
  // function dragenter(e) { e.stopPropagation(); e.preventDefault();}
  // function dragover(e) { e.stopPropagation(); e.preventDefault();}
  function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    handleImage( e.dataTransfer.files[0]);
  }

  // store the image and title data in `vm`
  var handleImage = function ( file ) {
    if(file.type.substr(0, 5) !== "image"){
      throw new Error("Only image files allowed. You entered: " + file.type);
    } else {
      vm.imageName = file.name;
      vm.image = file;
    }
  };
};


function showColors (palette ){
  palette.forEach(function(color){
    $("body").append("<div style='display: inline-block; background-color: rgb("+color[0]+","+color[1]+","+color[2]+"); width: 48px; height: 48px;'></div>")
  })
  $("body").append("<br><br><br>");
}
