import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./components/HomeScreen";
import SavedRecipesScreen from "./components/SavedRecipesScreen";
import RecipeDetailsScreen from "./components/RecipeDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

const SavedRecipesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Saved Recipes"
        component={SavedRecipesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailsScreen}
        options={{ title: "" }}
        screenOptions={{
          tabBarStyle: {backgroundColor: '#588157'},
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Saved Recipes") {
              iconName = focused ? "save" : "save-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#3a5a40",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { display: "flex", backgroundColor: "#fefae0" },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Saved Recipes"
          component={SavedRecipesStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
