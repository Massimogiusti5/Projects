# Minumum Cuts to a Graph
Author: Massimo Giusti

## Summary:
- MinCuts.js outputs the minimum cuts of a given graph via the MinCuts theorem.
- Input: there are 4 data files in this directory which contain the data to graphs, the first element of each line is the number of a node, and each subsequent element is a pointer to another node. 
- Program: Since the MinCuts theorem relies heavily on random selection, results of each execution of the algorithm can vary, therefore the algorithm is ran multiple times and the lowest result is saved. (Default is 10 trials, many more trials are needed for accurate results on larger graphs)
## Algorithm:
- The algorithm follows an iterative solution, a node at random is selected and removed from the graph. Each node that points to that graph collapses into a single node. any resulting pointers that point from the new node to the new node (self references) are also eliminated. Nodes continue to be selected until the graph has 2 nodes left. 

## Data Structure
- The data structure chosen for this algorithm was an array, by parsing the data into a 2-dimensional array, each index represents a node, and the array contained in that index holds the references to linked nodes. 

## Functionality
- There is a debug mode which logs each step of the algorithm