function calculateHafshash(){
    if(!allInputsFilled()){
        alert("יש למלא את כל השדות");
        return;
    }


    const allHolidays = getHolidays();
    const holidaysSum = sumHolidays(allHolidays);
    const endServiceDate = new Date(document.getElementById("endServiceDate").value);

    const hafshashDate = takeDaysDownUntilDate(endServiceDate, holidaysSum);

    const message = document.getElementById("messageToUser");
    let str = "לחייל יש " + holidaysSum + " ימי חופשת שחרור.<br>"
    str += "יציאה לחפשש בתאריך " + hafshashDate.getDate() + "/" + (hafshashDate.getMonth() + 1) + "/"  + hafshashDate.getFullYear() + ".<br>";
    str += "תאריך שחרור (כפי שהוזן במערכת) הוא " + endServiceDate.getDate() + "/" + (endServiceDate.getMonth() + 1) + "/"  + endServiceDate.getFullYear() + ".<br>";
    message.innerHTML = str;
}

function allInputsFilled(){
    const inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === ""){
            return false;
        }
    }
    return true;    
}

function getHolidays(){
    const yearlyHolidays = parseInt(document.getElementById("yearlyHolidays").value);
    const cheifDays = parseInt(document.getElementById("cheifDays").value);
    const accumulationHolidays = parseInt(document.getElementById("accumulationHolidays").value);
    const soldierType = document.getElementById("soldierType").value;

    let hafshashDays;
    if(soldierType == "soldier"){hafshashDays = parseInt(5);}
    if(soldierType == "warrior"){hafshashDays = parseInt(10);}

    return [yearlyHolidays, cheifDays, accumulationHolidays, hafshashDays];
}

function sumHolidays(holidaysArr){
    let sum = 0;
    for(let i = 0; i < holidaysArr.length; i++){
        sum += holidaysArr[i];
    }
    return sum;
}

function takeDaysDownUntilDate(date, holidays){
    while(holidays > 0){
        if(date.getDay() <= 4){
            //weekday
            holidays -= 1;
        }
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() -1);
        
        while(holidays == 0 && date.getDay() > 4){
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate() -1);
        }
    }
    return date;
}


const sendBtn = document.getElementById("sendBtn");
sendBtn.addEventListener("click", calculateHafshash);