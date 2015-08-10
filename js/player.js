var Player = function () {
		this.hand = [];
}

Player.prototype = {
		addCard: function (card) {
				this.hand.push(card);
    },
};
