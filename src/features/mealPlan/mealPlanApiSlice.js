import edamamApiSlice from "./../../app/api/edamamApiSlice"; 
import { createMealPlanQueryString } from "../../utils/recipeApiUtils";

const mealPlanApiSlice = edamamApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMealPlanRecipes: builder.query({
            query: ({ user, diets, allergies }) => {
                const { queryString, requestBodyJson } = createMealPlanQueryString(diets, allergies);

                return {
                    url: `/api/meal-planner/v1/${queryString}`,
                    method: "POST",
                    body: requestBodyJson,
                    headers: {
                        "accept": "application/json",
                        "Edamam-Account-User": user, 
                        "Authorization": "Basic YTAxODIyNmU6NTRiMDdkODVjYjgwYWU2M2E4NjhkZjYzOGE1NjgxYjk=",
                        "Content-Type": "application/json"
                    },
                    validateStatus: (response, result) => response.status === 200 && !result.isError
                };
            },
            providesTags: (result, error, { user }) => [
                { type: "MealPlan", id: user }
            ],
        }),
    })
});

export const { useGetMealPlanRecipesQuery } = mealPlanApiSlice;

export default mealPlanApiSlice;
