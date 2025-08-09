export function removeHtmlTags(htmlString: string): string {
  const regex = /<.*?>/g;
  return htmlString.replace(regex, "");
}
