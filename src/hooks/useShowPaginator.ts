import { useLazyGetShowsQuery } from "@/redux/services/shows";
import { ShowProps } from "@/types/schema";
import { useCallback, useEffect, useState } from "react";

export default function useShowPaginator() {
  const [apiPage, setApiPage] = useState(0);
  const [uiPage, setUiPage] = useState(1);
  const [dataCache, setDataCache] = useState<ShowProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [getShows] = useLazyGetShowsQuery();

  const loadMoreFromApi = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    const response = await getShows({ page: apiPage });

    setDataCache((prev) => [...prev, ...(response.data as ShowProps[])]);

    const responseToHasMore = await getShows({ page: apiPage + 1 });

    if (responseToHasMore?.data?.length === 0) {
      setHasMore(false);
    }

    setApiPage((prev) => prev + 1);
    setIsLoading(false);
  }, [hasMore, isLoading, apiPage, getShows]);

  const getCurrentPageData = useCallback((page: number) => {
    setUiPage(page);
  }, []);

  useEffect(() => {
    const start = (uiPage - 1) * 10;
    const end = start + 10;

    if (end > dataCache.length && hasMore && !isLoading) {
      loadMoreFromApi();
    }
  }, [uiPage, dataCache.length, hasMore, isLoading, loadMoreFromApi]);

  const getPaginationNumbers = useCallback(() => {
    if (uiPage === 1) {
      return [1, 2, 3];
    }
    const maxUiPage = Math.ceil(dataCache.length / 10);
    if (!hasMore && uiPage >= maxUiPage) {
      return [maxUiPage - 2, maxUiPage - 1, maxUiPage].filter((p) => p > 0);
    }
    return [uiPage - 1, uiPage, uiPage + 1];
  }, [uiPage, dataCache.length, hasMore]);

  const currentData = dataCache.slice((uiPage - 1) * 10, uiPage * 10);

  return {
    currentData,
    uiPage,
    goToPage: getCurrentPageData,
    paginationNumbers: getPaginationNumbers(),
    hasMore,
    isLoading,
  };
}
