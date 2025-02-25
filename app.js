const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");   
 
 

for (let select of dropdowns){
    for (currCode in countryList){
       let newOption = document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if (select.name === "from" && currCode === "USD"){
        newOption.selected ="selected";
       } else if (select.name === "to" && currCode === "INR"){
        newOption.selected ="selected";
       }
       select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value ;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1){
        amtval = 1;
        amount.value ="1";
    }

    const URL=`${BASE_URL}/${fromcurr.value}/${tocurr.value}.json`;
    let response = await fetch (URL);
    let data = await response.json();
    let rate = data[tocurr.value];

    let finalamount = amtval * rate;
    msg.innerText = `${amtval}${fromcurr.value} = ${finalamount} ${tocurr.value}`;
});
