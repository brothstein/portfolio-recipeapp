import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;
  const [isRecipeSaved, setIsRecipeSaved] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("savedRecipes").then((savedRecipes) => {
      if (savedRecipes !== null) {
        savedRecipes = JSON.parse(savedRecipes);
        setIsRecipeSaved(savedRecipes.some((r) => r.title === recipe.title));
      }
    });
  }, []);
  
  useEffect(() => {
    AsyncStorage.getItem("savedRecipes").then((savedRecipes) => {
      if (savedRecipes !== null) {
        savedRecipes = JSON.parse(savedRecipes);
        setIsRecipeSaved(savedRecipes.some((r) => r.title === recipe.title));
      } else {
        setIsRecipeSaved(false);
      }
    });
  }, [isRecipeSaved]);
  

  const handleSaveRecipe = () => {
    // add the recipe to the savedRecipes array
    AsyncStorage.getItem("savedRecipes").then((savedRecipes) => {
      if (savedRecipes !== null) {
        savedRecipes = JSON.parse(savedRecipes);
      } else {
        savedRecipes = [];
      }
      savedRecipes.push(recipe);
      AsyncStorage.setItem("savedRecipes", JSON.stringify(savedRecipes)).then(
        () => {
          setIsRecipeSaved(true);
        }
      );
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.recipeContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.subtitle}>Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index}>{ingredient}</Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={isRecipeSaved ? "Saved" : "Save Recipe"}
          onPress={handleSaveRecipe}
          disabled={isRecipeSaved}
          color={'#344e41'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a3b18a",
  },
  recipeContainer: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default RecipeDetailsScreen;
