const capitalMatcher = /([A-Z])/g;

function addSpaceAndUpper(char) {
  return ' ' + char.toUpperCase();
}

export function _titlecase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(capitalMatcher, addSpaceAndUpper);
}
