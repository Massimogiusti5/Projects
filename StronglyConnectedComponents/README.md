# Strongly Connected Components
Author: Massimo Giusti

## Summary:
- Kosajaru.js returns the strongly connected components of a graph by implementing Kosajaru's two-pass algorithm.
- A Strongly Connected Component is defined as a node in a graph that is reachable by every other node in the graph

## Algorithm:
- The algorithm to find the strongly connected components of a graph relies heavily on Depth First Search. First, DFS is ran on the graph. The goal of this DFS is to get the finishing time of every node in recursion. To get the time, the graph's pointers are reversed, then by pushing visited nodes at the end of recursion into another array, the order that they are pushed determines the finishing times. 
- The second pass through the data yields the leaders of the graph. DFS is ran on the nodes with the longest run time on the original graph, and the first node of that DFS is a leader to each reachable node in that search.
- The array of leaders is essentially a graph of all the nodes a leader can reach. 
- Then the nodes with > 200 nodes reachable are returned as strongly connected components.

## Data:
- The data for the graph is stored in SCC.txt (SCC2.txt is a much simpler example). On each line is an edge, from node a to node b. This data was parsed into a 2D array that holds each node as an index, and the nodes it connects to as the value of that index. 
- Everything in this algorithm is stored in an array, the graph, reverse graph and even the runtimes and leaders.
