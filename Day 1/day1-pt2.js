function ReverseCaptcha(code) { // Takes a string!
    let midpoint;
    let sum = 0;

    for (i=0; i<code.length; i++) {
        if (code.length/2 + i >= code.length) {
            midpoint = Math.abs(code.length / 2 - i);
            console.log('foo');
        } else {
            midpoint = code.length/2 + i;
            console.log('bar');
        }


        if (code[i] === code[midpoint]) {
            sum += parseInt(code[midpoint], 10);
        }
    }

    return sum;
}

