var cdbKey ='1';
var cname;
var cByName =`search.php?s=${cname}`;
var cDBcriteria = cByName;
var food;
//ingredients will be stored in an array.
var fIngredients;

var spoonKey = "4d74df0d2f4a433e9df53519bb28d05a";
var recipes='complexSearch';
var fCriteria = recipes;
var cocktail;
var CTIngredients;

async function searchRecipes(name) {
    
    var spoonUrl = `https://api.spoonacular.com/recipes/${fCriteria}?apiKey=${spoonKey}&query=${name}`;

    console.log(spoonUrl);

    fetch(spoonUrl)
        .then(function (response){

            if(response.ok){
                
                food = response.json();
            

                food.then(function(data){

                    console.log(food);
                });


            }else {

                //return error
            }

        })
    
    
}

async function getIngredients() {
    
    
}

async function searchCoktail(name) {
    
    var ThecocktailDBUrl = `https://www.thecocktaildb.com/api/json/v1/1/${cDBcriteria}`;

}

async function getCTingredient(cTname) {


}

searchRecipes('pasta');