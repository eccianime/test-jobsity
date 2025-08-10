export const Image = ({ source, ...props }: any) => {
  const { Image } = jest.requireActual("expo-image");
  const MockedImage = () => <Image source={source} {...props} />;
  MockedImage.displayName = "mock-image";
  return <MockedImage source={source} {...props} />;
};

export default {
  Image,
};
