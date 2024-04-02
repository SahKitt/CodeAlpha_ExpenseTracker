document.addEventListener("DOMContentLoaded", function() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        var image = card.querySelector('img');
        var familyText = card.querySelector('h3');
        image.addEventListener('mouseenter', function() {
            familyText.style.opacity = "1";
        });
        image.addEventListener('mouseleave', function() {
            familyText.style.opacity = "0";
        });
    });
});