var cU = {

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

  rgbToHsl: function(arr) {
    var r = arr[0], g = arr[1], b = arr[2];
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
      h = s = 0; // achromatic
    }else{
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h, s, l];
  },

  hslToRgb: function(arr) {
    var h = arr[0], s = arr[1], l = arr[2];
    var r, g, b;

    function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    if(s == 0){
      r = g = b = l; // achromatic
    }else{
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  },

  rgbToXyz: function(arr) {
    var R = arr[0]/255, G = arr[1]/255, B = arr[2]/255;

    R = R > 0.04045 ? Math.pow(((R + 0.055 ) / 1.055), 2.4) : R / 12.92;
    G = G > 0.04045 ? Math.pow(((G + 0.055 ) / 1.055), 2.4) : G / 12.92;
    B = B > 0.04045 ? Math.pow(((B + 0.055 ) / 1.055), 2.4) : B / 12.92;

    R *= 100; G *= 100; B *=100;

    var X = R * 0.4124 + G * 0.3576 + B * 0.1805;
    var Y = R * 0.2126 + G * 0.7152 + B * 0.0722;
    var Z = R * 0.0193 + G * 0.1192 + B * 0.9505;

    return [X, Y, Z];
  },

  xyzToRgb: function(arr) {
    var X = arr[0], Y = arr[1], Z= arr[2];
    X /= 100; Y /= 100; Z /= 100;

    var R = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
    var G = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
    var B = X * 0.0557 + Y * -0.2040 + Z * 1.0570;

    R = R > 0.0031308 ? 1.055 * Math.pow(R, (1 / 2.4)) - 0.055 : R * 12.92;
    G = G > 0.0031308 ? 1.055 * Math.pow(G, (1 / 2.4)) - 0.055 : G * 12.92;
    B = B > 0.0031308 ? 1.055 * Math.pow(B, (1 / 2.4)) - 0.055 : B * 12.92;

    R = Math.round(R * 255); G = Math.round(G * 255); B = Math.round(B * 255);
    return [R, G, B];
  },

  labToXyz: function(arr) {
    var L = arr[0], a = arr[1], b = arr[2];

    var Y = (L + 16)/116;
    var X = a / 500 + Y;
    var Z = Y - b / 200;

    Y = Math.pow(Y, 3) > 0.008856 ? Math.pow(Y, 3) : (Y - 16 / 116) / 7.787;
    X = Math.pow(X, 3) > 0.008856 ? Math.pow(X, 3) : (X - 16 / 116) / 7.787;
    Z = Math.pow(Z, 3) > 0.008856 ? Math.pow(Z, 3) : (Z - 16 / 116) / 7.787;

    X *= 95.047; Y *= 100.000; Z *= 108.883;
    return [X, Y, Z];
  },

  xyzToLab: function(arr) {
    var X = arr[0], Y = arr[1], Z= arr[2];
    X /= 95.047; Y /= 100.000; Z /= 108.883;

    X = X > 0.008856 ? Math.pow(X, 1/3) : (X * 7.787) + (16/116);
    Y = Y > 0.008856 ? Math.pow(Y, 1/3) : (Y * 7.787) + (16/116);
    Z = Z > 0.008856 ? Math.pow(Z, 1/3) : (Z * 7.787) + (16/116);

    var L = (116 * Y) - 16;
    var a = 500 * (X - Y);
    var b = 200 * (Y - Z);

    return [L, a, b];
  },

  labToLch: function(arr) {
    var L = arr[0], a = arr[1], b = arr[2];
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    var h = Math.atan2(b, a);
    h = h > 0 ? (h / Math.PI) * 180 : 360 - (Math.abs(h) / Math.PI) * 180;
    return [L, c, h];
  },

  lchToLab: function(arr) {
    var L = arr[0], c = arr[1], h = arr[2];
    var a = Math.cos( h * Math.PI / 180 ) * c;
    var b = Math.sin( h * Math.PI / 180 ) * c;
    return [L, a, b];
  },

  translatePalette: function(arr, newBase) {
    var newBaseLch = cU.labToLch(cU.xyzToLab(cU.rgbToXyz(newBase)));
    var arrLch = arr.map(function(color) {
      return cU.labToLch(cU.xyzToLab(cU.rgbToXyz(color)));
    });
    console.log(arrLch);
    var transforms = arrLch.map(function(lchColor){
      return lchColor[2] - arrLch[0][2];
    });
    console.log(transforms);
    return arrLch.map(function(lchColor, i) {
      var newH = newBaseLch[2] + transforms[i];
      newH = newH > 0 ? newH % 360 : 360 + newH;
      var newLch = [lchColor[0], lchColor[1], newH];
      return cU.xyzToRgb(cU.labToXyz(cU.lchToLab(newLch)));
    });
  },

  /**
   * These are bad attempts at transposing colors. Left here to be worked on later.
   */

  // modPalette: function(arr, newRgbBase) {
  //   return arr.map(function(paletteColor) {
  //     newR = (paletteColor[0] + newRgbBase[0]) % 256;
  //     newG = (paletteColor[1] + newRgbBase[1]) % 256;
  //     newB = (paletteColor[2] + newRgbBase[2]) % 256;
  //     return [newR, newG, newB];
  //   });
  // },

  // translatePaletteRgb: function(arr, newRgbBase) {
  //   var prevBase = arr[0]
  //   var transforms = arr.map(function(compareColor) {
  //     return [
  //       compareColor[0] - prevBase[0],
  //       compareColor[1] - prevBase[1],
  //       compareColor[2] - prevBase[2]
  //     ];
  //   });
  //
  //   return transforms.map(function(transform) {
  //     return [
  //       (newRgbBase[0] + transform[0]) % 256,
  //       (newRgbBase[1] + transform[1]) % 256,
  //       (newRgbBase[2] + transform[2]) % 256
  //     ];
  //   });
  // },

  // translatePaletteHsl: function( arr, newRgbBase ) {
  //   var newHslBase = colorUtils.rgbToHsl(newRgbBase);
  //   var arrHsl = arr.map(function(color) {
  //     return colorUtils.rgbToHsl(color);
  //   });
  //
  //   var transforms = arrHsl.map(function(compareColor) {
  //     return compareColor[0] - arrHsl[0][0];
  //   });
  // },
};
