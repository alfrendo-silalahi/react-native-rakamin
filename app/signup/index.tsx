import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { useState } from "react";
import { Button, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpScreen() {
  console.log("render sign up screen");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signUp, signUpMessage, isLoading, error, setSignUpMessage } =
    useAuth();
  return (
    <SafeAreaView className="px-4">
      {/* Header */}
      <View className="mb-5 flex-row justify-between items-center">
        <ThemedText className="text-2xl" fontWeight="bold">
          Sign Up {isLoading && "Loading..."}
        </ThemedText>
        <TouchableOpacity
          onPress={() => {
            router.replace("/signin");
            setSignUpMessage(null);
          }}
        >
          <ThemedText>Sign In</ThemedText>
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
      <View className="mb-5">
        <Button
          title="Sign Up"
          onPress={() => {
            signUp(username, password);
          }}
        />
      </View>
      <View>
        {error && (
          <View>
            <ThemedText>{error}</ThemedText>
          </View>
        )}
      </View>
      <View>{signUpMessage && <ThemedText>{signUpMessage}</ThemedText>}</View>
    </SafeAreaView>
  );
}
