function readMore() {
    var dots = document.getElementById("dots");
    var more = document.getElementById("more");
    var btn = document.getElementById("btn");
    var btnBox = document.getElementById("btnBox");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        more.style.display = "none";
        btnBox.style.background = "linear-gradient(180deg, rgba(249, 249, 249, 0) 0%, #F9F9F9 82.29%)";
        btn.innerHTML = "Читать полностью";
    }
    else {
        dots.style.display = "none";
        more.style.display = "inline";
        btn.innerHTML = "Свернуть";
        btnBox.style.background = "none";
    }
}

$(function() {
    $('.product-one__small').slick({
        asNavFor: '.product-one__big',
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        arrows: false,
        variableWidth: true
    });
    
      $('.product-one__big').slick({
        asNavFor: '.product-one__small',
        draggable: false,
        arrows: false,
        fade: true,
        responsive: [
        {
          breakpoint: 1021,
          settings:{
            draggable: true
          }
        },
      ]
      });
});