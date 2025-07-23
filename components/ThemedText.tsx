import { Text, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  fontWeight?: "regular" | "bold" | "italic";
}

export function ThemedText({ style, fontWeight, ...props }: CustomTextProps) {
  const fontFamily =
    fontWeight === "bold"
      ? "SpaceMonoBold"
      : fontWeight === "italic"
        ? "SpaceMonoItalic"
        : "SpaceMonoReguler";

  return <Text style={[style, { fontFamily }]} {...props} />;
}
