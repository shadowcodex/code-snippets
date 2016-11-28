function primeDistance(number) {    
    number = parseInt(number);
    var nextH = number, nextL = number;    
    var isPrimeH, isPrimeL;
    if(number == 0){return 2;}    
    if(number == 1){return 1;}
    if(number == 2){return 0;}
    if(isPrime(number) && number % 2 != 0){return 0;}
    
    if(nextH % 2 ==0){
       nextH++;
    } else {
       nextH += 2;
    }

    if(nextL % 2 == 0){
        nextL--;
    } else {
        nextL -= 2;
    }    
    
    // find next higher or lower prime
    while(true){ 
        isPrimeH = isPrime(nextH);
        isPrimeL = isPrime(nextL);
        if(isPrimeH || isPrimeL){
            break;
        } else {
            nextH += 2;
            nextL -= 2;
        }
    }       
    
    if(isPrimeH){
        return nextH - number;
    } else {
        return number - nextL;
    }
    
    
}

function isPrime(num) {
    //-n, 0, 1 not allowed
    if (num < 2) return false;
        
    //check for single digit primes
    if (inArray(num, [2, 3, 5, 7])) return true;

    //prime numbers end in 1, 3, 7 or 9 no matter how long they are
    //we know we are using only o0d numbers so check if it ends in 5. If so false.
    if (String(num).substr(-1) == 5) return false;
    
    
    // check if it is divisible by the any of the numbers below it
    var limit = Math.sqrt(num);
    for (var i = 3; i <= limit; i+=2) {
            if (num % i == 0) return false;            
    }

    //num is prime - divisible by itself and 1 only
    return true;
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}
