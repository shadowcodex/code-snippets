var body = require('human/body');
var emotions = require('human/emotions');
var teen = spawnHuman({age: 13});
const food = ['pizza', 'chicken nuggets', 'mac and cheese'];

var life = {
    'feed': function(item) {
        if(food.contains(item)){
            life.consume(item);
        } else {
            life.complain('disgust');
        }
    },
    'consume': function(item) {
        for(calories calorie in item) {
            body.digest(calorie)
        }
    },
    'complain': function(action) {
        switch(action){
            case 'disgust': {
                life.speak('EW!!!');
                break;
            }
            default: {
                life.speak('GO AWAY!!!');
                break;
            }
        }
    },
    'speak': function(message) {
        message = emotions.sass(message);
        body.emitSound(message);
    },
}
