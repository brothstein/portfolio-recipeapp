import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeCard = ({ recipe }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Text style={styles.label}>{recipe.title}</Text>
        <Text>{recipe.mealType}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  }, 
})

export default RecipeCard;
