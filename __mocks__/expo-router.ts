export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
}));

export const router = {
  replace: jest.fn(),
  back: jest.fn(),
  push: jest.fn(),
};

export const usePathname = jest.fn();
export const useSearchParams = jest.fn(() => ({}));
export const useLocalSearchParams = jest.fn(() => ({ id: "1" }));

export const Link = jest.fn(({ children }) => children);

export const Tabs = jest.fn(() => null);
export const useContextKey = jest.fn();

export const useFocusEffect = (cb: any) => cb();

export default {
  useFocusEffect,
  Tabs,
  useContextKey,
  router,
  useRouter,
  useSearchParams,
  useLocalSearchParams,
  Link,
};
