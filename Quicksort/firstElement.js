var fs = require('fs');
var comparisons1=0;
var comparisons2=0;
var array = [];
var temp = fs.readFileSync('nums.txt', 'utf8').split('\n');
for (i=0; i<temp.length;i++){
    array[i] = parseInt(temp[i]);
}

var comparisons=0;


function swap(a,b){
    if(a!=b){
        var temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }
 }
 
function partition(min,max){ 
    if(max - min > 1){
        var pivot = min;
        comparisons1+=max-min;
        for(var i = min+1; i <= max; i++){
            comparisons2++;
            if(array[i] < array[pivot]){
                swap(pivot+1, i);
                swap(pivot+1, pivot);
                pivot++;
            }
        }
        partition(min, pivot-1);
        partition(pivot+1, max);
    }
}
partition(0,array.length-1);
console.log(array);
console.log(comparisons1);
console.log(comparisons2);

// num comp = 1879866