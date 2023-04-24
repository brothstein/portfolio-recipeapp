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
      instructions: ['1. Cook pasta according to package instructions and drain.', 
      '2. In a separate pan, heat olive oil over medium heat and add minced garlic.',
      '3. Add tomato sauce and simmer for a few minutes.',
      '4. Toss cooked pasta with the tomato sauce and sprinkle grated Parmesan cheese on top.'],
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
      instructions: ['1. Heat oil in a pan and cook diced onion.',
        '2. Add minced garlic and curry powder and cook for another minute.',
        '3. Add diced chicken and cook until browned.'],
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
      instructions: ['1. Grill chicken until cooked through.',
        '2. Toss chopped Romaine lettuce with Caesar dressing.',
        '3. Top with chicken, croutons, and grated Parmesan cheese.'],
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
      instructions: ['1. Cook ground beef in a pan and add taco seasoning.',
        '2. Chop Romaine lettuce and dice tomato.',
        '3. Fill taco shells with beef, lettuce, tomato, shredded cheese, and sour cream.'],
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
      instructions: ['1. Chop apples, oranges, bananas, strawberries, and blueberries.',
        '2. Mix in honey and lemon juice.'],
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
      instructions: ['1. Mix flour, baking powder, salt, and sugar in a bowl.',
        '2. Add milk, egg, and melted butter and stir until smooth.',
        '3. Stir in blueberries.',
        '4. Cook pancakes on a griddle until golden brown.'],
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
      instructions: ['1. Cook diced chicken in a pot.',
        '2. Add diced carrots, celery, onion, and garlic and cook until tender.',
        '3. Add chicken broth and egg noodles and simmer until noodles are cooked.'],
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
      instructions: ['1. Beat eggs and milk in a bowl.',
        '2. Heat oil in a pan and add chopped bell pepper, onion, tomato, and mushrooms.',
        '3. Pour egg mixture over vegetables and sprinkle shredded cheese on top.',
        '4. Cook until set.'],
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
      instructions: ['1. Toast bread and slice avocado.',
        '2. Mash avocado with lemon juice, salt, and red pepper flakes.',
        '3. Spread avocado mixture on toast.'],
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
        "Olives",
        "Feta Cheese",
        "Greek Dressing",
      ],
      instructions: ['1. Chop Romaine lettuce, cucumber, tomato, and red onion.',
        '2. Add olives and Feta cheese.',
        '3. Toss with Greek dressing.'],
      mealType: "Lunch",
      saved: false,
    },
    {
      id: "11",
      title: "Oatmeal with Berries and Nuts",
      ingredients: ["Oats", "Milk", "Honey", "Berries", "Walnuts", "Cinnamon"],
      instructions: ['1. Cook oats and milk in a pot.',
        '2. Stir in honey, berries, and chopped walnuts.',
        '3. Sprinkle cinnamon on top.'],
      mealType: "Breakfast",
      saved: false,
    },
    {
      id: "12",
      title: "Apple Slices with Peanut Butter",
      ingredients: ["Apples", "Peanut Butter"],
      instructions: ['1. Slice apples and spread peanut butter on top.'],
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
