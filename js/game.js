var Game = function () {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    
    this.CARD_WIDTH = 144;
    
    this.createGame()
    this.dealInitialHand();
    this.hideDealerScore();
    
    $('body').on('click', '.hit:not(.inactive)', $.proxy(this.playerHit, this));
    $('body').on('click', '.stay:not(.inactive)', $.proxy(this.playerStay, this));
}

Game.prototype = {
    playerStay :function () {
        this.deactivateButtons();
        $('.dealer .card-container').addClass('show');
        this.showDealerScore();
        while (this.dealer.calcScore() < 17) {
            this.dealCard(this.dealer);
        }

        this.calcWhoWon();
    },
    
    playerHit: function () {
        this.dealCard(this.player);

        if (this.player.calcScore() > 21) {
            this.endGame('You busted');
        }
    },

    createGame: function () {
        this.deck = new Deck();
        this.player = new Player(400, '.player');
        this.dealer = new Player(100, '.dealer');

        this.deck.shuffle();
    },

    dealInitialHand: function () {
        this.dealCard(this.player);
        this.dealCard(this.player);
        this.dealCard(this.dealer);
        this.dealCard(this.dealer, true);
    },

    createCardHtml: function (player, card) {
        var imagePath = card.imagePath();
        var compiled = _.template($('.templates .card-template').html());
        var $newCardHtml = $(compiled({'imagePath': '<img src="' + imagePath +'"/>'}));
        $(player.selector).find('.cards').append($newCardHtml);
        return $newCardHtml;
    },
    
    dealCard: function(player, hidden) {
        var card = this.deck.draw();
        player.addCard(card);
        
        var $newCardHtml = this.createCardHtml(player, card);

        var left = 400 + this.CARD_WIDTH * (player.numCardsInHand() - 1);
        $newCardHtml.animate({top: player.yPos, left: left}, 400, function() {
            if (!hidden) {
                $(this).addClass('show');
            }
            $(player.selector).find('.score').html(player.calcScore());
        });
    },

    endGame: function (message) {
        this.deactivateButtons();
        $('.ending').html(message);
        setTimeout($.proxy(this.reset, this), 2500);
    },

    deactivateButtons: function () {
        $('.buttons div').addClass('inactive');
    },
    
    reset: function () {
        this.clear();
        this.createGame();
        this.dealInitialHand();
    },
    
    clear: function () {
        $('.player, .dealer').find('.cards').html('');
        $('.player, .dealer').find('.score').html('');
        $('.ending').html('');
        $('.buttons div').removeClass('inactive');
        this.hideDealerScore();
    },

    calcWhoWon: function () {
        if (this.dealer.calcScore() > 21)
            this.endGame('DEALER BUSTED!!!');
        else if (this.player.calcScore() === this.dealer.calcScore())
            this.endGame('PUSH!!!');
        else if (this.player.calcScore() > this.dealer.calcScore())
            this.endGame('WINNER!!!');
        else if (this.player.calcScore() < this.dealer.calcScore())
            this.endGame('LOSER :\'(');
    },

    hideDealerScore: function () {
        $('.dealer .score').hide();
    },

    showDealerScore: function () {
        $('.dealer .score').show();
    }
    
};
