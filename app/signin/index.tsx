import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  console.log("render sign in screen");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn, isLoading, error, setError } = useAuth();

  return (
    <SafeAreaView className="px-4">
      {/* Header */}
      <View className="mb-5 flex-row justify-between items-center">
        <ThemedText className="text-2xl" fontWeight="bold">
          Sign In {isLoading && "Loading..."}
        </ThemedText>
        <TouchableOpacity
          onPress={() => {
            router.replace("/signup");
            setError(null);
          }}
        >
          <ThemedText>Sign Up</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Sign In Form */}
      <View>
        <TextInput
          className="border rounded-lg mb-3"
          onChangeText={setUsername}
          placeholder="Enter your username..."
        />
      </View>
      <View>
        <TextInput
          className="border rounded-lg mb-3"
          onChangeText={setPassword}
          placeholder="Enter your password..."
        />
      </View>
      <View>
        <Button title="Sign In" onPress={() => signIn(username, password)} />
      </View>
      {error && (
        <View>
          <ThemedText>{error}</ThemedText>
        </View>
      )}
    </SafeAreaView>
  );
}
