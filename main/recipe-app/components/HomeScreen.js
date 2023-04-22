import React, { useState, useEffect, Component } from "react";
import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RecipeCard from "./RecipeCardComponent";
import FilterComponent from "./FilterComponent";
import SearchComponent from "./SearchComponent";

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([
    {
      id: "1",
      title: "Pasta with Tomato Sauce",
      ingredients: [
        "Pasta",
        "Tomato Sauce",
        "Garlic",
        "Olive Oil",
        "Parmesan Cheese",
      ],
      mealType: "Dinner",
      saved: false,
    },
    {
      id: "2",
      title: "Chicken Curry",
      ingredients: [
        "Chicken",
        "Curry Powder",
        "Coconut Milk",
        "Onion",
        "Garlic",
      ],
      mealType: "Dinner",
      saved: false,
    },
    {
      id: "3",
      title: "Grilled Chicken Caesar Salad",
      ingredients: [
        "Chicken",
        "Romaine Lettuce",
        "Croutons",
        "Parmesan Cheese",
        "Caesar Dressing",
      ],
      mealType: "Lunch",
      saved: false,
    },
    {
      id: "4",
      title: "Beef Tacos",
      ingredients: [
        "Ground Beef",
        "Taco Seasoning",
        "Taco Shells",
        "Romaine Lettuce",
        "Tomato",
        "Shredded Cheese",
        "Sour Cream",
      ],
      mealType: "Dinner",
      saved: false,
    },
    {
      id: "5",
      title: "Fruit Salad",
      ingredients: [
        "Apples",
        "Oranges",
        "Bananas",
        "Strawberries",
        "Blueberries",
        "Honey",
        "Lemon Juice",
      ],
      mealType: "Snack",
      saved: false,
    },
    {
      id: "6",
      title: "Blueberry Pancakes",
      ingredients: [
        "Flour",
        "Baking Powder",
        "Salt",
        "Sugar",
        "Milk",
        "Egg",
        "Butter",
        "Blueberries",
      ],
      mealType: "Breakfast",
      saved: false,
    },
    {
      id: "7",
      title: "Chicken and Vegetable Soup",
      ingredients: [
        "Chicken",
        "Carrots",
        "Celery",
        "Onion",
        "Garlic",
        "Chicken Broth",
        "Egg Noodles",
      ],
      mealType: "Lunch",
      saved: false,
    },
    {
      id: "8",
      title: "Veggie Omelette",
      ingredients: [
        "Eggs",
        "Milk",
        "Bell Pepper",
        "Onion",
        "Tomato",
        "Mushrooms",
        "Shredded Cheese",
      ],
      mealType: "Breakfast",
      saved: false,
    },
    {
      id: "9",
      title: "Avocado Toast",
      ingredients: [
        "Sliced Bread",
        "Avocado",
        "Lemon Juice",
        "Salt",
        "Red Pepper Flakes",
      ],
      mealType: "Snack",
      saved: false,
    },
    {
      id: "10",
      title: "Greek Salad",
      ingredients: [
        "Romaine Lettuce",
        "Cucumber",
        "Tomato",
        "Red Onion",
        "Kalamata Olives",
        "Feta Cheese",
        "Greek Dressing",
      ],
      mealType: "Lunch",
      saved: false,
    },
    {
      id: "11",
      title: "Oatmeal with Berries and Nuts",
      ingredients: ["Oats", "Milk", "Honey", "Berries", "Walnuts", "Cinnamon"],
      mealType: "Breakfast",
      saved: false,
    },
    {
      id: "12",
      title: "Apple Slices with Peanut Butter",
      ingredients: ["Apples", "Peanut Butter"],
      mealType: "Snack",
      saved: false,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem("@saved_recipes");
        if (storedRecipes !== null) {
          setRecipes(JSON.parse(storedRecipes));
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getRecipes();
  }, []);
  useEffect(() => {
    setFilteredRecipeList(recipes);
  }, [recipes]);

  const handleFilter = (mealType, ingredients) => {
    let filteredRecipes = recipes;
    if (mealType) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.mealType === mealType
      );
    }
    if (ingredients && ingredients.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        ingredients.every((ingredient) =>
          recipe.ingredients.some(
            (recipeIngredient) =>
              recipeIngredient.toLowerCase() === ingredient.toLowerCase()
          )
        )
      );
    }
    setFilteredRecipeList(filteredRecipes);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredRecipes =
      query === ""
        ? JSON.parse(JSON.stringify(recipes))
        : recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(query.toLowerCase())
          );
    setFilteredRecipeList(filteredRecipes);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardsContainer}>
      <RecipeCard
        recipe={item}
        onPress={() => navigation.navigate("RecipeDetails", { recipe: item })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterSearchContainer}>
        <FilterComponent onFilter={handleFilter} />
        <SearchComponent onSearch={handleSearch} searchQuery={searchQuery} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredRecipeList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<ActivityIndicator size="large" />}
          initialNumToRender={recipes.length}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a3b18a",
  },
  filterSearchContainer: {
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#588157",
  },
  cardsContainer: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    flex: 2,
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
});

export default HomeScreen;
