var fs = require("fs");

// read all the brandnames in brandcolors.txt
fs.readFile("./brandcolors.txt", 'utf8', function (err, data) {
  if (err) throw err;

  // Store all brands as properties and colors as values
  var brands = {};

  // Break into lines
  var allValues = data.split("\n");

  // Iterate over lines
  for(var i = 0; i < allValues.length - 1; i++) {
    var tuple = allValues[i].split(":");

    // Get color
    var color = tuple.pop();

    // Get brand name parts
    var brand = tuple.pop().split("-");
    // If an iteration, adjust the name
    if( !!Number(brand.slice(-1)[0]) ){
      brand.pop();
    }
    brand = toTitleCase(brand.join(" "));

    // If brand isn't in the brands, add it
    if(brands[brand] === undefined){
      brands[brand] = [color];
    } else {
      // Otherwise, add to the colors
      brands[brand].push(color);
    }
  }

  var contents = "var brands = " + JSON.stringify(brands, null, "  ") + ";";
  fs.writeFile('brands,js', contents, function (err) {
    if (err) throw err;
    console.log('File saved!');
  });
});

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
