let counterClicks = document.getElementById('counterClicks');
let btnIncrement = document.getElementById('Increment');
let btnDecrement = document.getElementById('Decrement');
let btnReset = document.getElementById('Reset');

let count = 0;

document.addEventListener('DOMContentLoaded', ()=>{
    counterClicks.innerText = count;

    btnIncrement.addEventListener("click", function () {
        count++;
        counterClicks.innerText = count;
    });
    
    btnDecrement.onclick = () => {
        (count < 1 )? 0 : count--;
        counterClicks.innerText = count;
    }
    
    btnReset.addEventListener("click", () => {
        count = 0;
        counterClicks.innerText = count;
    });
});


console.log(counterClicks);
console.log(btnIncrement)

