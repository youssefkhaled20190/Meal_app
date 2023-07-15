function Show_pup(){
    document.getElementById('pup').classList.add('open')
}
function Hide_pup(){
    document.getElementById('pup').classList.remove('open')
}

// featching api 

const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");

searchBtn.addEventListener('click', GetMealList);
mealList.addEventListener('click' , GetmealRecipe);



// featching all meal list
 function GetMealList(){
    let searchInputtxt = document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputtxt}`)
    .then(response => response.json())
    .then(data =>{
        let html ="";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                <div class = "meal-img">
                    <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${meal.strMeal}</h3>
                    <a href = "#" class = "recipe-btn" onclick="Show_pup()">Get Recipe</a>
                </div>
            </div>
                `;    
            });
            mealList.classList.remove('not-found');
        }else{
            html = `
            <div class="not-found">
                <ul>
                    <li><img src="./images/515dfe825621f378960d17828de03546-removebg-preview.png"></li>
                    <li>Hey iam remy , i found nothing please enter a correct ingrident to help you found recipeies</li>
                </ul>
        
            </div>
            
            `;
            mealList.classList.add('not-found');
        }
        mealList.innerHTML = html;
    });
 }

 function GetmealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data =>mealRecipeModal(data.meals));
    }
 }

 function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
