function convertToTime(n) {
    const hours = Math.floor(n / 60);
    const minutes = n % 60; 
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
}
export default convertToTime