var x = "3141592653589793238462643383279502884197169399375105820974944592";
var y = "2718281828459045235360287471352662497757247093699959574966967627";

function halfString(string){
    return string.slice(0,(string.length/2));
}
function secondHalf(string){
    return string.slice((string.length/2), string.length);
}

function main(){
    var result = multiply(x,y);
    console.log(result);
}

function multiply(x,y){
    if(x.length == 1 && y.length == 1){
        var result = x*y;
    }else{
        var a = halfString(x);
        var b = secondHalf(x);
        var c = halfString(y);
        var d = secondHalf(y);
        result = 
        (Math.pow(10, x.length) * (multiply(a,c))) + 
        (Math.pow(10,x.length/2)*(multiply(a,d)+(multiply(b,c)))) +
        multiply(b,d); 
    }
    return result;
}
main(x,y);