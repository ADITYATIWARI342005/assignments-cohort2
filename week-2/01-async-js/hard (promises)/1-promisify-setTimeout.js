/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((res)=>{
            setTimeout(() => { res() }, n*1000);
    });
}

// const myPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         const success = true; // You can change this to false to test rejection
//
//         if (success) {
//             resolve('The promise was fulfilled!');
//         } else {
//             reject('The promise was rejected.');
//         }
//     }, 2000); // 2000 milliseconds = 2 seconds
// });

module.exports = wait;
