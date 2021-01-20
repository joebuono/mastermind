
/*


Actually, first, I'm very curious to see what happens if we do a secret code of length 5!


Write a test suite!

- First, generate every possible permutation (1296 for a code of 4)

- Then, run the solver algorithm 100 times for each secret code

- Store the average number of turns it takes to solve each code, along with the code

- Then, return an array sorted by the average number of turns it takes to solve each code

- Then, see if you can reduce this through randomization in selecting colors (and perhaps other clever tricks!)







Test these secret codes:

// Have (thus far) fixed all secret codes stumping the algorithm!

// Less important tests:

[ 'r', 'b', 'r', 'b' ] // solves it in 7 steps; seems inefficient

['r', 'r', 'r', 'p'] // this involves a fascinating optimization that I haven't yet coded!

*/

