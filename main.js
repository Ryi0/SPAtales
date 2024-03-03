

$(function () {
    let onPhone = false;
    if ($(window).width()<600){
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
});

function openNav() {
    document.getElementById("categories").style.width = "50vw";
    document.getElementById("navigator").style.marginLeft = "50vw"
    document.getElementById("categories").style.left = "0";
}
function closeNav() {

    document.getElementById("categories").style.width = "0";
    document.getElementById("navigator").style.marginLeft = "0"
    document.getElementById("categories").style.right = "-100vw";
}
