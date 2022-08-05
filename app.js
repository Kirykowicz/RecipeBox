document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector("img");
  const ingredients = document.querySelector("#ingredients");
  const recipe = document.querySelector("#recipe");
  const recipeTitle = document.querySelector("#recipe-title");
  const savedList = document.querySelector("#saved-recipes");
  const listOfSearchResults = document.querySelector("#search-results-list");
  const form = document.querySelector("form");
  const input = document.querySelector("#search-input");
  img.src = defaultImage;
  ingredients.textContent = defaultIngredient;
  recipe.textContent = defaultRecipe;
  recipeTitle.textContent = defaultTitle;

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
    if (dishes.length == 0) {
      let emptySearch = document.createElement('div')
      emptySearch.textContent = 'Sorry! We don\'t have any recipes for that cuisine style!'
      emptySearch.className = 'emptySearch'
      listOfSearchResults.append(emptySearch)
    }
    dishes.forEach((dish) => {
      let newLi = document.createElement("div");
      newLi.addEventListener("click", () => renderDishInfoFromResults(dish));
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
        recipe.innerHTML = res.instructions;
        recipeTitle.textContent = res.title;
        img.src = res.image;
      });
  }

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
          let li = document.createElement("div");
          let btn = document.createElement("button");
          li.textContent = recipe.title;
          btn.textContent = "X";
          li.append(btn);
          btn.addEventListener("click", () => removeRecipe(recipe));
          li.addEventListener("click", () => renderSavedDish(recipe.id));
          savedList.append(li);
          savedList.append(btn);
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

  img.addEventListener("mouseover", () => {
    img.style.width = "500px";
  });
  img.addEventListener("mouseout", () => {
    img.style.width = "300px";
  });
});
