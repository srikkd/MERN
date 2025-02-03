function showTime(){
    let fullDateTime = new Date();
    let hrs = fullDateTime.getHours();
    let min = fullDateTime.getMinutes();
    let sec = fullDateTime.getSeconds();

    let timeFormat = "AM"
    if(hrs >= 12){
        if(hrs > 12){
            hrs -= 12;
        }
        timeFormat = "PM";
    }

    if(hrs < 10){
        hrs = '0'+hrs;
    }
    if(min < 10){
        min = '0'+min;
    }
    if(sec < 10){
        sec = '0'+sec;
    }

    // console.log(`${hrs}:${min}:${sec} ${timeFormat}`);

    const clockDate = document.getElementById("date");
    clockDate.textContent = fullDateTime.toDateString();
    const clockTime = document.getElementById("time");
    clockTime.innerText = `${hrs}:${min}:${sec} ${timeFormat}`;

    // showTime();  //why simple recursive call will not work?
    // setTimeout(showTime, 1000);
}
// showTime();

//for repeated operation, setInterval() or setTimeout()
setInterval(()=>{
    showTime()
}, 1000);  //check why it is not working
// setInterval(showTime);
// setInterval(showTime, 2000);

setTimeout(showTime, 1000); //alone it was not printing twice also: check why?

// console.log(fullDateTime.getDay);   //let is not working outside scope?

// let today = new Date();
// // console.log(currDateTime.getUTCDate());
// const year = today.getFullYear();
// const month = today.getMonth() + 1; // Months are 0-indexed
// const day = today.getDate();
// let formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`; // "2025-02-02"

// console.log(formattedDate);



