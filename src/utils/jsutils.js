export function convertToCamelCase(name) {
  const words = name.split(" ");
  let convertedName = "";
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    convertedName = convertedName + " " +words[i]
  }
  return convertedName;
}
