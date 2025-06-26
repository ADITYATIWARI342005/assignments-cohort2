## Counter without setInterval

Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.


initial=0;
function counter(){
    initial++;
    console.log(initial);
    setTimeout(counter,1000);
}







































































(Hint: setTimeout)