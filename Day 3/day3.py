#Done in a single pass, not refactored, but it works for my input and (as far as I'm aware) any that aren't squares.
#I'll refactor this when I've done pt 2 and can stand to look at this again!

from math import floor, sqrt

sqrt_lower_bound = int(floor(sqrt(input)))

if sqrt_lower_bound % 2 == 0: #Locate the closest lower square of an odd number.
	sqrt_lower_bound -= 1

lower_bound = sqrt_lower_bound**2
upper_bound = (sqrt_lower_bound + 2)**2 #Locate the closest upper square of an odd number.

nums_range = list(range(lower_bound + 1, upper_bound + 1)) # Get the list of numbers in the same loop (lower_bound < x <= upper_bound)

placement = nums_range.index(input + 1)/float(upper_bound - lower_bound) # Work out what quarter of the numbers the number is in.

if placement <= 0.25: #Further subdivide the list to only have the numbers on the same side as the input.
	part_range = nums_range[:int(0.25*len(nums_range))]
elif placement <= 0.5:
	part_range = nums_range[int(0.25*len(nums_range)):int(0.5*len(nums_range) - 1)]
elif placement <= 0.75:
	part_range = nums_range[int(0.5*len(nums_range)):int(0.75*len(nums_range) - 1)]
else:
    part_range = nums_range[int(0.75*len(nums_range)):int(len(nums_range) - 1)]
	
print(len(part_range) - part_range.index(input))
