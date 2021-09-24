var leader = 0;
var leaders = [];
var t = 0;
var raw = [];
var runTimes = [];
var graph = [];
var nodesVisited = [];

main();

function main(){
    raw = getRawData('SCC.txt');
    var revGraph = reverseArcs(raw);
    //console.table(revGraph);
//pass1
    resetVisited(revGraph);
    Pass1(revGraph);
    //console.table(runTimes);
//pass2
    graph = convertRawData(raw);
    //console.table(graph);
    resetVisited(graph);
    resetLeaders(graph);
    Pass2(graph);
    //console.table(leaders);
//calc SCCs
    var SCCs = makeSCC(leaders);
    //console.table(SCCs);
    for(var i = 0; i<SCCs.length; i++){
        if(SCCs[i].length > 200){
            console.log("SCC: " + i + " length: " + SCCs[i].length);
        }
    }
}

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

function DFS1(graph, start){
    var node;
    addToVisited(start);
    for(var i = 0; i < graph[start].length; i++){
        node = graph[start][i];
        if(!isVisited(node)){
            DFS1(graph, node);
        }
    }
    t++;
    setRunTime(start, t);
}

function DFS2(graph, start){
    var node;
    addToVisited(start);
    leaders[start] = leader;
    for(var i = 0; i < graph[start].length; i++){
        node = graph[start][i];
        if(!isVisited(node)){
            DFS2(graph, node);
        }
    }
}


function setRunTime(node, pos){
    runTimes[pos] = node;
}

function isVisited(node){
    return nodesVisited[node] == 1;
}

function addToVisited(node) {
    nodesVisited[node] = 1;
}

function resetVisited(graph){
    for(i = 0; i < graph.length; i++){
    nodesVisited[i] = 0;
    }
}

function resetLeaders(graph){
    for(i = 0; i < graph.length; i++){
        leaders[i] = 0;
        }
}


function Pass1(graph){
    t = 0;
    for(i = graph.length-1; i > 0; i--){
        var node = i;
        if(!isVisited(node)){
            DFS1(graph, node);
        }
    }
}

function Pass2(graph){
    leader = null;
    for(i = graph.length-1; i > 0; i--){
        var node = runTimes[i];
        if(!isVisited(node)){
            leader = node;
            DFS2(graph, node);
        }
    }
}

function makeSCC(leaders){
    var SCCs = [];
    for(var j = 0; j < leaders.length; j++){
        SCCs[j] = [];
    }
    for(var i = 0; i<leaders.length; i++){
        SCCs[leaders[i]].push(i);
    }
    return SCCs;
}