const capitalMatcher = /([A-Z])/g;

function addSpaceAndUpper(char: string): string {
  return ' ' + char.toUpperCase();
}

function addHyphenAndLower(char: string): string {
  return '-' + char.toLowerCase();
}

export function _titlecase(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(capitalMatcher, addSpaceAndUpper);
}

export function _hyphenate(name: string): string {
  return (name.charAt(0).toLowerCase() + name.slice(1)).replace(capitalMatcher, addHyphenAndLower);
}
