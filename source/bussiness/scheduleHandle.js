export function initBasceSchedule() {
    var startID = 0;
    const result = [];
    while (startID < 24) {
        const hStr = startID < 10 ? '0' + startID : startID;
        result.push(startID + ':00 - ' + startID + ':25');
        result.push(startID + ':30 - ' + startID + ':55');
        startID++;
    }
    return result;
}

export function initBookingTableTitle() {
    var result = { titles: [''], dates: [today] };
    var startDate = new Date();
    for (var i = 0; i < 14; i++) {
        const tempDate = new Date(startDate.setDate(today.getDate() + i));
        const date = tempDate.getDate() + "/" + (tempDate.getMonth() + 1)
        const day = daysOfWeek[tempDate.getDay()]
        result.titles.push(date + '\n' + day)
        result.dates.push(tempDate)
    }
    console.log(result.titles.length);
    console.log(result.dates.length)
    return result;
}
export function getScheduleByPage(data, page) {

}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
export function getTableBookingTitle(page) {
    var result = [{ title: '', date: null }];
    var startDay = new Date(today.setDate(today.getDate() + 7 * page));
    result.push(startDay);
    for (var i = 0; i < 7; i++) {
        startDay.setDate(today.getDate() + i)
        const date = temp.getDate() + "/" + (temp.getMonth() + 1)
        const day = daysOfWeek[temp.getDay()]
        result.title.push(date + '\n' + day)
        result.dates.push(temp)
    }
    return result;
}