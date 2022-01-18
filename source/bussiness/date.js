export function addTimeZone(date, timezone) {
    return new Date(date.setHours(date.getHours() + timezone));
}
export function checkAfter2h(date) {
    const today = new Date();
    const diffTime = (date.valueOf() - today.valueOf()) / 3600000;
    return diffTime > 2;
}