import NoImageAvailable from "@/assets/images/no_image.png";

export function removeHtmlTags(htmlString: string): string {
  const regex = /<.*?>/g;
  return htmlString.replace(regex, "");
}

export function renderImage(
  image: { original: string; medium: string } | null | undefined,
) {
  return image?.original
    ? { uri: image.original }
    : image?.medium
      ? { uri: image.medium }
      : NoImageAvailable;
}
