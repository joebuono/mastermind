/*

Test these secret codes:

// More important tests:
It's bugging out on these secret codes for some reason:

['r', 'b', 'b', 'g', 'b']
['r', 'b', 'b', 'g', 'g']
['r', 'b', 'b', 'g', 'y']
['r', 'b', 'b', 'g', 'o']


Write a test suite!

- First, generate every possible permutation (1296 for a code of 4)

- Then, run the solver algorithm 100 times for each secret code

- Store the average number of turns it takes to solve each code, along with the code

- Then, return an array sorted by the average number of turns it takes to solve each code

- Then, see if you can reduce this through randomization in selecting colors (and perhaps other clever tricks!)


// Less important tests:

[ 'r', 'b', 'r', 'b' ] // solves it in 7 steps; seems inefficient

['r', 'r', 'r', 'p'] // this involves a fascinating optimization that I haven't yet coded!

Write automated tests with Jest, Mocha/Chai, CircleCI, etc
- This is the perfect opportunity to do that!!
- Great for your resume too

You should program the algorithm to randomly select among unused colors. 
- As in, don't always go in the same order ('r', 'b', 'g', 'y', 'o', 'p')
- Randomizing may give you better overall results
- Wait until you write scalable tests to try this out though

Program the clever optimization for ['r', 'r', 'r', 'b'] 
- Your second move is ['r', 'r', 'r', 'r']
- Your third move is ['g', 'g', 'g', 'y'] ***
*** Very clever! Code this up. 


Game mode!
- Can you beat the algorithm one-on-one?!
- That'd be fun!

Learning mode
- Visually see what the algorithm is doing

Code breaker
- Normal game mode

Code maker
- Can you make a code that stumps the algorithm?!


There's A LOT of interesting stuff you can do now with statistics and testing
- For example, generate every possible color combination, then run the algorithm on each one like 100 times
- Keep track of the average number of turns it takes the algorithm to solve each secret code
- Then, introduce randomization to the algorithm when it selects which colors to introduce next, and see if that improves the performance

Bonus: Use D3 to graph your results!!


Can you make a 5-code mastermind game?

*/

