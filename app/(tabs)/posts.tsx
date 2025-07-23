import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostsScreen() {
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts(): Promise<void> {
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      setPosts(data.posts);
    }
    getPosts();
  });

  return (
    <SafeAreaView className="px-4">
      {/* Header */}
      <View>
        <ThemedText className="text-2xl mb-5" fontWeight="bold">
          Posts
        </ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-col items-center gap-y-5">
          {posts.map((post) => (
            <TouchableOpacity
              className="bg-slate-50 border rounded-2xl p-5"
              key={post.id}
              onPress={() => router.push(`/posts/${post.id}`)}
            >
              <ThemedText fontWeight="bold" style={{ fontSize: 19 }}>
                {post.title}
              </ThemedText>
              <ThemedText style={{ fontSize: 15 }}>{post.body}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
