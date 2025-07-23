import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Hello world!</Text>
        <Link href="/modal">Open modal</Link>
      </View>
    </SafeAreaView>
  );
}
