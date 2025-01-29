const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json";


const dropdowns= document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg= document.querySelector(".msg");




for (let select of dropdowns ){
    for (currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value= currCode;
       if(select.name === "from" && currCode === "USD"){
        newOption.selected= "selected";
       }else if(select.name === "to" && currCode === "INR"){
        newOption.selected= "selected";
       }
       select.append(newOption);
    }

    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    });
}


const updateExchangeRate = async () =>{

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amtVal.value="1";
    }

    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
    let finalAmt = amtVal *rate;
    msg.innerHTML=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

const updateFlag = (element) =>{
let currCode = element.value;
let contryCode = countryList[currCode];
let newSrc =`https://flagsapi.com/${contryCode}/flat/64.png`;
let img= element.parentElement.querySelector("img");
img.src = newSrc;
};

btn.addEventListener("click", (e)=>{
    e.preventDefault();
    updateExchangeRate();
    
});




window.addEventListener("load" , () =>{
    updateExchangeRate();
});


