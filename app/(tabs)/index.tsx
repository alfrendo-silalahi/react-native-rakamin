import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Button, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SavedSettings = {
  loginTime: string;
};

export default function HomeScreen() {
  const { theme } = useTheme();
  const { signOut } = useAuth();

  const saveSettings = async () => {
    const savedSettings: SavedSettings = {
      loginTime: new Date().toISOString(),
    };
    await AsyncStorage.setItem("SAVED_SETTINGS", JSON.stringify(savedSettings));
  };

  const getSettings = async () => {
    const savedSettings: string | null =
      await AsyncStorage.getItem("SAVED_SETTINGS");
    if (savedSettings) {
      const settings: SavedSettings = JSON.parse(savedSettings);
      Alert.alert(settings.loginTime);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 px-4"
      style={{ backgroundColor: theme.background }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <ThemedText
          className="text-2xl"
          style={{ color: theme.primaryText }}
          fontWeight="bold"
        >
          Async Storage
        </ThemedText>
        <TouchableOpacity
          className="flex-row justify-between"
          onPress={signOut}
        >
          <ThemedText>Sign Out</ThemedText>
        </TouchableOpacity>
      </View>

      <View>
        <View className="mb-3">
          <Button title="Save Settings" onPress={saveSettings} />
        </View>
        <View>
          <Button title="Get Settings" onPress={getSettings} />
        </View>
      </View>
    </SafeAreaView>
  );
}
