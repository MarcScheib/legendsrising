const capitalMatcher = /([A-Z])/g;

function addSpaceAndUpper(char) {
  return ' ' + char.toUpperCase();
}

function addHyphenAndLower(char) {
  return '-' + char.toLowerCase();
}

export function _titlecase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(capitalMatcher, addSpaceAndUpper);
}

export function _hyphenate(name) {
  return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
}
