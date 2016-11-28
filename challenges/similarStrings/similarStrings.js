function processData(input) {
  // get input
  
    var n=0,q=0,i=0,j=0,l=0,flag=0,offset=0,currCount=0;
    var nQ = readLine().split(' ');
    n = parseInt(nQ[0]);
    q = parseInt(nQ[1]);
    // read length of string and number of queries
    var str = readLine();    
    // read in string
    for(var d = 0; d< q; d++){
        // read query  (i, j)
        var iJ = readLine().split(' ');
        i = parseInt(iJ[0]);
        j = parseInt(iJ[1]);
        if(j==i){
            console.log(n); // length of 1 will equal length of string
            continue;
        } else {
            offset = j-i;
            l = offset + 1;
            i--;
            for(var b = 0; b < (n - l + 1); b++){
                flag = 1;
                if(b!=i){
                    for(var x = 0; x < offset; x++){                       
                        for(var y = x+1; y < l; y++){
                            //console.log(y,b);
                            //console.log(str[x+i] + "=" + str[y+i] + " vs " + str[x+b] + "=" + str[y+b]);
                            //console.log((x+i) + "=" + (y+i) + " vs " + (x+b) + "=" + (y+b));
                            if((str[x+i] == str[y+i]) == (str[x+b] != str[y+b])){
                                flag = 0;
                                x = l;
                                break;
                            }
                        }
                    }
                }
                currCount += flag;
            }
        }
        console.log(currCount);
        currCount = 0;
    }
} 

process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    processData();   
});

function readLine() {
    return input_stdin_array[input_currentline++];
}
