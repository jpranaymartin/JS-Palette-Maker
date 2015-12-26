var colorUtils = {

  rgbToHex: function(arr) {
    var r = arr[0], g = arr[1], b = arr[2];
    return ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase();
  },

  hexToRgb: function(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = (bigint >> 0) & 255;
    return [r, g, b];
  },

  rgbToXyz: function(colorStr) {},

  xyzToRgb: function(colorStr) {},

  xyzToLab: function(colorStr) {},

  labToXYZ: function(colorStr) {},

  colorDiff: function(c1, c2) {},

  modPalette: function(arr, newRgbBase) {
    return arr.map(function(paletteColor) {
      newR = (paletteColor[0] + newRgbBase[0]) % 256;
      newG = (paletteColor[1] + newRgbBase[1]) % 256;
      newB = (paletteColor[2] + newRgbBase[2]) % 256;
      return [newR, newG, newB];
    });
  },

  translatePalette: function(arr, newRgbBase) {
    var prevBase = arr[0]
    var transforms = arr.map(function(compareColor) {
      return [
        compareColor[0] - prevBase[0],
        compareColor[1] - prevBase[1],
        compareColor[2] - prevBase[2]
      ];
    });

    return transforms.map(function(transform) {
      return [
        (newRgbBase[0] + transform[0]) % 256,
        (newRgbBase[1] + transform[1]) % 256,
        (newRgbBase[2] + transform[2]) % 256
      ];
    });
  },
};
