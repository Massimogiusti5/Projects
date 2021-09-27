
main();
function main(){
    testCase([2,3,5,6,7,4,1,3,4,5,6]);
    testCase(loadTestCaseFromFile(10));
    testCase(loadTestCaseFromFile(100));
    testCase(loadTestCaseFromFile(1000));
    testCase(loadTestCaseFromFile(10000));
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
    var temp = fs.readFileSync('data.txt', 'utf8').split('\n');
    for (i=0; i<maxelems;i++){
        array[i] = parseInt(temp[i]);
    }
    //console.table(array);
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
 * Recursive sorting function, partitions around random index then recurses on adjacent sub-arrays
 * Input: array<int>, value of first and last indeces
 * Output: sorted array
 * Base Case: 1 element array
 */
function partition(array,low,high){ 
    if(high - low > 0){
        var randomIndex = Math.round(Math.random() * (high - low) + low);
        //partitioning works best when chosen index is moved to front of array
        swap(array, randomIndex, low);
        pivot = array[low];
        var i = low +1;
        for(var j=low+1; j<=high; j++){
            if(array[j] < pivot){
                swap(array, j, i);
                i++;
            }
        }
        swap(array, low, i-1);
        //recurse around i-1: where the random index ends up
        partition(array,low,i-2);
        partition(array,i, high);
    }
}

//Tests result of sorting against expected comparisons
function testCase(array) {
    var test = true;
    console.log("Running quicksort on array length: " + array.length + " \n");
    partition(array,0,array.length-1);
    //console.table(array);
    for(var i = 0; i < array.length-1; i++){
        if(array[i] > array[i+1]){
            test = false;
        }
    }
    console.log("Test result: " + test + "\n");
}
