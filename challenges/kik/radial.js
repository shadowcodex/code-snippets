function kikCode(userId) {
    var b1, b2, b3, b4, b5, b6, d1, d2, d3, d4, d5, d6;
    var b = parseInt(userId, 10).toString(2); // binary
    b = ("0000000000000000000000000000000000000000000000000000" + b).slice(-52); // pad
    b = b.split('').reverse().join(''); // reverse binary
    b1 = b.substring(0,3);
    b2 = b.substring(3,7);
    b3 = b.substring(7,15);
    b4 = b.substring(15,25);
    b5 = b.substring(25,37);
    b6 = b.substring(37,52);
    
    // 360 / bits
    d1 = 360/3;
    d2 = 360/4;
    d3 = 360/8;
    d4 = 360/10;
    d5 = 360/12;
    d6 = 360/15;
    
    var arr = [];
    c(arr,b1,d1,1);
    c(arr,b2,d2,2);
    c(arr,b3,d3,3);
    c(arr,b4,d4,4);
    c(arr,b5,d5,5);    
    c(arr,b6,d6,6);
    return arr;
}

c = (a,b,d,l) => {
    //console.log(b,d,l)    
    b = b.split(''); // split into array for looping       
    // console.log(b.join('').replace(/1/g,''))
    if(b[0] == 1 && b[b.length-1] == 1 && b.join('').replace(/1/g,'') != ''){
        // ends connect shift beginning set to end. And not an entire string of 1's
        for(var x = 0; x < b.length; x++){
            if(b[x] == 1){
                b[x] = 0;
                b.push(1);
            } else {
                // end of connected segement
                break;
            }
        }
    }    
    b.push(0);
    //console.log(b);
    var radialLocation = 0;
    var firstCord = 0;
    var secondCord = 0;
    var stack = [];
    for(var x = 0; x < b.length; x++){
        var p = stack.pop();
        if(p){ // ==1 && ~undefined && ~0
            // continuing segment 
            if(b[x]==0){
                secondCord = radialLocation;
                a.push([[l, firstCord],[l,secondCord]]);
                radialLocation+=d;
                firstCord=0;
                secondCord=0;
            } else {
                stack.push(1);
                secondCord = radialLocation;
                radialLocation+=d;
            }
        } else {
            firstCord = 0;
            secondCord = 0;
            if(b[x]==0){
                stack.push(0);
                radialLocation+=d;
            } else {
                stack.push(1);
                firstCord = radialLocation;
                radialLocation+=d;
            }
            // new segment or 0
        }                
    }
    return a;
}
