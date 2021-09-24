var a = [2,5,6,3,1,7,8,9,0];

function swap(array,a,b){
   if(a!=b){
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
    }
}

function partition(array, pivot){ 
    swap(array,0,pivot);
    pivot = 0;
    for(var i = 1; i < array.length; i++){
        if(array[i] < array[pivot]){
            swap(array, pivot+1, i);
            swap(array, pivot+1, pivot);
            pivot++;
        }
    }
    console.log(array);
}
partition(a, 3);
