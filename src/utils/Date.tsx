const today = new Date();
const year = today.getFullYear();
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const day = ("0" + today.getDate()).slice(-2);

const dateString = year + "-" + month + "-" + day;

const hour = today.getHours();
const minute = today.getMinutes();
const formattedHour = hour < 10 ? `0${hour}` : hour.toString();
const formattedMinute = minute < 10 ? `0${minute}` : minute.toString();

const timeString = formattedHour + ":" + formattedMinute;
export { dateString, timeString };
