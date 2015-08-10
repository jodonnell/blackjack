var Player = function (yPos, selector) {
		this.hand = [];
    this.yPos = yPos;
    this.selector = selector;
}

Player.prototype = {
		addCard: function (card) {
				this.hand.push(card);
    },

    numCardsInHand: function () {
				return this.hand.length;
    },

    calcScore: function () {
        return this.acesScore(this.nonAcesScore());
    },

    nonAcesScore: function () {
        var score = 0;
        _.each(this.hand, function (card) {
            if (card.isAce())
                return;
            score += card.value();
        });
				return score;
    },

    acesScore: function (score) {
        if (this.numAces() === 0)
            return score;

        if (score > 10)
            return score + this.numAces();

        var oneHighAceScore = score + 11 + this.numAces() - 1;
        if (oneHighAceScore > 21)
            return score + this.numAces();

        return oneHighAceScore;
    },

    numAces: function () {
        return _.filter(this.hand, function (card) {
            return card.isAce();
        }).length;
    }
};
