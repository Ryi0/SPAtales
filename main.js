let navOpen = false;
let selectedCategory = "Cocktail";
$(function () {
    let onPhone = false;
    if ($(window).width() < 600) {
        onPhone = true
    }

    if (!onPhone) {
        let navWidth = 5
        $('.cocktails').on('mouseover', function () {
            navWidth = 13
        })

        $('.cocktails').on('mouseout', function () {
        })

        $('.navbar').on('mouseover', function () {
            navWidth += 7
            $('.navbar').css('width', `${navWidth}rem`)
        });

        $('.navbar').on('mouseout', function () {
            navWidth = 5
            $('.navbar').css('width', `${navWidth}rem`)
        });

        $('.navbar-nav li').on('click', (event)=>{
            if (navOpen) {
                event.preventDefault();
                closeNav();
            }
        })
    }

    // Initially show home page
    $('.page').removeClass('active');
    $('#home').addClass('active');

    // Handle navigation
    $('nav a').on('click', function (event) {
        event.preventDefault(); //Description: If this method is called, the default action of the event will not be triggered.
        let targetPage = $(this).attr('href');
        $('.page').removeClass('active');
        $(targetPage).addClass('active');
    });
    // $('.AllDrinkCategories').children().on('click', function (event) {
    //     const categoryClicked = this.textContent;
    //     console.log("ASDASDAS")
    //     fetchDrinks(categoryClicked)
    //
    // })
});
/**
 *
 * This function displays the cocktails page no matter what page is
 * @param category
 */
function fetchDrinks(category) {
    $("#CD").empty();
    console.log(category)
    $('.page').removeClass('active');
    $('#cocktails').addClass('active');
    $('#catTitle').text(category)
    //finish with :
    selectedCategory = category;
    DrinkCaller()
    closeNav();
}


function appendDrinkToGrid(drink){

    let $drink = $("<div>", {id:"drinkTile", "class":"cocktailsDataDrink"});
    let $drinkImage = $("<img>", {src:drink[1], alt:"An image of the drink", id:"drinkimage", "class":"cocktailsImage"});
    // $drink.text(drink);
    $drink.append(`<h3>${drink[0]}</h3>`)
    $drink.append($drinkImage);
    $drink.append(`<p>Id : ${drink[2]}</p>`)
    // console.log(drink) //enters as array of 3 elements [0=name,1=img,2=id]
    $("#CD").append($drink);
}

function appendCategoryToFlexbox(displayText) {
    let $Category = $("<div>",{id:"item","class":"categoriesButton"});
    let $Category2 = $("<div>",{id:"item","class":"cocktailsPageCategoriesLinks"})
    $Category.text(displayText);
    $Category2.text(displayText);

    $Category.on('click', ()=>{
        const categoryClicked = displayText;
        fetchDrinks(categoryClicked)
    })
    $Category2.on('click',()=>{
        const categoryClicked = displayText;
        fetchDrinks(categoryClicked);
    })

    $("#ADC").append($Category);
    $("#CPC").append($Category2);
}

let Drinks = [];
async function DrinksFetcher(){
    Drinks = [];
    try {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+selectedCategory);
        const data = await response.json()
        for (const drink of data["drinks"]) {
            Drinks.push(Object.values(drink)) //turns object into an array
           // console.log(Object.values(drink))
        }
    }catch (e) {
        console.error("DrinkFetcherBroke : ",e)
    }
}

async function DrinkCaller(categor){
    await DrinksFetcher();
    console.log(Drinks);
    for (const drink of Drinks) {
      //  console.log(drink);
        appendDrinkToGrid(drink)
    }
}
DrinkCaller().catch(e3=>console.error(e3))

let Categories = []

/**
 * this fetches the categories from the db and populates the Categories array
 * @returns {Promise<void>} Drink categories
 */
async function CategoriesFetcher(){
        try {
            const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
            const data = await response.json()
            for (const category of data["drinks"]) {
               Categories.push(category["strCategory"])
               // console.log(category["strCategory"])
            }
        }catch (e){
            console.error("fetcher broke : ", e)
        }
}

/**
 * this permits calling and therefore populating of categories array outside of an async class
 * @returns {Promise<void>}
 */
async function CategoriesCaller(){
    await CategoriesFetcher();
    console.log(Categories);
    for (const category of Categories) {
        console.log(category)
        appendCategoryToFlexbox(category)
    }
}
//Works without catch() but i dont like underlines
CategoriesCaller().catch(e2=>console.error(e2))




function openNav() {
    setTimeout(()=>{
        navOpen=true;
    },50) //delay of 50ms so the nav can actually open. Might work if i put nav open later in the code and avoid delay but this is mostly foolproof
    $("#categories").css("width", "50vw");
    $("#navigator").css("marginLeft", "50vw");
    $("#categories").css("left", "0");
}

function closeNav() {
    navOpen = false;
    $("#categories").css("width", "0");
    $("#navigator").css("marginLeft", "0");
    $("#categories").css("right", "-100vw");
}
