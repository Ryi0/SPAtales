let navOpen = false;
let selectedCategory = "Cocktail";
$(function () {
  let onPhone = false;
  if ($(window).width() < 600) {
    onPhone = true;
  }
  $(".cocktailInfoPage").hide();
  if (!onPhone) {
    let navWidth = 5;
    $(".cocktails").on("mouseover", function () {
      navWidth = 13;
    });

    $(".cocktails").on("mouseout", function () {});

    $(".navbar").on("mouseover", function () {
      navWidth += 7;
      $(".navbar").css("width", `${navWidth}rem`);
    });

    $(".navbar").on("mouseout", function () {
      navWidth = 5;
      $(".navbar").css("width", `${navWidth}rem`);
    });

    $(".navbar-nav li").on("click", (event) => {
      if (navOpen) {
        event.preventDefault();
        closeNav();
      }
    });
  }

  // Initially show home page
  $(".page").removeClass("active");
  $("#home").addClass("active");

  // Handle navigation
  $("nav a").on("click", function (event) {
    event.preventDefault(); //Description: If this method is called, the default action of the event will not be triggered.
    let targetPage = $(this).attr("href");
    $(".page").removeClass("active");
    $(targetPage).addClass("active");
  });
});

/**
 *
 * This function displays the cocktails page no matter what page is
 * @param category
 */

function fetchDrinks(category) {
  $("#CD").empty();
  console.log(category);
  $(".page").removeClass("active");
  $("#cocktails").addClass("active");
  $("#catTitle").text(category);
  //finish with :
  selectedCategory = category;
  DrinkCaller();
  closeNav();
}

function drinkClickHandler(drinkID) {
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
    openInfoRecipe();
  };
}

/**
 * this function creates a tile of drink and appends it to the grid
 * enters as array of 3 elements [0=name,1=img,2=id]
 * @param drink Array [0=name,1=img,2=id]
 * @param container where to append the drink
 */
function appendDrinkToGrid(drink, container) {
  if (container!==undefined){
    if (!container.is("div")) {
      if ($(container).get()!==typeof HTMLElement.prototype){
    console.error(($(container).get()));
    throw new Error(container+ " Is not a valid container")
  }
      }
  }

  console.log(container)
  console.log(drink)
  const $drink = $("<div>", { id: "drinkTile", class: "cocktailsDataDrink" });
  let $drinkImage = $("<img>", {
    src: drink[1],
    alt: "An image of the drink",
    id: "drinkimage",
    class: "cocktailsImage",
  });
  let drinkID = drink[2];
  // $drink.text(drink);
  $drink.append(`<h3>${drink[0]}</h3>`);
  $drink.append($drinkImage);
  $drink.append(`<p>Id : ${drinkID}</p>`);
  $drink.on("click", drinkClickHandler(drinkID));
  // console.log(drink) //enters as array of 3 elements [0=name,1=img,2=id]
  $(container===undefined?"#CD":container).append($drink); //default application is cocktailsData grid
  if (container===undefined){

    console.warn(`${container} (container) is undefined. If this is not the desired outcome, please set up a containe`);
    console.warn($($("#CD").get()).get())
  }
}

function appendCategoryToFlexbox(displayText) {
  let $Category = $("<div>", { id: "item", class: "categoriesButton" });
  let $Category2 = $("<div>", {
    id: "item",
    class: "cocktailsPageCategoriesLinks",
  });
  $Category.text(displayText);
  $Category2.text(displayText);

  $Category.on("click", () => {
    const categoryClicked = displayText;
    fetchDrinks(categoryClicked);
  });
  $Category2.on("click", () => {
    const categoryClicked = displayText;
    fetchDrinks(categoryClicked);
  });

  $("#ADC").append($Category);
  $("#CPC").append($Category2);
}

let Drinks = [];
async function DrinksFetcher() {
  Drinks = [];
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" +
        selectedCategory,
    );
    const data = await response.json();
    for (const drink of data["drinks"]) {
      Drinks.push(Object.values(drink)); //turns object into an array
      // console.log(Object.values(drink))
    }
  } catch (e) {
    console.error("DrinkFetcherBroke : ", e);
  }
}

async function DrinkCaller() {
  await DrinksFetcher();
  console.log(Drinks);
  for (const drink of Drinks) {
    //  console.log(drink);
    appendDrinkToGrid(drink);
  }
}
DrinkCaller().catch((e3) => console.error(e3));

let Categories = [];

/**
 * this fetches the categories from the db and populates the Categories array
 * @returns {Promise<void>} Drink categories
 */
async function CategoriesFetcher() {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list",
    );
    const data = await response.json();
    for (const category of data["drinks"]) {
      Categories.push(category["strCategory"]);
      // console.log(category["strCategory"])
    }
  } catch (e) {
    console.error("fetcher broke : ", e);
  }
}

/**
 * this permits calling and therefore populating of categories array outside of an async class
 * @returns {Promise<void>}
 */
async function CategoriesCaller() {
  await CategoriesFetcher();
  console.log(Categories);
  for (const category of Categories) {
    console.log(category);
    appendCategoryToFlexbox(category);
  }
}
//Works without catch() but i dont like underlines
CategoriesCaller().catch((e2) => console.error(e2));

