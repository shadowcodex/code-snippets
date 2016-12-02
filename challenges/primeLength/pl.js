function primeLength(n) {
    var s=''
    2<n ? s+='2' : s
    n%2==0 ? n-- : n-=2
    for(n; n > 0; n-=2)
        y(n) ? s+=n : s
    
    return s.length    
}

y = (n) => {
    //-n, 0, 1 not allowed
    if (n < 2) return false  
        
    //check for single digit primes
    if (z(n, [2, 3, 5, 7])) return true

    //prime numbers end in 1, 3, 7 or 9 no matter how long they are
    //we know we are using only o0d numbers so check if it ends in 5. If so false.
    if (String(n).substr(-1) == 5) return false
    
    
    // check if it is divisible by the any of the numbers below it
    for (var i = 3; i <= Math.sqrt(n); i+=2) 
            if (n % i == 0) return false           
    
    //num is prime - divisible by itself and 1 only
    return true;
}

z = (n, h) => {
    var l = h.length
    for(var i = 0; i < l; i++) 
        if(h[i] == n) return true
    
    return false
}
