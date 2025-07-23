import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, _setIsPasswordVisible] = useState<boolean>(false);

  function handleForm() {
    Alert.alert("Submit form");
  }

  return (
    <SafeAreaView className="px-4">
      {/* Header */}
      <View>
        <ThemedText className="text-2xl mb-5" fontWeight="bold">
          Simple Form (Controlled Password)
        </ThemedText>
      </View>

      {/* Form */}
      <View className="gap-y-4">
        <TextInput
          className="border rounded-md"
          value={email}
          placeholder="Input your email here"
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          className="border rounded-md"
          value={password}
          placeholder="Input your password here"
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={handleForm}
          className="bg-[#F7BE38] rounded-lg py-2.5"
        >
          <Text className="text-gray-800 font-medium text-sm text-center">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
