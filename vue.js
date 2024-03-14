function ShowRandom(){
    $("#HomeDrinks").empty();
    $.ajax({
        url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
        method: "GET",
        success: function (response) {
            console.log("FLAG1 : "+ response);
            console.log(response);
            console.log("FLAG2 : "+response.drinks);
            console.log(response.drinks)
            handleRandom(response.drinks);
        },
        error: function (xhr, status, error) {
            console.log("Error fetching random drinks: " + error);
        },
    });
}
function OpenNav(){
    setTimeout(() => {
        navOpen = true;
    }, 50); //delay of 50ms so the nav can actually open. Might work if i put nav open later in the code and avoid delay but this is mostly foolproof
    $("#categories").css("width", "50vw");
    $("#navigator").css("marginLeft", "50vw");
    $("#categories").css("left", "0");
}
function CloseNav() {
    setTimeout(() => {
        navOpen = false;
    }, 50);

    $("#categories").css("width", "0");
    $("#navigator").css("marginLeft", "0");
    $("#categories").css("right", "-100vw");
}

function ChercherRecette() {
    console.log("SEARCHINF")
    const inputEntre = document.getElementById("chercher").value;
    document.getElementById("resultatDeRecherche").textContent =
        "Results for " + inputEntre;

    if (!isNaN(inputEntre) && inputEntre.length >= 5) {
        searchingById();
    } else {
        searchingByLetters();
    }
}
function DrinkClickHandler(drinkID){
    return () => {
        $.ajax({
            url:"https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID,
            method: "GET",
            success: function (response) {
                let drink = response.drinks[0];
                $("#title").text(drink.strDrink);
                $("#category").text("Category: " + drink.strCategory);
                $("#glassType").text("Glass Type: " + drink.strGlass);
                $(".instructionsWrapper p").text(drink.strInstructions);
                $("#ingredientsUL").empty();
                for (let i = 1; i <= 15; i++) {
                    if (drink["strIngredient" + i]) {
                        let ingredient = drink["strIngredient" + i];
                        let measure = drink["strMeasure" + i];
                        $("#ingredientsUL").append(`<li> ${measure} ${ingredient} </li>`);
                    }
                }
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
            },
        });
        OpenInfoRecipe();
    };
}
function OpenInfoRecipe() {
    $("main").children().addClass("blurClass");
    // $("main").css({"filter":"blur(50px)"})
    $(".cocktailInfoPage").slideDown();
    $(".cocktailInfoPage")
        .children()
        .first()
        .show(50, "linear", function showNext() {
            $(this).next("*").show(50, "linear", showNext);
        });
}
function CloseInfoRecipe(){
    $("main").children().removeClass("blurClass");
    $(".cocktailInfoPage").slideUp();
    $(".cocktailInfoPage")
        .children()
        .first()
        .hide(50, "linear", function hideNext() {
            $(this).next("*").hide(50, "linear", hideNext);
        });
}


/**
 *
 * This function displays the cocktails page no matter what page is
 * @param category
 */
function FetchDrinks(category) {
    $("#CD").empty();
    console.log(category);
    $(".page").removeClass("active");
    $("#cocktails").addClass("active");
    $("#catTitle").text(category);
    //finish with :
    selectedCategory = category;
    DrinkCaller();
    CloseNav();
}

/**
 * TODO{REMOVE THIS}
 *     <i class="material-symbols-outlined">menu</i>
 *     <i class="material-symbols-outlined">home</i>
 *     <i class="material-symbols-outlined">local_bar</i>
 *     <i class="material-symbols-outlined">search</i>
 *     <i class="material-symbols-outlined">sunny</i>
 *     <i class="material-symbols-outlined">groups</i>
 *     <i class="material-symbols-outlined"></i>
 */