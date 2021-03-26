let options = {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    // year: 'numeric',
    // month: 'numeric',
    // day: 'numeric',
    // minute: 'numeric',
    // second: 'numeric',
},

formatter = new Intl.DateTimeFormat([], options);
var a =(formatter.format(new Date()));
var str = a
var h = str.split(" ");
console.log(h[0])