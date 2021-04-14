var cdbKey ='1';
var cname;

//var cByName =`search.php?s=${cname}`;
//var cDBcriteria = cByName;

var food;
//ingredients will be stored in an array.
var fIngredients=[];

var spoonKey = "4d74df0d2f4a433e9df53519bb28d05a";
var recipes='complexSearch';
var fCriteria = recipes;
var cocktail;
var CTIngredients=[];

async function searchRecipes(name) {
    
    var spoonUrl = `https://api.spoonacular.com/recipes/${fCriteria}?apiKey=${spoonKey}&query=${name}`;

    console.log(spoonUrl);

    fetch(spoonUrl)
    
        .then(function (response){

            if(response.ok){
                
                //food = response.json();            

                response.json().then(function(data){

                    //food = data;

                    console.log(data);

                    var foodList = data.results;

                    //console.log(food.results);
                    console.log(foodList);

                    console.log(foodList[0].id);

                    return foodList;

                    getIngredients(foodList[0].id);

                });


            }else {

                //return error
            }

        })
    
    
}
// get ingredients by id
async function getIngredients(id) {
    
    var url = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${spoonKey}`;
    //
    console.log(url);

    fetch(url)

        .then(function(response){
            if(response.ok){

                //ingre = response.json();

                response.json().then(function(data){

                   // ingre = data;

                    console.log(data);

                    var ingreList = data.ingredients;

                    for(var i=0; i<ingreList.length; i++){

                        fIngredients.push(ingreList[i].name);

                    }

                    console.log(fIngredients);

                })

            }else{
                //return error
            }
        })
    
}
//search cocktails by name
async function searchCocktail(name) {

    var ThecocktailDBUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

    fetch(ThecocktailDBUrl)
        .then(function(response){

            if(response.ok){
                //cocktail = response.json();

                response.json().then(function(data){

                    //cocktail = data;

                    console.log(data);

                    var list = data.drinks[0];

                    //while ( )


                })
            } else {

                //return error
            }
        });

}

async function getCTingredient(cTname) {


}

function displayReceipeOpt(){

    
}

searchRecipes('spaghetti');
searchCocktail('Screwdriver');