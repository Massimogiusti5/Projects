//Main runs sort on different sized arrays from the data set, returns total comparisons
var comparisons=0;

function main(){
    testCase(loadTestCaseFromFile(10),21);
    testCase(loadTestCaseFromFile(100),518);
    testCase(loadTestCaseFromFile(10000),138382);
}

/* 
 * Reads set amount of elements from data file
 * Maps data to array
 * Input: number of elements to add to array
 * Output: unsorted array
 */
function loadTestCaseFromFile(maxelems){
    var fs = require('fs');
    var array = [];
    var temp = fs.readFileSync('quicksort.txt', 'utf8').split('\n');
    for (i=0; i<maxelems;i++){
        array[i] = parseInt(temp[i]);
    }
    return array;
}

//Elementary swap helper function
function swap(array, a,b){
    if(a!=b){
        var temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }
 }
 
/*
 * Calculates the median of given array by comparing the first last and middle elements
 * Input: array<int>, value of first and last indeces
 * Output: Median of 3 compared values
 */
function getMedian(array, low, high){
    var middle = Math.floor((high-low)/2) + low;
    if(array[middle] < array[high] && array[middle] < array[low]){
        if(array[high] < array[low]){
            return high;
        }else{
            return low;
        }
    }else if(array[middle] > array[high] && array[middle] > array[low]){
        if(array[high] > array[low]){
            return high;
        }else{
            return low;
        }
    }else{
        return middle;
    }
}

/*
 * Recursive sorting function, partitions around median then recurses on adjacent sub-arrays
 * Assume partitioned element is sorted & complexity of partitioning is O(n)
 * Input: array<int>, value of first and last indeces
 * Output: sorted array
 * Base Case: 1 element array
 */
function partition(array,low,high){ 
    if(high - low > 0){
        //add n to comparisons
        comparisons += high - low;
        medianIndex = getMedian(array, low, high);
        //partitioning works best when chosen index is moved to front of array
        swap(array, medianIndex, low);
        pivot = array[low];
        var i = low +1;
        for(var j=low+1; j<=high; j++){
            if(array[j] < pivot){
                swap(array, j, i);
                i++;
            }
        }
        swap(array, low, i-1);
        //recurse
        partition(array,low,i-2);
        partition(array,i, high);
    }
}

//Tests result of sorting against expected comparisons
function testCase(array, expected) {
    comparisons=0
    partition(array,0,array.length-1);
    console.log(array);
    console.log("comparisons: " + comparisons + " expected: " + expected);        
}

main();