import { Project } from "@/components/portfolio/ProjectCard";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function PortfolioScreen() {
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<string>("Projects"); // Default tab

  const tabs: string[] = ["Projects", "About", "Skills"];

  const projects: Project[] = [
    {
      id: 1,
      title: "React Native App",
      description:
        "A cross-platform mobile application built using React Native, focusing on delivering seamless user experiences on both iOS and Android. Includes real-time features, offline support, and modern UI components.",
      iconColor: "#007AFF", // Blue
      status: "Active",
    },
    {
      id: 2,
      title: "Design System",
      description:
        "A comprehensive UI/UX design system aimed at standardizing components, styles, and interaction patterns across multiple platforms. It enhances consistency, scalability, and development speed for the product team.",
      iconColor: "#8A2BE2", // Purple
      status: "In Progress",
    },
    {
      id: 3,
      title: "Performance Opt.",
      description:
        "Project focused on profiling, diagnosing, and resolving performance bottlenecks across web and mobile platforms. Key tasks include lazy loading, bundle size reduction, and improving time-to-interactive (TTI).",
      iconColor: "#2ECC71", // Green
      status: "Active",
    },
    {
      id: 4,
      title: "API Gateway",
      description:
        "Development of a centralized API gateway for routing, authentication, rate limiting, and caching. Improves service discoverability, security, and maintainability across microservices.",
      iconColor: "#FF8C00", // Dark Orange
      status: "Active",
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      description:
        "A web-based analytics dashboard providing real-time insights into user behavior, engagement metrics, and system performance. Built with React and integrated with Chart.js and custom REST APIs.",
      iconColor: "#1ABC9C", // Turquoise
      status: "In Progress",
    },
    {
      id: 6,
      title: "CI/CD Pipeline",
      description:
        "Automation of the build, test, and deployment pipeline using GitHub Actions and Docker. Ensures faster delivery and higher code quality through continuous integration and delivery.",
      iconColor: "#F39C12", // Yellow-Orange
      status: "Completed",
    },
    {
      id: 7,
      title: "Authentication Service",
      description:
        "Implementation of secure authentication mechanisms including JWT, OAuth2, and multi-factor authentication. Provides centralized identity management for all internal applications.",
      iconColor: "#E74C3C", // Red
      status: "Active",
    },
    {
      id: 8,
      title: "AI Chatbot",
      description:
        "An AI-powered chatbot integrated with NLP capabilities to automate customer support and provide intelligent responses in real-time. Built with Node.js and OpenAI's GPT API.",
      iconColor: "#9B59B6", // Amethyst
      status: "In Progress",
    },
    {
      id: 9,
      title: "Data Migration Tool",
      description:
        "A robust tool to automate data migration between legacy and modern systems. Supports data validation, transformation, and rollback for safe transitions.",
      iconColor: "#34495E", // Dark Blue Gray
      status: "Completed",
    },
    {
      id: 10,
      title: "E-commerce Backend",
      description:
        "Development of a scalable backend for an e-commerce platform, featuring product catalog management, payment integration, and order processing using Node.js and PostgreSQL.",
      iconColor: "#27AE60", // Green
      status: "Active",
    },
  ];

  return (
    <SafeAreaView className="px-4">
      {/* Header */}
      <View>
        <ThemedText className="text-2xl" fontWeight="bold">
          Portfolio
        </ThemedText>
      </View>

      {/* Navigation Tabs */}
      <View className="mt-4 mb-3 flex-row gap-x-6">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={activeTab === tab ? "pb-1 border-b-2" : ""}
          >
            <ThemedText>{tab}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Projects List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 30, // bottom safe area + tab height
        }}
      >
        <View className="items-center">
          {/* padding horizontal untuk spacing */}
          {projects.map((project: Project) => (
            <View
              key={project.id}
              className="bg-slate-50 p-5 w-full mb-3 rounded-2xl border"
            >
              {/* w-full + margin bottom */}
              <ThemedText fontWeight="bold" className="text-xl text-left">
                {project.title}
              </ThemedText>
              <ThemedText className="text-left">
                {project.description}
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
