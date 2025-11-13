export function checkHeading(str) {
  return /^(\*\*|.*\*)$/.test(str);
}

// export function replaceHeadingStarts(str) {     
//     return str.replace(/^(\*)(\*)|(\*)$/g,'')
// }

export function replaceHeadingStarts(str) {
   if (typeof str !== "string") return str;
  return str
    .replace(/^\*+/, "")  // remove all leading *
    .replace(/\*+$/, "")  // remove all trailing *
    .trim();
}
