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
async function searchRecipes(name) {
    
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


                    showRecipetList(foodList);

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

                })

            }else{
                //return error
                throw new Error(`HTTP Error! status: ${response.status}`);
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

                    var list = data.drinks;

                    showCocktailList(list);

                    //getCTingredient(list[0]);


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
function showRecipetList(list){

    
    var tabEl= $('<div>').attr('id','tabs');
    var ulEl = $('<ul>');
    tabEl.append(ulEl);
    
    for (var i=0; i<list.length; i++){

        var liEl = $('<li>');
        var aEl = $('<a>').attr('href', "#tab-"+(i+1));
        aEl.text(list[i].title);
        liEl.append(aEl);
        ulEl.append(liEl);

        var subTabEl = $('<div>').attr('id',"tab-"+(i+1));
        var pEl = $('<p>').text(list[i].title);
        var imgEl = $('<img>').attr('src', list[i].image);
        var btnEl =$('<button>').attr('id', list[i].id);

        btnEl.append(imgEl);
        subTabEl.append(pEl);
        subTabEl.append(btnEl);

        tabEl.append(subTabEl);
    }

    console.log(tabEl);

    //$('#tabs').tabs();

    //$('body').append(tabEl);

    $('#sundaymeal').empty();
    $('#sundaymeal').append(tabEl);

    $('#tabs').tabs();
    return tabEl;


    
}

function showCocktailList(list){

    var tabEl= $('<div>').attr('id','tabs');
    var ulEl = $('<ul>');
    tabEl.append(ulEl);
    
    for (var i=0; i<list.length; i++){

        var liEl = $('<li>');
        var aEl = $('<a>').attr('href', "#tab-"+(i+1));
        aEl.text(list[i].strDrink);
        liEl.append(aEl);
        ulEl.append(liEl);

        var subTabEl = $('<div>').attr('id',"tab-"+(i+1));
        var pEl = $('<p>').text(list[i].strDrink);
        var imgEl = $('<img>').attr('src', list[i].strDrinkThumb);
        var btnEl =$('<button>').attr('id', list[i].idDrink);

        btnEl.append(imgEl);
        subTabEl.append(pEl);
        subTabEl.append(btnEl);

        tabEl.append(subTabEl);
    }

    console.log(tabEl);

    //$('#tabs').tabs();

    //$('body').append(tabEl);

    $('#sundayDrink').empty();
    $('#sundayDrink').append(tabEl);

    $('#tabs').tabs();

    
    return tabEl;

}

// attach recipet to index.html
function addRecipet(recipet){


}

function addCocktail(){


}



//searchRecipes('spaghetti');
//searchCocktail('Screwdriver');

$('form.meal').submit(function( event ){

    event.preventDefault();

    //console.log($(this).children('input').val());

    var arg = $(this).children('input').val();
    
    str = arg.replaceAll(' ','+');

    console.log(str);

    var list;
    /* codes not working
    async function go() {
        list = await searchRecipes(str);

        console.log(list);
    }

    go();

    console.log(list);
    */

    searchRecipes(str);



});


$('form.drink').submit(function(event){

    event.preventDefault();
    var arg = $(this).children('input').val();

    str = arg.replaceAll(' ','+');

    searchCocktail(str);
});
