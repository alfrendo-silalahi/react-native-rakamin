import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export interface Project {
  id: number;
  title: string;
  description: string;
  iconColor: string;
  status: "Active" | "In Progress" | "Completed" | "Pending";
}

export interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "Active":
        return "checkmark-circle";
      case "In Progress":
        return "timer";
      default:
        return "alert-circle";
    }
  };

  return (
    <View
      className="bg-gray-800 rounded-md p-4 flex-row items-center space-x-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      {/* Icon */}
      <View
        className={"w-10 h-10 rounded-full items-center justify-center"}
        // style={["bg-" + project.iconColor]}
      >
        <Ionicons name="logo-react" size={24} color="white" />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="text-base font-bold">{project.title}</Text>
        <Text className="text-sm text-gray-400">{project.description}</Text>
      </View>

      {/* Status Indicator */}
      <View
        className="w-4 h-4 rounded-full bg-green-500"
        style={{ opacity: project.status === "Active" ? 1 : 0.5 }}
      >
        <Ionicons
          name={getStatusIcon(project.status)}
          size={16}
          color="white"
          className="absolute inset-0 m-auto"
        />
      </View>
    </View>
  );
};

export default ProjectCard;
