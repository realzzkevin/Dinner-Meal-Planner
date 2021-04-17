var cdbKey ='1';
var cname;

var food;
//ingredients will be stored in an array.
//var fIngredients=[];

var spoonKey = "4d74df0d2f4a433e9df53519bb28d05a";
//var spoonKey = "bbd5b54b464947c8a46760a76858c81b"
var recipes='complexSearch';
var fCriteria = recipes;
var cocktail;
var CTIngredients=[];

var menu = {

    sundayMeal : undefined,

    sundayDrink : undefined,

    mondayMeal : undefined,

    mondayDrink : undefined,

    tuesdayMeal : undefined,

    tuesdayDrink : undefined,

    wednesdayMeal : undefined,

    wednesdayDrink : undefined,

    thursdayMeal : undefined,

    thursdayDrink : undefined,

    fridayMeal : undefined,

    fridayDrink : undefined,

    saturdayMeal : undefined,

    saturdayDrink : undefined,

}

//search recipes by their name. return a list of recipes;
async function searchRecipes(name, dispId) {
    
    var spoonUrl = `https://api.spoonacular.com/recipes/${fCriteria}?apiKey=${spoonKey}&query=${name}&number=1`;

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

                    var ingre=[];
                    //ingre.push(id);

                    for(var i=0; i<ingreList.length; i++){

                        //fIngredients.push(ingreList[i].name +': '+ingreList[i].amount.us.value+' '+ingreList[i].amount.us.unit);
                        ingre.push(ingreList[i].amount.us.value+' '+ingreList[i].amount.us.unit +' '+ingreList[i].name +'.' );
                    }

                    console.log(ingre);

                    //addRecipet(ingre, id);
                    addIngredients(ingre, id);
                    //console.log(fIngredients);

                    //return fIngredients;
                    return ingre;
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
                    
                    return list;

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

        console.log(list[i]);

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
        btnEl.addClass('recipeBtn');
        
        var recEl = $('<div>').attr('name', 'recipes');
        recEl.addClass('rList');
        recEl.empty();
        
        btnEl.append(imgEl);
        btnEl.append(recEl);
        subTabEl.append(pEl);
        subTabEl.append(btnEl);

        tabEl.append(subTabEl);

        getIngredients(list[i].id);
    }


    $(`#${dispId}`).empty();
    $(`#${dispId}`).append(tabEl); 
    $(`#${tabName}`).tabs();
    
    $(`button[name='${tabName}']`).on('click', function(event){
    
        var recipetTab = $(this).parent();
        console.log($(recipetTab));
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
        imgEl.addClass('drinkImg');

        var btnEl =$('<button>').attr('id', list[i].idDrink);
        btnEl.attr('name',`${tabName}`);

        btnEl.append(imgEl);
        subTabEl.append(pEl);
        subTabEl.append(btnEl);

        tabEl.append(subTabEl);
    }

    console.log(tabEl);

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

function addIngredients(ingreList, tabId){
    
    var recTab = $(`#${tabId} > div[name='recipes']`);
    recTab.empty();
    console.log(recTab);
    
    for (var i=0; i<ingreList.length; i++){
        
        var pEl = $('<p>').text(ingreList[i]);
        recTab.append(pEl);
    }
    
}

// attach recipet to index.html
function addRecipet(recipet){
    
    var prev = recipet.parents('.rowMeal');
    //var id = recipet.children('button').attr('id');
    var day = prev.attr('id');
    var data = prev.html();
    prev.empty();
    prev.append(recipet);
    //save tab into localStorage
    menu[day] = data;
    localStorage.setItem('mealPlan', JSON.stringify(menu));
}

function addCocktail(drink){

    var prev = drink.parents('.rowDrink');

    prev.empty();
    prev.append(drink);

    var day = prev.attr('id');
    var data = prev.html();
    menu[day] = data;
    localStorage.setItem('mealPlan', JSON.stringify(menu));
}

function loadMenu(){

    myMenu = JSON.parse(localStorage.getItem('mealPlan'));
  
    if (myMenu!=null){
        
        menu=myMenu;

        var meal;
        
        for (meal in menu){

            if(menu[meal]!=null){

                var tab = $(`${menu[meal]}`);
                console.log(tab);
                $(`#${meal}`).empty()
                $(`#${meal}`).append(menu[meal]);
            }

        }
        
    }     

    console.log('loadmenu done');

}

loadMenu();

$('form.meal').submit(function( event ){

    event.preventDefault();
    var arg = $(this).children('input').val();    
    var str = arg.replaceAll(' ','+');
    var dayOfWeek = $(this).children('input').attr('name');

    console.log((str===''));

    if (str!=''&&str!=null){
        searchRecipes(str, dayOfWeek);
    }
});


$('form.drink').submit(function(event){

    event.preventDefault();
    var arg = $(this).children('input').val();
    var dayOfWeek = $(this).children('input').attr('name');
    var str = arg.replaceAll(' ','+');


    if(str!=''&&str!=null){
        searchCocktail(str, dayOfWeek);
    }else {
        console.log("ERROR")
    }
});


