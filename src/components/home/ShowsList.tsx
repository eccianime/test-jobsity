import useShowPaginator from "@/hooks/useShowPaginator";
import { memo } from "react";
import { FlatList, View } from "react-native";
import LoadingScreen from "../LoadingScreen";
import ShowsListFooter from "./ShowsListFooter";
import ShowItem from "./ShowsListItem";

function ShowsList() {
  const {
    currentData,
    paginationNumbers,
    uiPage,
    hasMore,
    goToPage,
    isLoading,
  } = useShowPaginator();

  if (isLoading) return <LoadingScreen />;

  return (
    <View className="flex-1 p-4">
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="gap-4"
        data={currentData}
        removeClippedSubviews
        renderItem={({ item, index }) => <ShowItem data={item} index={index} />}
        ListFooterComponent={
          <ShowsListFooter
            currentPage={uiPage}
            isLastPage={!hasMore}
            paginationNumbers={paginationNumbers}
            handleChangePage={goToPage}
          />
        }
      />
    </View>
  );
}

export default memo(ShowsList);
