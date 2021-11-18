export function escape(string) {
  var i = 0,
    length = string.length;
  for (i; i < length; i++) {
    string = string.replace('-', ' ');
  }
  return string;
}
