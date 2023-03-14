
// console.log(numberpath)
const url = new URL(window.location.href);
const number = url.searchParams.get('number');

document.getElementById("orders_number").innerHTML =number;