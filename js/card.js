var Card = function (suite, number) {
    this.suite = suite;
    this.number = number;
}

Card.prototype = {
    imagePath: function () {
				return 'images/' + this.number + this.suite + '.png';
    },

    value: function () {
        if (this.number === 'J' || this.number === 'Q' || this.number === 'K')
            return 10;

        return parseInt(this.number);
    },

    isAce: function () {
				return this.number === 'A';
    }
};
