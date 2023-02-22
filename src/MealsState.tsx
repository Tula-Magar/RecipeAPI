import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Meal } from './Meal';

export interface MealsState {
  meals: Meal[];
}

const initialState: MealsState = {
  meals: []
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload.meals;
    }
  }
});

export const { setMeals } = mealsSlice.actions;

const store = configureStore({
  reducer: mealsSlice.reducer
});

export default store;

 