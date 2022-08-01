const img = document.querySelector("img");

fetch(
  "https://api.spoonacular.com/recipes/complexSearch?cuisine=spanish&apiKey=acb2b9694ef64c6eafeff89a7dcf716f"
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res.results[1]);
    img.src = res.results[1].image;
  });

fetch(
  "https://api.spoonacular.com/recipes/662294/information?includeNutrition=false&apiKey=acb2b9694ef64c6eafeff89a7dcf716f"
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
