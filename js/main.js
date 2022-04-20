/* Date And Time Part */
"use strict";
let dateNow = document.getElementById("dateNow");
let timeNow = document.getElementById("timeNow");
function setTime(){
    let date = new Date();
    let months = ["January","February","March","April","May","June","July","August","September","Octobr","Novmber","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let min=date.getMinutes();
    let sec=date.getSeconds();
    let hours=date.getHours();
    
    if(hours>12){
        hours=hours-12;
    }
    timeNow.innerHTML = `${hours}:${min}:${sec}`;
    dateNow.innerHTML=`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`
    setTimeout(setTime,1000)
};
setTime();
/* crud delete $ Add */
let displayData = document.getElementById("displayData");
let textVal = document.getElementById("textVal");
let addBtn = document.getElementById("addBtn");
let hide = document.getElementById("hide");
let lies = [];
if(JSON.parse(localStorage.getItem("lies"))!=null){
    lies = JSON.parse(localStorage.getItem("lies"));
    display();
};
addBtn.addEventListener("click", getData);
function getData(){
    let rejex = /^[A-z][a-z 0-9 _ - & @]+$/
    if( rejex.test(textVal.value)){
        let task={description:textVal.value}
        lies.push(task);
        localStorage.setItem("lies",JSON.stringify(lies));
        display();
        textVal.value="";
    } else {
        alert("Write Your Task With The Right Way")
    }
};
function display(){
    let cartona = "";
    for(let i=0;i<lies.length;i++){
        cartona +=
            `
            <li>
                <p>${lies[i].description}</p>
                <div>
                    <button onclick=showMesg(${i})><i class="fa-solid fa-check"></i></button>
                    <button onclick=deleteItem(${i})><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </li>
            `
    }
    displayData.innerHTML = cartona;
};
function deleteItem(i){
    lies.splice(i,1);
    localStorage.setItem("lies",JSON.stringify(lies));
    display();
};
function showMesg(i){
    deleteItem(i);
    document.querySelector(".overlay").style.display = "block";    
};
function hideMesg(){
    document.querySelector(".overlay").style.display = "none";
};
hide.onclick = hideMesg;
window.addEventListener("keyup",function(e){
    if(e.code == 'Escape'){
        hideMesg();
    } else if(e.code == "Enter"){
        getData();
    }
});