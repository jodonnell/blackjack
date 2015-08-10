var Deck = function () {
    this.create();
}

Deck.prototype = {
    create: function () {
		    this.deck = []
        _.each(['H', 'D', 'C', 'S'], function (suite) {
				    _.each(['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'], function (number) {
                this.deck.push(new Card(suite, number));
            }, this);
        }, this);
    },

    shuffle: function () {
        var currentIndex = this.deck.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temporaryValue;
        }
        return this.deck;
    },
    
    draw: function () {
				return this.deck.pop();
    }
};
