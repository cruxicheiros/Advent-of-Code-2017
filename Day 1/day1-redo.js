function ReverseCaptcha(code) { // Takes a string!
    let next_digit;
    let current_digit;
    let sum = 0;

    for (i=0; i<code.length; i++) {
        next_digit = code[(i+1) % code.length];
        current_digit = code[i];

        if (current_digit === next_digit) {
            sum += parseInt(next_digit, 10);
        }
    }

    return sum;
}

console.log(ReverseCaptcha("112211"));