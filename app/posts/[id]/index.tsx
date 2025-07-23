import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
};

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    async function getPost() {
      const response = await fetch(
        `https://dummyjson.com/posts/${id}?delay=5000`
      );
      const data: Post = await response.json();
      setPost(data);
    }
    getPost();
  }, [id]);

  return (
    <View>
      {!post ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text className="text-2xl font-bold">{post.title}</Text>
          <Text>{post.body}</Text>
        </>
      )}
    </View>
  );
}
