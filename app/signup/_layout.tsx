import { Stack } from "expo-router";

export default function SignUpLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
