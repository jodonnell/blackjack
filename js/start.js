$(document).ready(function () {
    var deck = new Deck();
    var player = new Player();
    deck.shuffle();

    var card = deck.draw();
    player.addCard(card);
    
    var imagePath = card.imagePath();

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    var compiled = _.template($('.templates .card-template').html());
    var html = compiled({'imagePath': '<img src="' + imagePath +'"/>'});
    $('.player').append(html);

    $('.player .card-container').animate({top: '400px', left: '400px'}, 300, function() {
        $('.player .card-container').addClass('show');

        var card = deck.draw();
        player.addCard(card);
        
    });
});

