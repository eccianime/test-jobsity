import NoImageAvailable from "@/assets/images/no_image.png";

export function removeHtmlTags(htmlString: string): string {
  const regex = /<.*?>/g;
  return htmlString.replace(regex, "");
}

export function renderImage(
  image: { original: string; medium: string } | null | undefined,
) {
  const checkOriginal = image?.original ? { uri: image.original } : null;
  const checkMedium = image?.medium ? { uri: image.medium } : NoImageAvailable;
  return checkOriginal || checkMedium;
}
