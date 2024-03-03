
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
    $('.AllDrinkCategories').children().on('click', function (event) {
        const categoryClicked = this.textContent;

        fetchDrinks(categoryClicked)

    })
});

function appendCategoriesToFlexbox() {
    const categories = Cats.drinks;
    console.log(Cats)
}

/**
 *
 * This function displays the cocktails page no matter what page is
 * @param category
 */
function fetchDrinks(category) {
    console.log(category)
    $('.page').removeClass('active');
    $('#cocktails').addClass('active');
    //finish with :

    closeNav();
}
let Categories = []

/**
 * this fetches the categories from the db and populates the Categories array
 * @returns {Promise<void>} Drink categories
 */
async function fetcher(){
        try {
            const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
            const data = await response.json()
            for (const category of data["drinks"]) {
               Categories.push(category)
                console.log(category["strCategory"])
            }
        }catch (e){
            console.error("fetcher broke : ", e)
        }
}

/**
 * this permits calling and therefore populating of categories array outside of an async class
 * @returns {Promise<void>}
 */
async function caller(){
    await fetcher();
    console.log(Categories)
}
//Works without catch() but i dont like underlines
caller().catch()

function openNav() {
    $("#categories").css("width", "50vw");
    $("#navigator").css("marginLeft", "50vw");
    $("#categories").css("left", "0");
}

function closeNav() {
    $("#categories").css("width", "0");
    $("#navigator").css("marginLeft", "0");
    $("#categories").css("right", "-100vw");
}
