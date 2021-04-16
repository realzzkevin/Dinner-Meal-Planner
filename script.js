var cdbKey ='1';
var cname;

var food;
//ingredients will be stored in an array.
var fIngredients=[];

var spoonKey = "4d74df0d2f4a433e9df53519bb28d05a";
var recipes='complexSearch';
var fCriteria = recipes;
var cocktail;
var CTIngredients=[];

//search recipes by their name. return a list of recipes;
async function searchRecipes(name, dispId) {
    
    var spoonUrl = `https://api.spoonacular.com/recipes/${fCriteria}?apiKey=${spoonKey}&query=${name}&number=5`;

    console.log(spoonUrl);

    fetch(spoonUrl)
    
        .then(function (response){

            if(response.ok){

                response.json().then(function(data){

                    console.log(data);

                    // a list of recipeis
                    var foodList = data.results;

                    console.log(foodList);


                    showRecipetList(foodList, name, dispId);

                    return foodList;
                });


            }else {

                throw new Error(`HTTP Error! status: ${response.status}`);
                //return error
            }

        });
    
    
}
// get ingredients by id
async function getIngredients(id) {
    
    var url = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${spoonKey}`;
    //
    //console.log(url);

    fetch(url)

        .then(function(response){
            if(response.ok){

                response.json().then(function(data){

                   // ingre = data;

                    console.log(data);

                    var ingreList = data.ingredients;

                    for(var i=0; i<ingreList.length; i++){

                        fIngredients.push(ingreList[i].name +': '+ingreList[i].amount.us.value+' '+ingreList[i].amount.us.unit);

                    }

                    
                    console.log(fIngredients);

                    return fIngredients;
                })

            }else{
                //return error
                throw new Error(`HTTP Error! status: ${response.status}`);
            }
        })
    
}
//search cocktails by name
async function searchCocktail(name, dispId) {

    var ThecocktailDBUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;

    fetch(ThecocktailDBUrl)
        .then(function(response){

            if(response.ok){

                response.json().then(function(data){

                    console.log(data);

                    var list = data.drinks;

                    showCocktailList(list, name, dispId);

                })
            } else {

                //return error

                throw new Error(`HTTP Error! status: ${response.status}`);
            }
        });

}

// need find a way to make it work later.
function getCTingredient(cTname) {
    
    var i =1;

    var ingre =`strIngredient${i}`;

    while(cTname.ingre!=null){


    }

}

// take a list of recipets display them in a group of tab.
function showRecipetList(list, tabName, dispId){

    tabName = tabName.replaceAll('+', '_');
    console.log(list);
    
    var tabEl= $('<div>').attr('id', `${tabName}`);
    var ulEl = $('<ul>');
    tabEl.append(ulEl);
    
    for (var i=0; i<list.length; i++){

        var liEl = $('<li>');
        var aEl = $('<a>').attr('href', `#${tabName}-${(i+1)}`);
        aEl.text(list[i].title);
        liEl.append(aEl);
        ulEl.append(liEl);

        var subTabEl = $('<div>').attr('id',`${tabName}-${(i+1)}`);
        var pEl = $('<p>').text(list[i].title);
        var imgEl = $('<img>').attr('src', list[i].image);
        var btnEl =$('<button>').attr('id', list[i].id);
        btnEl.attr('name', `${tabName}`);

        btnEl.append(imgEl);
        subTabEl.append(pEl);
        subTabEl.append(btnEl);

        tabEl.append(subTabEl);
    }

    console.log(tabEl);
///////////////////////////////////////////
    //$('#sundaymeal').empty();
    //$('#sundaymeal').append(tabEl);
    $(`#${dispId}`).empty();
    $(`#${dispId}`).append(tabEl);
////////////////////////////////////////////   
    $(`#${tabName}`).tabs();
    
    $(`button[name='${tabName}']`).on('click', function(event){
    
        var recipetTab = $(this).parent();
        addRecipet(recipetTab);
    
    });
    
    
    return tabEl;    
}

function showCocktailList(list, tabName, dispId){

    tabName = tabName.replaceAll('+', '_');

    var tabEl= $('<div>').attr('id', `${tabName}`);
    var ulEl = $('<ul>');
    tabEl.append(ulEl);
    
    for (var i=0; i<list.length; i++){

        var liEl = $('<li>');
        var aEl = $('<a>').attr('href', `#${tabName}-${(i+1)}`);
        aEl.text(list[i].strDrink);
        liEl.append(aEl);
        ulEl.append(liEl);

        var subTabEl = $('<div>').attr('id',`${tabName}-${(i+1)}`);
        var pEl = $('<p>').text(list[i].strDrink);
        var imgEl = $('<img>').attr('src', list[i].strDrinkThumb);
        var btnEl =$('<button>').attr('id', list[i].idDrink);
        btnEl.attr('name',`${tabName}`);

        btnEl.append(imgEl);
        subTabEl.append(pEl);
        subTabEl.append(btnEl);

        tabEl.append(subTabEl);
    }

    console.log(tabEl);
//////////////////////////////////////////
//need find a way to replace these two lines with correct selector.
    //$('#sundayDrink').empty();
    //$('#sundayDrink').append(tabEl);
//////////////////////////////////////////

    $(`#${dispId}`).empty();
    $(`#${dispId}`).append(tabEl);

    $(`#${tabName}`).tabs();

    $(`button[name='${tabName}']`).on('click', function(event){
        
        var drinkTab = $(this).parent();
        console.log(drinkTab);

       addCocktail(drinkTab);
    
    });

    return tabEl;

}

// attach recipet to index.html
function addRecipet(recipet){

    
    var prev = recipet.parents('.rowMeal');
    var id = recipet.children('button').attr('id');
    console.log(id);

//get ingredients by id need find a way to add them.
    getIngredients(id);
    prev.empty();
    prev.append(recipet);

    console.log(recipet);

}

function addCocktail(drink){

    var prev = drink.parents('.rowDrink');
    prev.empty();
    prev.append(drink);

}


$('form.meal').submit(function( event ){

    event.preventDefault();

    //console.log($(this).children('input').val());

    var arg = $(this).children('input').val();
    
    str = arg.replaceAll(' ','+');

    var dayOfWeek = $(this).children('input').attr('name');
    console.log(dayOfWeek);
    searchRecipes(str, dayOfWeek);



});


$('form.drink').submit(function(event){

    event.preventDefault();
    var arg = $(this).children('input').val();
    var dayOfWeek = $(this).children('input').attr('name');
    var str = arg.replaceAll(' ','+');

    searchCocktail(str, dayOfWeek);

    console.log($(this).name);
});
