import { Stack } from "expo-router";

export default function PostDetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]/index"
        options={{
          title: `Post Detail`,
          headerShown: true,
        }}
      />
    </Stack>
  );
}
