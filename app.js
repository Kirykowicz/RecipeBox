const img = document.querySelector("img");
const ingredients = document.querySelector("#ingredients");
const recipe = document.querySelector("#recipe");
const recipeTitle = document.querySelector("#recipe-title");
img.src = defaultImage;

let searchResultsArray = [];
let searchResultsId = [];
const listOfSearchResults = document.querySelector("#search-results");

const form = document.querySelector("form");
form.addEventListener("submit", renderList);

function renderList(e) {
  e.preventDefault();
  let input = document.querySelector("#search-input");
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?cuisine=${input.value}&apiKey=acb2b9694ef64c6eafeff89a7dcf716f`
  )
    .then((res) => res.json())
    .then((dishes) => {
      //   console.log(dishes.results);
      searchResultsArray = dishes.results;
      renderDishes(dishes.results);
    });
}

function renderDishes(dishes) {
  dishes.forEach((dish) => {
    searchResultsId.push(dish.id);
    let newLi = document.createElement("li");
    let newButton = document.createElement("button");
    newLi.addEventListener("click", () => renderDishInfoFromResults(dish));
    newButton.textContent = "ADD TO FAVORITES";
    newLi.textContent = dish.title;
    newLi.appendChild(newButton);
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
      recipe.textContent = res.instructions;
      recipeTitle.textContent = res.title;
    });
}

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
