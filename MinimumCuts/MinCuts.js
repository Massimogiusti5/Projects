//globals
var array = [];
var debug = false;
var attempts=10;
var minResult=Number.MAX_VALUE;
var file = 'data.txt';

/*
 * Main gets data and runs n trials
 * Outputs lowest result
*/
function main(){
    for (var i=0; i< attempts; i++) {
        getData(file);    
        result=collapseEdge();
        console.log("attempt %s : %s \t min so far: %s",i,result,minResult);
        if (minResult > result) minResult=result;
    }
    console.log("the mincut is: " + minResult);
}

//Log functions for debug mode
function log(s) {
    if (debug) console.log(s);
}
function logTable(s) {
    if (debug) console.table(s);
}

/* 
 * Parses graph into a 2D array
 * Input: number of nodes
 * Output: array representing graph
 */ 
function makeArray(size){
    var array = [];
    for(var i = 0; i<=size-1; i++){
        array[i] = new Array(size).fill(0,0,size);
    }
    return array;
}

/*
 * Reads file and calls makeArray to parse data
 * Input: file name (global variable)
 * Output: N/A
 */

function getData(file){
    var fs = require('fs');
    //Data is parsed split first by new line for each index, then by tab for each element
    var graph = fs.readFileSync(file, 'utf8').split('\n');
    array = makeArray(graph.length);
    for(var i = 0; i < array.length; i++){
        var temp = (graph[i].split('\t'));
        for(var j = 1; j < temp.length; j++){
            //Pointers to other nodes is represented by a 1 in the array
            array[i][temp[j]-1] += 1;
        }
    }
}

/*
 * collapseEdge runs the main algorithm on the array
 * Output: last standing node in array after cuts
 */

function collapseEdge(){
    var size = array.length;
    var node1 = Math.round(Math.random(0,1)*(size-1));
    var node2 = Math.round(Math.random(0,1)*(size-1));
    log("initial graph:");
    logTable(array);
    while(array.length > 2){   
        log("testing with node1: %s \t node2: %s \t size: %s",node1,node2,size);
        if(array[node1][node2] > 0 && array[node2][node1] > 0 && node2 != node1){
            log("reducing the matrix, copynig %s into %s",node2,node1); 
            for(var i = 0; i < size; i++){
                array[node1][i] += array[node2][i];
                array[i][node1] = array[node1][i];
                array[i][i] = 0;
            }
            for(var j = 0; j < size; j++){
                array[j].splice(node2,1);
            }
            array.splice(node2,1);
            log("reduced graph:");
            logTable(array);
            size -= 1;
        }
        node1 = Math.round(Math.random(0,1)*(size-1));
        node2 = Math.round(Math.random(0,1)*(size-1));
    }
    return (array[0][1]);
}

main();