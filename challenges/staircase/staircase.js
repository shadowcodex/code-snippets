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
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function main() {
    var n = parseInt(readLine());
    var currentString = '';
    for(var i = 1; i <= n; i++) {
        for(var x = 0; x < n - i; x++) {
            currentString += ' ';
        }
        for(var y = 0; y < i; y++) {
            currentString += '#';
        }
        console.log(currentString);
        currentString = '';
    }
}
