class NumGenerator {
    constructor(value, factor, multiple) {
        this.value = value;
        this.factor = factor;
        this.multiple = multiple;
    }

    updateValue() {
        this.value = (this.value * this.factor) % 2147483647;

        while (this.value % this.multiple !== 0) {
            this.value = (this.value * this.factor) % 2147483647;
        }
    }

    getValue() {
        return this.value;
    }

    getLowestHalf() {
        let bin_value = this.value.toString(2);

        while (bin_value.length < 16) {
            bin_value = '0' + bin_value;
        }

        bin_value = bin_value.slice(bin_value.length - 16);

        return bin_value;
    }
}


console.time('a');

let generatorA = new NumGenerator(516, 16807, 4);
let generatorB = new NumGenerator(190, 48271, 8);


let match_total = 0;

for (let i = 0; i < 5000000; i++) {
    if (generatorA.getLowestHalf() === generatorB.getLowestHalf()) {
        match_total++;
    }

    generatorA.updateValue();
    generatorB.updateValue();

}

console.log(match_total);
console.timeEnd('a');
