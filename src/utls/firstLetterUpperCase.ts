export default function makeFirstLetterUpperCase(text: string) {
  const modStr = text[0].toUpperCase() + text.slice(1);
  return modStr;
}
