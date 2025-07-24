import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
};

export default function PostsScreen() {
  const { theme } = useTheme();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();

  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function getPosts(): Promise<void> {
      try {
        setIsLoading(true);
        const response = await fetch("https://dummyjson.com/posts?delay=1000");
        const data: { posts: Post[] } = await response.json();
        setPosts(data.posts);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }
    getPosts();
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <ThemedText
          className="text-2xl"
          style={{ color: theme.primaryText }}
          fontWeight="bold"
        >
          Posts
        </ThemedText>
        <TouchableOpacity
          className="flex-row justify-between"
          onPress={() => signOut}
        >
          <ThemedText>Sign Out</ThemedText>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ThemedText>Loading...</ThemedText>
      ) : errorMessage ? (
        <ThemedText>{errorMessage}</ThemedText>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 10, // bottom safe area + tab height
          }}
        >
          <View className="flex-col items-center gap-y-5">
            {posts.map((post) => (
              <TouchableOpacity
                className="bg-slate-50 border rounded-2xl p-5"
                key={post.id}
                onPress={() => router.push(`/posts/${post.id}`)}
              >
                <ThemedText
                  className="mb-3"
                  fontWeight="bold"
                  style={{ fontSize: 19 }}
                >
                  {post.title}
                </ThemedText>
                <ThemedText className="mb-3" style={{ fontSize: 15 }}>
                  {post.body}
                </ThemedText>
                <View className="flex-row gap-x-4">
                  {post.tags.map((tag) => (
                    <ThemedText
                      className="bg-slate-300 px-3 py-1 rounded-2xl"
                      key={tag}
                      style={{ fontSize: 15 }}
                    >
                      {tag}
                    </ThemedText>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
