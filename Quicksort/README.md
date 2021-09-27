# Quicksort
Author: Massimo Giusti

## Summary:
- The contents of this directory are 3 js files, each work up to a modified quicksort algorithm.
- Partition.js has a simple functionality, given an array and a value, partition the array around the value.
- firstElement.js runs quicksort recursively, but by partitioning around the ith element instead of a random one.
- MidSort.js runs a modified quicksort as well. Instead of choosing random partitions, it partitions around the median value of the input array. It returns the number of comparisons done when running the algorithm.
- Quicksort.js runs the true randomized partitioning algorithm.


## Algorithm:
- The recursive quicksort algorithm works by splitting the array by the median(or random index) and partitioning the two parts until the base case is hit. The array ends sorted because a partitioned elements can be assumed as sorted.
- The base case is 1 element, which is assumed to be sorted.
- The median of the array is determined by looking at the first, last and middle elements of the array and choosing the median of those.
- The output of the algorithm is the number of comparisons done while sorting. This essentially measures the complexity of the algorithm. Since the complexity of partitioning is O(n), comparisons is increased by n on each recursive call, where n is the length of the array in that recursive call.

## Data:
- The data to be sorted is stored in quicksort.txt. The file format is each line is the index, and the value of that line is the corresponding number

