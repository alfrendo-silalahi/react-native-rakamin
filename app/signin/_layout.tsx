import { Stack } from "expo-router";

export default function SignInLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sign In",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
