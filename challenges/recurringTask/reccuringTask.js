function recurringTask(firstDate, k, daysOfTheWeek, n) {
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var firstNDates = [];
    var firstDay = firstDate.substring(0, 2);
    var firstMonth = months[parseInt(firstDate.substring(3, 5)) - 1];
    var firstYear = firstDate.substring(6,10);    
    firstNDates.push(firstDate);
    var mydate = new Date(firstMonth + " " + firstDay + ", " + firstYear);    
    console.log(mydate);
    var newDate = mydate;    
        
    
    var newDaysOfWeek = [];
    for(var y = 0; y < daysOfTheWeek.length; y++){
        newDaysOfWeek[y] = weekdays.indexOf(daysOfTheWeek[y]);
    }        
    
    for(var x = 1; x < n; x++){
        console.log(x);
        if(x % daysOfTheWeek.length == 0){
            // skip by week count
            newDate = new Date(newDate.getTime() + (86400000 * 7 * (k -1)));
        }
        var currentDay = newDate.getDay();
        var currentDayIndex = newDaysOfWeek.indexOf(currentDay);
        if(currentDayIndex < newDaysOfWeek.length - 1) {
            currentDayIndex += 1;
        } else {
            // reset day index
            currentDayIndex = 0;
        }
        console.log(currentDayIndex);
        
        // current day index now is the day we are shooting for in the week
        console.log(newDate);
        newDate = new Date(newDate.getTime() + 86400000);  
        console.log(newDate);
        count = 0;
        while(newDate.getDay() != newDaysOfWeek[currentDayIndex]){
            // keep adding days and checking them until we reach the next correct day...
            newDate = new Date(newDate.getTime() + 86400000); 
            console.log(newDate.getDay() + "   " + newDaysOfWeek[currentDayIndex]);
            count++;
        }                
        
        // we are now at the next day...
        
        firstNDates.push(('0' + newDate.getDate()).slice(-2) + "/" + ('0' + (newDate.getMonth()+1)).slice(-2) + "/" + newDate.getFullYear());
    }
    
    return firstNDates;
}
