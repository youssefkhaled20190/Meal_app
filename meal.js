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
                    <a href = "#" onclick="Show_pup()">Get Recipe</a>
                </div>
            </div>
      
                `;    
            });

        }else{
            html = "Sorry, we didn't find any meal!";

        }
        mealList.innerHTML = html;



    });

 }