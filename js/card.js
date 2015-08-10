var Card = function (suite, number) {
    this.suite = suite;
    this.number = number;
}

Card.prototype = {
    imagePath: function () {
				return 'images/' + this.number + this.suite + '.png';
    }
};
