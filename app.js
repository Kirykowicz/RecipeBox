const img = document.querySelector("img");
const ingredients = document.querySelector("#ingredients");
const recipe = document.querySelector("#recipe");
const recipeTitle = document.querySelector("#recipe-title");
const savedList = document.querySelector("#saved-recipes");
const listOfSearchResults = document.querySelector("#search-results-list");
const form = document.querySelector("form");
const input = document.querySelector("#search-input");

form.addEventListener("submit", getDishes);

function getDishes(e) {
  e.preventDefault();
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?cuisine=${input.value}&apiKey=acb2b9694ef64c6eafeff89a7dcf716f`
  )
    .then((res) => res.json())
    .then((dishes) => {
      renderDishes(dishes.results);
    });
}

function renderDishes(dishes) {
  listOfSearchResults.innerHTML = "";
  dishes.forEach((dish) => {
    let newLi = document.createElement("li");
    newLi.addEventListener("click", () => renderDishInfoFromResults(dish));
    let newButton = document.createElement("button");
    newButton.textContent = "☆";
    newLi.textContent = dish.title;
    listOfSearchResults.append(newLi);
  });
}

function renderDishInfoFromResults(dish) {
  img.src = dish.image;

  fetch(
    `https://api.spoonacular.com/recipes/${dish.id}/information?includeNutrition=false&apiKey=acb2b9694ef64c6eafeff89a7dcf716f`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let list = [];
      res.extendedIngredients.forEach((ingredient) =>
        list.push(ingredient.name)
      );
      ingredients.textContent = list.join(", ");
      recipe.innerHTML = res.instructions;
      recipeTitle.textContent = res.title;
      let saveButton = document.createElement("button");
      saveButton.textContent = "SAVE RECIPE FOR LATER?";
      saveButton.addEventListener("click", () => saveRecipe(res));
      recipeTitle.append(saveButton);
    });
}
function renderSavedDish(id) {
  fetch(`http://localhost:3000/recipes/${id}`)
    .then((res) => res.json())
    .then((res) => {
      ingredients.textContent = res.ingredients;
      recipe.textContent = res.instructions;
      recipeTitle.textContent = res.title;
      img.src = res.image;
    });
}

renderSavedDish(1);

function saveRecipe(res) {
  let list = [];
  res.extendedIngredients.forEach((ingredient) => list.push(ingredient.name));
  let newObject = {
    title: res.title,
    image: res.image,
    ingredients: list.join(", "),
    instructions: res.instructions,
  };

  fetch(`http://localhost:3000/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObject),
  })
    .then((res) => res.json())
    .then(renderSavedRecipesList);
}

function renderSavedRecipesList() {
  fetch(`http://localhost:3000/recipes`)
    .then((res) => res.json())
    .then((res) => {
      savedList.innerHTML = "";
      res.forEach((recipe) => {
        console.log(recipe.title);
        let li = document.createElement("li");
        let btn = document.createElement("button");
        li.textContent = recipe.title;
        btn.textContent = "Remove from favorites";
        li.append(btn);
        btn.addEventListener("click", () => removeRecipe(recipe));
        li.addEventListener("click", () => renderSavedDish(recipe.id));
        savedList.append(li);
      });
    });
}

function removeRecipe(recipe) {
  fetch(`http://localhost:3000/recipes/${recipe.id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(renderSavedRecipesList);
}

renderSavedRecipesList();



// fetch(
//   "https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=acb2b9694ef64c6eafeff89a7dcf716f"
// )
//   .then((res) => res.json())
//   .then(console.log);

// fetch(
//   "https://api.spoonacular.com/recipes/640693/information?includeNutrition=false&apiKey=acb2b9694ef64c6eafeff89a7dcf716f"
// )
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//   });

// (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0:
// id: 715769
// image: "https://spoonacular.com/recipeImages/715769-312x231.jpg"
// imageType: "jpg"
// title: "Broccolini Quinoa Pilaf"
// [[Prototype]]: Object
// 1: {id: 715495, title: 'Turkey Tomato Cheese Pizza', image: 'https://spoonacular.com/recipeImages/715495-312x231.jpg', imageType: 'jpg'}
// 2: {id: 715573, title: 'Simple Skillet Lasagna', image: 'https://spoonacular.com/recipeImages/715573-312x231.jpg', imageType: 'jpg'}
// 3: {id: 659109, title: 'Salmon Quinoa Risotto', image: 'https://spoonacular.com/recipeImages/659109-312x231.jpg', imageType: 'jpg'}
// 4: {id: 648279, title: 'Italian Tuna Pasta', image: 'https://spoonacular.com/recipeImages/648279-312x231.jpg', imageType: 'jpg'}
// 5: {id: 648257, title: 'Italian Steamed Artichokes', image: 'https://spoonacular.com/recipeImages/648257-312x231.jpg', imageType: 'jpg'}
// 6: {id: 648247, title: 'Italian Seafood Stew', image: 'https://spoonacular.com/recipeImages/648247-312x231.jpg', imageType: 'jpg'}
// 7: {id: 640819, title: 'Crispy Italian Cauliflower Poppers Appetizer', image: 'https://spoonacular.com/recipeImages/640819-312x231.jpg', imageType: 'jpg'}
// 8: {id: 1095745, title: 'Mushroom Hummus Crostini', image: 'https://spoonacular.com/recipeImages/1095745-312x231.jpg', imageType: 'jpg'}
// 9: {id: 658753, title: 'Roma Tomato Bruschetta', image: 'https://spoonacular.com/recipeImages/658753-312x231.jpg', imageType: 'jpg'}
// length: 10
// [[Prototype]]: Array(0)