function openInfoRecipe() {
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
function closeInfoRecipe() {
  // $("main").css({"filter":"blur(0px)"})
  $("main").children().removeClass("blurClass");
  $(".cocktailInfoPage").slideUp();
  $(".cocktailInfoPage")
    .children()
    .first()
    .hide(50, "linear", function hideNext() {
      $(this).next("*").hide(50, "linear", hideNext);
    });
}
function openNav() {
  setTimeout(() => {
    navOpen = true;
  }, 50); //delay of 50ms so the nav can actually open. Might work if i put nav open later in the code and avoid delay but this is mostly foolproof
  $("#categories").css("width", "50vw");
  $("#navigator").css("marginLeft", "50vw");
  $("#categories").css("left", "0");
}

function closeNav() {
  setTimeout(() => {
    navOpen = false;
  }, 50);

  $("#categories").css("width", "0");
  $("#navigator").css("marginLeft", "0");
  $("#categories").css("right", "-100vw");
}

async function searching() {
  const inputEntre = document.getElementById("chercher").value;
  document.getElementById("resultatDeRecherche").textContent =
    "Results for " + inputEntre;

  if (!isNaN(inputEntre) && inputEntre.length >= 5) {
    searchingById();
  } else {
    searchingByLetters();
  }
}
async function searchingByLetters() {


  const lettresEntrees = document
    .getElementById("chercher")
    .value.toLowerCase();
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
      lettresEntrees,
  );
  const searchResultsContainer = $("#searchResults");
  searchResultsContainer.empty();
  const data = await response.json();
  console.log(data)
  try {
  for (const drink of data["drinks"]) {
    appendDrinkToGrid(formatDrink(drink), searchResultsContainer)
  }}catch (e) {
    searchResultsContainer.siblings('#resultatDeRecherche').text(`No results found for the name ${lettresEntrees}`)

  }
}
async function searchingById() {
  const idEntre = document.getElementById("chercher").value;
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idEntre}`,
  );
  const searchResultsContainer = $("#searchResults");
  searchResultsContainer.empty();
  const data = await response.json();
  try {
    for (const drink of data["drinks"]) {
      appendDrinkToGrid(formatDrink(drink), searchResultsContainer)
    }
  }catch (e) {
    // searchResultsContainer.text(`No results found for the id${idEntre}`)
    searchResultsContainer.siblings('#resultatDeRecherche').text(`No results found for the id ${idEntre}`)
  }
}

/**
 *
 * @param drink an array containing one drink
 * @returns {*[]}
 */
function formatDrink(drink) {
  let drArray = [];
  drArray.push(drink)
  console.log(drink)
  let thisIsHackedTogether = [];
  drArray.forEach((drink) => {
    const name = drink.strDrink;
    const drinkImage = drink.strDrinkThumb;
    const drinkID = drink.idDrink;
    thisIsHackedTogether.push(name);
    thisIsHackedTogether.push(drinkImage);
    thisIsHackedTogether.push(drinkID)
  });
  return thisIsHackedTogether;
}

function displaySearchResults(results) {
  const searchResultsContainer = $("#searchResults");
 searchResultsContainer.empty(); // Clear previous search results

  if (results) {
  appendDrinkToGrid( formatDrink(results), searchResultsContainer);
    // results.forEach((drink) => {
    //   const resultItem = $("<div>", {
    //     id: "drinkTile",
    //     class: "cocktailsDataDrink",
    //   });
    //   const drinkImage = $("<img>", {
    //     src: drink.strDrinkThumb,
    //     alt: "An image of the drink",
    //     id: "drinkimage",
    //     class: "cocktailsImage",
    //   });
    //   const drinkID = drink.idDrink;
    //
    //   resultItem.append($("<h3>").text(drink.strDrink));
    //   resultItem.append(drinkImage);
    //   resultItem.append($("<p>").text(`Id: ${drinkID}`));
    //
    //   resultItem.on("click", drinkClickHandler(drinkID));
    //
    //   searchResultsContainer.append(resultItem);
    // });

  } else {
    searchResultsContainer.text("No results found.");
  }
}
const apiKey = '66f06076e82d204d025be24d110e10ad';
const cityName = 'Montreal';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&mode=xml`;


const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        handleResponse(xhttp.responseXML);
    }
};

xhttp.open('GET', apiUrl, true);
xhttp.send();

//function pour extraire les donnees du xml
function handleResponse(xml) {
    const temperature = xml.getElementsByTagName('temperature')[0].getAttribute('value');
    const weatherDescription = xml.getElementsByTagName('weather')[0].getAttribute('value');
    const feelsLike=xml.getElementsByTagName('feels_like')[0].getAttribute('value');
    const city=xml.getElementsByTagName('city')[0].getAttribute('name');

    tempCelcius=Math.ceil(temperature-273.15);
    feelsLikeCel=Math.ceil(feelsLike-273.15);

    document.getElementById('city').innerText=`City: ${city}`;
    document.getElementById('temperature').innerText = `Temperature: ${tempCelcius}°C`;
    document.getElementById('feelsLike').innerText = `Feels Like: ${feelsLikeCel}°C`;
    document.getElementById('weather-description').innerText = `Weather: ${weatherDescription}`;
    document.getElementById('cityBar').innerText=`City: ${city}`;
    document.getElementById('temperatureBar').innerText = `Temperature: ${tempCelcius}°C`;
    document.getElementById('feelsLikeBar').innerText = `Feels Like: ${feelsLikeCel}°C`;
    console.log(weatherDescription);
    console.log(temperature);
}

function recetteAleatoire() {
  $("#HomeDrinks").empty();
  $.ajax({
    url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
    method: "GET",
    success: function (response) {
      console.log("FLAG1 : "+ response);
      console.log(response);
      console.log("FLAG2 : "+response.drinks);
      console.log(response.drinks)
      AfficherAleatoire(response.drinks);
    },
    error: function (xhr, status, error) {
      console.log("Error fetching random drinks: " + error);
    },
  });
}

let singleDrink = [[]];
function AfficherAleatoire(drink) {
  console.log(drink)
  const searchResultsContainer = $("#HomeDrinks");
  if (drink) {
   appendDrinkToGrid(formatDrink(drink[0]), searchResultsContainer)
  } else {
    searchResultsContainer.text("No results found.");
  }
}