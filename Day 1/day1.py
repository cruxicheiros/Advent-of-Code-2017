def ReverseCaptcha(code):
    previous_end_digit = code % 10
    working_code = (code - previous_end_digit) // 10
    current_end_digit = working_code % 10
    sum = 0;
    
    while working_code > 9:
        current_end_digit = working_code % 10
        
        if current_end_digit == previous_end_digit:
            sum += current_end_digit
        

        working_code = (working_code - current_end_digit) // 10
        previous_end_digit = current_end_digit
    
    if working_code == current_end_digit:
        sum += working_code
        
    if working_code == code % 10:
        sum += working_code
    
    return sum

