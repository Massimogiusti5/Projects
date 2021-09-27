//globals
var leader = 0;
var leaders = [];
var t = 0;
var raw = [];
var runTimes = [];
var graph = [];
var nodesVisited = [];

main();

/*
 * Main follows each step of the algorithm. First, it parses data
 * Then it Passes through the reverse graph, calculates finishing times
 * Passes through again to find leaders, then leaders > 200 are returned as SCCs
 */ 
function main(){
    //step 1: parse data and DFS reverse graph
    raw = getRawData('SCC.txt');
    var revGraph = reverseArcs(raw);
    resetVisited(revGraph);
    Pass1(revGraph);
    
    //step 2: DFS graph and get leaders
    graph = convertRawData(raw);
    resetVisited(graph);
    resetLeaders(graph);
    Pass2(graph);

    //step 3: get SCCs
    var SCCs = makeSCC(leaders);
    for(var i = 0; i<SCCs.length; i++){
        //all leaders with nodes reachable > 200 are SCCs
        if(SCCs[i].length > 200){
            console.log("SCC: " + i + " length: " + SCCs[i].length);
        }
    }
}

/* 
 * Get data into an array that mimics file format, node1 -> node2
 * Each line of data file represents an edge in the graph,
 * first element is the node, second element is the node it points to
 */
function getRawData(fileName){
    var array = [];
    var fs = require('fs');
    var graph = fs.readFileSync(fileName, 'utf8').split(/\r\n/);
    for(var i = 0; i < graph.length; i++){
        array[i] = (graph[i].split(' '));
    }
    return array;
}

/* 
 * Converts array representing raw data into a more useful format
 * Input: result of getRawData 
 * Output: an array that has a list of all sides a node(index) points to 
 */
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


/*
 * Reverses the pointers to each node
 * Input: result of getRawData
 * Output: array of same format with the elements swapped 
 */
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




/*
 * DFS1 recursively searches the graph and assigns finishing times to nodes
 * Finishing time is defined by the order of nodes that recursion ends on
 * Input: REVERSED graph and current node
 * Output/Result: an array with all the nodes in order of finishing times
 */
function DFS1(graph, start){
    var node;
    addToVisited(start);
    //for each reachable node, DFS
    for(var i = 0; i < graph[start].length; i++){
        node = graph[start][i];
        if(!isVisited(node)){
            DFS1(graph, node);
        }
    }
    //else node is considered finished, and pushed to runTimes
    t++;
    setRunTime(start, t);
}

//for each node of reversed graph, DFS
function Pass1(graph){
    t = 0;
    for(i = graph.length-1; i > 0; i--){
        var node = i;
        if(!isVisited(node)){
            DFS1(graph, node);
        }
    }
}

/*
 * DFS2 follows a similar procedure to DFS1, only going in order of lowest finishing nodes first
 * The result of this DFS is to find the leaders, a leader is defined as the first node of the DFS
 * leaders are chosen based on the logest finishing times in DFS1.
 * Input: graph and current node
 * Output: array of leaders, a list of each node and its leader
 */

function DFS2(graph, start){
    var node;
    addToVisited(start);
    leaders[start] = leader;
    //for each reachable node, DFS
    for(var i = 0; i < graph[start].length; i++){
        node = graph[start][i];
        if(!isVisited(node)){
            DFS2(graph, node);
        }
    }
}

//for each node of graph, DFS and set array of leaders
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

/*
 * makeSCC takes the result of pass2, the array of leaders, and maps a value of all reachable nodes to that leader
 * Input: array of leaders
 * Output: array of all reachable nodes for the leaders
 */
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

//Helper functions:

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
