rateLimit = (s, r, start) => {
    var h = {} // user hash
    var f = [] // final list of blocked transactions
    for(var x = 0; x < s.length; x++){
        s[x].unshift(1);
    }
    for(var x = 0; x < r.length; x++){
        r[x].unshift(0);
    }    
    var b = s.concat(r);
    for(var x = 0; x < b.length; x++){
        b[x].unshift(x);
    }
    //console.log(b);
    var c = (a, b) => {
       if (a[2] < b[2]) return -1;
       if (a[2] > b[2]) return 1;
       if (a[1] < b[1]) return -1;
       if (a[1] > b[1]) return 1;
       if (a[0] < b[0]) return -1;
       if (a[0] > b[0]) return 1;
       return 0;
     }
    b.sort(c);
    //console.log(b);
    //console.log('##########end setup##########');
    var pd;
    for(var x = 0; x < b.length; x++){
        // if(pd == undefined){
        //     pd = new Date(b[x][2]*1000);
        //     pd = new Date(pd.setDate(pd.getDate()-1));
        //     pd = pd.getUTCFullYear().toString() + pd.getUTCMonth().toString() + pd.getUTCDate().toString();
        // } 
        if(pd == undefined){
            pd = b[x][2] + 86400 - (b[x][2] % 86400);
        }       
        // var cd = new Date(b[x][2]*1000);
        // cd = cd.getUTCFullYear().toString() + cd.getUTCMonth().toString() + cd.getUTCDate().toString();
        if(b[x][2]>=pd){
            for(var user in h){
                h[user] = start;
            }            
        }
        //console.log(b[x], b[x][0], pd, cd)
        if(b[x][1] == 1){
            //we are sending - decrease limit
            var flag = true;
            for(var y = 3; y < b[x].length; y++){               
                // each user
                
                if(!(b[x][y] in h)) {
                    //console.log("create: ", b[x][y], "account")
                    h[b[x][y]] = parseInt(start);
                } 
                // else if(cd != pd){
                //     //console.log("reset: ", b[x][y], "account")
                //     h[b[x][y]] = parseInt(start);
                // }
                
                if(h[b[x][y]] <= 0){
                    // crap we can't send the batch
                    //console.log("block batch: ", b[x][0],"- for user: ", b[x][y])
                    f.push(b[x][0]);
                    flag = false;
                    break;
                }                
            }
            if(flag){
                for(var y = 3; y < b[x].length; y++){ 
                    //console.log("decrease: ", b[x][y])
                    h[b[x][y]]--;
                }
            }
            //console.log(h);
        } else {
            // we are reciving - increase limit
            
            for(var y = 3; y < b[x].length; y++){
                // each user
                if(!(b[x][y] in h)) {                    
                    //console.log("create: ", b[x][y], "account")
                    h[b[x][y]] = parseInt(start);
                } 
                // else if(cd != pd){
                //     //console.log("reset: ", b[x][y], "account")
                //     h[b[x][y]] = parseInt(start);
                // }                 
                
                //console.log("increase: ", b[x][y])
                h[b[x][y]]+=1;                                                    
                //console.log(h);
            }
        }
        pd = b[x][2] + 86400 - (b[x][2] % 86400);
    }
    return f;
}
