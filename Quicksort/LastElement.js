
function loadTestCaseFromFile(maxelems)
{
    var fs = require('fs');
    var array = [];
    var temp = fs.readFileSync('quicksort.txt', 'utf8').split('\n');
    for (i=0; i<maxelems;i++){
        array[i] = parseInt(temp[i]);
    }
    return array;
}

function swap(array, a,b){
    if(a!=b){
        var temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }
 }
 
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

function partition(array,low,high){ 
    if(high - low > 0){
        comparisons += high - low;
        medianIndex = getMedian(array, low, high);
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
        partition(array,low,i-2);
        partition(array,i, high);
    }
}

function testCase(array, expected) {
    comparisons=0
    partition(array,0,array.length-1);
    console.log(array);
    console.log("comparisons: " + comparisons + " expected: " + expected);        
}

var comparisons=0;

testCase([3,2,1,4,5],6)
testCase([4,3,2,5,1],6)
testCase([2,5,1,3,4],6)
testCase([4,1,2,5,3],6)
testCase([1,6,8,10,7,5,2,9,4,3],21)
testCase(loadTestCaseFromFile(10),21)
testCase(loadTestCaseFromFile(100),518)
testCase(loadTestCaseFromFile(10000),0)


// first: 162085
// last: 164123
// median: 138382