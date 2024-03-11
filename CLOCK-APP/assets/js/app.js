// alert("Hola");
const seconds = document.getElementById("seconds");
const minutes = document.getElementById("minutes");
const hours = document.getElementById("hours");
const formAlarm = document.getElementById("form-alarm");
let alarmDate;
let showNotification = false;
let notificationCounter = 0;

// function formatNumber(number){
//   // if (number < 10) {
//   //   return "0" + number;
//   // } else {
//   //   return number;
//   // }
//   return (number < 10)? "0" + number : number;
// }

document.addEventListener("DOMContentLoaded", () => {
  if ("Notification" in window) {
    Notification.requestPermission((request) => {
      showNotification = request === 'granted';
      // if (request === 'granted') {
      //   showNotification = true;
      // }


      if (!showNotification) {
        // const input = formAlarm.children[0];
        // const button = formAlarm.children[1];
        const [input, button] = formAlarm.children;
        input.disabled = true;
        input.value = "";
        button.disabled = true;
      }

      console.log(request);

      // const not1 = new Notification ("Hola Esta es una notificacion",{
      //   body: "asdasdasdadasdadasd"
      // })
    });
  }

  if (localStorage.getItem("alarma") === null) {
    const input = formAlarm.children[0];

    localStorage.getItem("alarmita");
    const alarmaFormato = new Date(localStorage.getItem("alarmita"));

    const alarmY = alarmaFormato.getFullYear();
    const alarmM = alarmaFormato.getMonth();
    const alarmD = alarmaFormato.getDate();
    const alarmH = alarmaFormato.getHours();
    const alarmMin = alarmaFormato.getMinutes();

    input.value = `${alarmY}-${formatNumber(alarmM)}-${formatNumber(
      alarmD
    )}T${formatNumber(alarmH)}:${alarmMin}`;
  }
  getCurrentTime();
});

setInterval(() => {
  getCurrentTime();
}, 1000);

formAlarm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const value = formData.get("time");
  if (value === null || value === "") {
    alert("Establezca una fecha");
    return;
  }
  alarmDate = new Date(value);
  localStorage.setItem("alarmita", alarmDate);
});

const formatNumber = (number) => (number < 10 ? "0" + number : number);

const showAlarm = () =>{
  if (showNotification && localStorage.getItem('alarmita') !== null) {
    const currentTime = new Date();
    const alarm = new Date(localStorage.getItem('alarmita'));
    console.log(currentTime,alarm);
    const isSameYear = alarm.getFullYear() === currentTime.getFullYear();
    const isSameMonth = alarm.getMonth() === currentTime.getMonth();
    const isSameDay = alarm.getDate() === currentTime.getDate();
    const isSameHour = alarm.getHours() === currentTime.getHours();
    const isSameMinute = alarm.getMinutes() === currentTime.getMinutes();

    if (isSameDay && isSameHour && isSameMinute && isSameMonth && isSameYear && notificationCounter < 10){
      new Notification('This is an alarm');
      notificationCounter++;
    }
    if (notificationCounter >= 10){
     formAlarm.children[0].value = "";
     localStorage.removeItem('alarmita');
    }
  }
};





const getCurrentTime = () => {
  showAlarm();

  const currentDate = new Date();

  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  hours.innerText = formatNumber(currentHours);
  minutes.innerText = formatNumber(currentMinutes);
  seconds.innerText = formatNumber(currentSeconds);
};
