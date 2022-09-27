import { Recipe, RecipeTags, Tag, Review, Ingredient, RecipeIngredients } from "./models";
const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  Ingredient.sync({ alter: isDev });
};

export default dbInit;