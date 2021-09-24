var nodesVisited = [];
var leader = 0;
var mode = 'reverse';
var runTimes = [];
var raw = getRawData('SCC2.txt');
console.table(raw);
var graph = [];
main();

function getRawData(fileName){
    var array = [];
    var fs = require('fs');
    var graph = fs.readFileSync(fileName, 'utf8').split(/\r\n/);
    for(var i = 0; i < graph.length; i++){
        array[i] = (graph[i].split(' '));
    }
    return array;
}

function convertRawData(raw){
    var graph = [];
    for(var i = 1; i <= raw[raw.length-1][0]; i++){
        graph[i] = [];
    }
    for(var j = 0; j < raw.length; j++){
        graph[raw[j][0]].push(raw[j][1]);    
    }
    return graph;
}

function reverseArcs(raw){
    var graph = [];
    for(var i = 1; i <= raw[raw.length-1][0]; i++){
        graph[i] = [];
    }
    for(var j = 0; j < raw.length; j++){
        graph[raw[j][1]].push(raw[j][0]);    
    }
    return graph;
}

function DFS(graph, start){
    var node;
    addToVisited(start);
    for(var i = 0; i < graph[start].length; i++){
        node = graph[start][i];
        if(!isVisited(node)){
            leader++;
            DFS(graph, node);
        }
    }
}

function isVisited(node){
    console.table(nodesVisited);
    for(var i = 0; i < nodesVisited.length; i++){
        if(node == nodesVisited[i]){
            return true;
        }
    }
    return false;
}

function addToVisited(node) {
    nodesVisited.push(node);
}

function main(){
    if(mode == 'normal'){
        graph = convertRawData(raw);
        console.table(graph);
    }else if(mode == 'reverse'){
        graph = reverseArcs(raw);
        console.table(graph);
    }
    for(i = graph.length - 1; i >= 0; i--){
        var node = graph[i];
        if(!isVisited(node)){
            leader = 0;
            DFS(graph, node);
            runTimes.push(leader);
        }
    }
    console.table(runTimes);
}