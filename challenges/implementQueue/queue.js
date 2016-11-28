function processData(input) {
    //Enter your code here
    var queue = [];
    input = input.split('\n');
    for(var x = 0; x < input.length; x++){
        var item = input[x];
        item = item.split(' ');
       if(item[0] === '1'){
           queue.unshift(item[1]);
       } else if (item[0] === '2'){
           queue.pop();
       } else if (item[0] === '3'){
           console.log(queue[queue.length -1]);
       }
    }
       
    
    
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
