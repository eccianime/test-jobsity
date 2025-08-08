import colors from "@/config/colors";
import { ShowTabsProps } from "@/types/components";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function ShowTabs({
  tabs,
  currentTab,
  changeTab,
}: ShowTabsProps) {
  return (
    <View>
      <View className="flex-row">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.name}
            onPress={() => changeTab(index)}
            className={`w-1/2 flex-row items-center justify-center gap-2 rounded-t-2xl p-4 ${currentTab === index ? "bg-white" : ""}`}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={
                currentTab === index
                  ? colors.primary.default
                  : colors.secondary.dark
              }
            />
            <Text
              className={`text-xl ${currentTab === index ? "bg-white font-open-bold text-primary-default" : "font-open-regular text-secondary-dark"}`}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {tabs[currentTab].content}
    </View>
  );
}
