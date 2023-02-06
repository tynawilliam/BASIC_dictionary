import text from "./dictionary.txt";

export async function getWords() {
  const data = await fetch(text);
  const dataText = await data.text();
  const parse = dataText.split(/,\s*|\s+/);

  return parse;
}

export function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  let charCount = {};

  for (let i = 0; i < str1.length; i++) {
    charCount[str1[i]] = ++charCount[str1[i]] || 1;
  }

  for (let i = 0; i < str2.length; i++) {
    if (!charCount[str2[i]]) return false;
    charCount[str2[i]]--;
  }

  return true;
}
