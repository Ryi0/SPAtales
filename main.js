
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
function appendCategoriesToFlexbox(){
    const categories = Cats.drinks;
    console.log(Cats)
}
function fetchDrinks(category) {
    let categories ;

    console.log(category)
    $('.page').removeClass('active');
    $('#cocktails').addClass('active');
    const catsAsArray = (()=>{
        let placeholder;
        fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list").then(r => r.json()).then(answer=> {
            placeholder = answer
        }).then(()=>{
            console.log(placeholder)

        })
        console.log(placeholder)
            return placeholder;
    })
    console.log(catsAsArray())

    //finish with :
    closeNav();
}

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
