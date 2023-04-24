import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity ,Text } from "react-native";
import RecipeCard from "./RecipeCardComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedRecipesScreen = ({ navigation }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("savedRecipes").then((savedRecipes) => {
      if (savedRecipes !== null) {
        savedRecipes = JSON.parse(savedRecipes);
        setSavedRecipes(savedRecipes);
      }
    });
  }, []);

  const handleRemoveRecipe = (recipe) => {
    AsyncStorage.getItem("savedRecipes").then((savedRecipes) => {
      if (savedRecipes !== null) {
        savedRecipes = JSON.parse(savedRecipes);
        const newSavedRecipes = savedRecipes.filter((r) => r.title !== recipe.title);
        AsyncStorage.setItem("savedRecipes", JSON.stringify(newSavedRecipes)).then(
          () => {
            setSavedRecipes(newSavedRecipes);
          }
        );
      }
    });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Saved Recipes</Text>
      {savedRecipes.map((recipe, index) => (
        <View style={styles.cardsContainer}>
          <RecipeCard
            key={index}
            onPress={() =>
              navigation.navigate("RecipeDetails", { recipe: item })
            }
            recipe={recipe}
          />
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveRecipe(recipe)}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a3b18a",
  },
  heading: {
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      fontSize: 'xx-large',
      alignContent: 'center',
      fontWeight: "bold",
      backgroundColor: "#588157",
    },
    cardsContainer: {
      backgroundColor: "#dad7cd",
      borderRadius: 8,
      padding: 16,
      margin: 16,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
    },
    removeButtonText: {
      color: 'red',
      fontWeight: 'bold',
    }
});

export default SavedRecipesScreen;
