const loadMeals = (search) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.meals){
        displayMeals(data.meals)
      }
      else{
        return
      }
    })
}

const displayMeals = meals =>{

    const mealsContainer = document.getElementById("meal-container")
    mealsContainer.innerHTML = ``;
    meals.forEach(meal => {
        // console.log(meal);
      const mealDiv = document.createElement("div") 
      mealDiv.classList.add("col")
      mealDiv.innerHTML = `
      <div onclick ="loadMealDetail(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
      `;
      mealsContainer.appendChild(mealDiv);
    });
    }


function searchFood  () {
  // console.log("button clicked")
    const searchField = document.getElementById("search-field")
    const searchText = searchField.value
    console.log(searchText);
    loadMeals(searchText)
    searchField.value = "";
}

const loadMealDetail = (idMeal) =>{
// console.log("Get detail of id", idMeal);
const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
console.log(url);

fetch(url)
.then(res => res.json())
.then(data => displayMealDetail(data.meals[0]))

}


const displayMealDetail = (meal) =>{
const detailContainer = document.getElementById("detail-container")
detailContainer.innerHTML = ``;
const mealDiv = document.createElement("div")
mealDiv.classList.add("card");
mealDiv.innerHTML = `
<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="https://www.themealdb.com/" target="_blank" class="btn btn-primary">See Detail</a>
            </div>
`;

detailContainer.appendChild(mealDiv);

window.scrollTo(0,0);

}

loadMeals("");