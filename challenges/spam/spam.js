spamDetection = (m, s) => {
    var tm = m.length, //total messages
        wc = 0, // word count less than 5
        ssc = 0, // spam signal count
        ss = 0, // temp spam signal count
        cs = [], // contained spam signals
        umh = {}, // hash(json) of users contains following setup
        // {
        //   "userid": {
        //     "id": userid,
        //     "mh": {
        //       "hash": count of messages at this hash,
        //       ...
        //       "n_hash": count of messsages at this hash,
        //      },
        //     "c": count of messages
        //   }
        // }
        mh = {}, // hash of messages    
        fd = [], // array of final data
        ul = "", // user list as string
        ml = "", // message list as string
        sl = "" // spam signals list as string
    // begin data setup
    for(var i = 0; i < m.length; i++){
      // check word count (90%)
        if(m[i][0].toString().match(/[a-z|A-Z]+/g).length < 5) wc++; // increase count of msgs with less than 5
      // end word count
        
        
        
      // check same user same message (50%)
        if(!umh[m[i][1]]){ // create user hash if not created already
            umh[m[i][1]] = {}
        }        
        if(!umh[m[i][1]].mh){// create user message hash if not created already
            umh[m[i][1]].mh = {}
        }
        umh[m[i][1].toString()].id = m[i][1].toString(); // just reset it each time. Faster than check/set
        
        if(umh[m[i][1]].mh[m[i][0].toString()]){ // check if message exist. if so increment it
            umh[m[i][1]].mh[m[i][0].toString()]++;
        } else { // if not create it
            umh[m[i][1]].mh[m[i][0].toString()]=1;
        }
        if(umh[m[i][1]].c){ // checks that we have created count. if so increment it
            umh[m[i][1]].c++;
        } else {// if not create it
            umh[m[i][1]].c=1;
        }                
      // end same user message
             
        
        
      // check all messages same message (50%)
        if(mh[m[i][0]]){ // check if hash created. if so increment
          mh[m[i][0]]++;        
        } else { // if not create it
          mh[m[i][0]] = 1;
        } 
        
      // end message same message
      
        
        
      // check signal words (50%)
        var ma = m[i][0].toString().split(/[^a-z|A-Z]+/);        
        for(var q = 0; q < ma.length; q++){
            for(var x = 0; x < s.length; x++){ // loop through all signals
                if(ma[q].toLowerCase() == s[x].toLowerCase()) { 
                    // check if it contains current signal word
                    ss++; // increase temp signal count
                    cs.push(s[x]); // push signal word into an array containing all found ones             
                }
            } 
        }
                
        if(ss > 0){
          ssc++ // if we found at least one then increment message count that contains signalw ords  
        } 
        ss = 0; // reset temp signal count
      // end signal
    }   
    
    // end data setup
    // console.log(umh, mh);
    
    // begin validation 
    
    // check msgs w/ less than 5 word count against total count of messages
    if(wc / tm > 0.90) { 
        fd.push("failed: " + ratio(wc,tm));
    } else {
        fd.push("passed");
    }
    
    // check user same message      
    for(var u in umh){
        for(var mgs in umh[u].mh){            
            if(umh[u].c > 1 && umh[u].mh[mgs]/umh[u].c > 0.50){
                ul += " " + u;
                break;
            }
        }
    } 
    if(ul.length > 0){
        fd.push("failed:" + ul);
    } else {
        fd.push("passed")
    }
    
    // same content messages
    for(var msg in mh){
        if(tm > 1 && mh[msg] / tm > 0.50){
            ml += " " + msg;
        }
    }
    
    if(ml.length > 0){
        fd.push("failed:" + ml);
    } else {
        fd.push("passed");
    }
    
    if(ssc / tm > 0.5){
        var it = rd(cs).sort();
        for(var msg = 0; msg < it.length; msg++){
            sl += " " + it[msg];
        }
        fd.push("failed:" + sl);
    } else {
        fd.push("passed");
    }
    // end validation
    return fd;
}

rd = arr => {
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;
}

gcd = (p,q) => {
    if (q == 0) return p;
    else return gcd(q, p % q);
}

ratio = (a,b) => {
   var tgcd = gcd(a,b);
   return a/tgcd + "/" + b/tgcd;
}
