# Multiplication
Author: Massimo Giusti

## Summary:
- multiplication.js takes 2 inputs (global variables in the scope of the file) and multiplies them using a recursive algorithm.

## Algorithm:
- Each iteration of recursion splits the 2 inputs each in half (a, b, c, d). If the base case is not met, then the algorithm follows this formula:
- int1 * int2 = (10^int1.length) * (a * c) + (10^int1.length/2) * (a * d + b * c) + (b * d) 