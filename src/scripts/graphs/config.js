class Config {
    // See the `defaults` object below for sane defaults.
    constructor(options = defaults) {
        // This object will store the raw data, it should be accessed with
        // getters and setters.
        this.config = {};

        // Use the setters available for checking of parameters.
        for (var prop of Object.keys(options)) {
            this[prop] = options[prop];
        }
    }

    // Element should be a string which results in a non-null selector.
    get element() {
        return this.config.element;
    }
    set element(value) {
        if (!value) { throw 'Element should not be null.'; }
        this.config.element = value;
    }

    // Width should be a positive number.
    get width() {
        return this.config.width;
    }
    set width(value) {
        if (value < 0) { throw 'Width should be positive.'; }
        this.config.width = value;
    }

    // Height should be a positive number.
    get height() {
        return this.config.height;
    }
    set height(value) {
        if (value < 0) { throw 'Height should be positive.'; }
        this.config.height = value;
    }

    get labels() {
        return this.config.labels;
    }
    set labels(value) {
        if (!value.x && !value.y) { throw 'Specify x and y labels. Null is allowed.'; }
        this.config.labels = value;
    }

}

var defaults = {
    element: '#graph',
    height: 500,
    width: 500,
    labels: { x: 'Letter', y: 'Frequency' },
    data: [{ letter: 'A', value: 0.55 }, { letter: 'B', value: 0.10 }, { letter: 'C', value: 0.25 }]
};
