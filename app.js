const img = document.querySelector("img");

fetch(
  "https://api.spoonacular.com/recipes/complexSearch?cuisine=spanish&apiKey=acb2b9694ef64c6eafeff89a7dcf716f"
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res.results[2]);
    img.src = res.results[2].image;
  });
fetch(
  "https://api.spoonacular.com/recipes/1095806/information?includeNutrition=false&apiKey=acb2b9694ef64c6eafeff89a7dcf716f"
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });
