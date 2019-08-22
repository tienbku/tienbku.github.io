var e = [],
  b = function(f) {
    return "\\" + e.push(f) + "\\";
  },
  a = function(f, g) {
    return e[g - 1];
  },
  c = function(f, option) {
    if (option == "2") {
      return new Array(f + 1).join("  ");
    } else if (option == "4") {
      return new Array(f + 1).join("    ");
    } else {
      return new Array(f + 1).join("\t");
    }
  };

function jsonFormatter(j, option) {
  e = [];
  var g = "",
    f = 0;
  j = j
    .replace(/\\./g, b)
    .replace(/(".*?"|'.*?')/g, b)
    .replace(/\s+/, "");
  for (var h = 0; h < j.length; h++) {
    var k = j.charAt(h);
    switch (k) {
      case "{":
      case "[":
        g += k + "\n" + c(++f, option);
        break;
      case "}":
      case "]":
        g += "\n" + c(--f, option) + k;
        break;
      case ",":
        g += ",\n" + c(f, option);
        break;
      case ":":
        g += ": ";
        break;
      case " ":
      case "\n":
        break;
      default:
        g += k;
        break;
    }
  }
  g = g
    .replace(/\[[\d,\s]+?\]/g, function(i) {
      return i.replace(/\s/g, "");
    })
    .replace(/\\(\d+)\\/g, a)
    .replace(/\\(\d+)\\/g, a);
  return g;
}
