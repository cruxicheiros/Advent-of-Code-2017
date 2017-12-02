// So this one won't actually work with the number you're given to test it with.
// Smaller numbers are fine, but JavaScript can't store ints as big as the one you're given to process.
// However, I converted this to a python program (day1.py) and it came up with the right answer, so the
// logic is alright - it's just the language.

function ReverseCaptcha (code) { //Takes an int
    let previous_end_digit = code % 10;
    let working_code = (code - previous_end_digit) / 10;
    let current_end_digit = working_code % 10;

    let sum = 0;

    while (working_code > 9) {
        current_end_digit = working_code % 10;

        if (current_end_digit === previous_end_digit) {
            sum += current_end_digit;
        }

        working_code = (working_code - current_end_digit)/10;
        previous_end_digit = current_end_digit;
    }


    if (working_code === current_end_digit) {
        sum += working_code;
    }

    if (working_code === code % 10) {
        sum += working_code;
    }


    return sum;

}