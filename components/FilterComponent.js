import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  CheckBox,
  Picker,
  TouchableOpacity,
} from "react-native";

const FilterComponent = ({ onFilter }) => {
  const [mealType, setMealType] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const handleFilter = () => {
    onFilter(mealType, ingredients);
  };

  const handleIngredient = (ingredient) => {
    const index = ingredients.indexOf(ingredient);
    if (index > -1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    } else {
      setIngredients([...ingredients, ingredient]);
    }
  };

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const ingredientList = [
    "Chicken",
    "Garlic",
    "Tomato",
    "Apples",
    "Romaine Lettuce",
    "Parmesan Cheese",
    "Onion",
    "Milk",
    "Salt",
  ];

  return (
    <View style={styles.filterRow}>
      <View style={styles.filter}>
        <Text style={styles.label}>Meal Type:</Text>
        <View>
          <Picker
            selectedValue={mealType}
            onValueChange={(value) => setMealType(value)}
            style={styles.dropdown}
          >
            <Picker.Item label="Select..." value={null} />
            {mealTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.filter}>
        <Text style={styles.label}>Ingredients:</Text>
        <View>
          <Picker
            selectedValue={null}
            onValueChange={(value) => handleIngredient(value)}
            style={styles.dropdown}
          >
            <Picker.Item label="Select..." value={null} />
            {ingredientList.map((ingredient) => (
              <Picker.Item
                key={ingredient}
                label={ingredient}
                value={ingredient}
              />
            ))}
          </Picker>
          <View style={styles.checkboxes}>
            {ingredients.map((ingredient) => (
              <View
                key={ingredient}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <CheckBox
                  value={true}
                  onValueChange={() => handleIngredient(ingredient)}
                  style={styles.checkbox}
                />
                <Text>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleFilter} style={styles.button}>
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  dropdown: {
    height: 30,
  },
  checkboxes: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  checkbox: {
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#344e41",
    padding: 8,
    borderRadius: 3,
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filter: {
    flex: 1,
    marginRight: 10,
  },
});

export default FilterComponent;
