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

export function initBookingTableData() {
    var result = {
        titles: [''], data: []
    };
    var startDate = new Date();
    for (var i = 0; i < 28; i++) {
        const tempDate = new Date(startDate.setDate(today.getDate() + i));
        const date = tempDate.getDate() + "/" + (tempDate.getMonth() + 1)
        const day = daysOfWeek[tempDate.getDay()]
        result.titles.push(date + '\n' + day)
        result.data.push({ date: tempDate, bookingData: Array(48).fill(null) })
    }
    return result;
}

export function getBookingData(data) {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    yesterday.setHours(23)
    yesterday.setMinutes(55)
    const result = initBookingTableData();
    data.forEach(section => {
        const startTimeSection = new Date(section.startTimestamp);
        if (startTimeSection.getTime() > yesterday.getTime()) {
            startTimeSection.getDate()
            const resultItem = result.data.find(item =>
                (item.date != null && item.date.getDate() == startTimeSection.getDate()) && (item.date.getMonth() == startTimeSection.getMonth() && (item.date.getFullYear() == startTimeSection.getFullYear())))
            if (resultItem == undefined)
                return
            section.scheduleDetails.forEach(
                item => {
                    const startTime = new Date(item.startPeriodTimestamp);
                    const h = startTime.getHours();
                    const m = startTime.getMinutes();
                    const id = m > 0 ? (h * 2 + 1) : h * 2;
                    resultItem.bookingData[id] = item
                }
            )
        }
    })
    const bookingData = []
    result.data.forEach(item => bookingData.push(item.bookingData))
    return {
        title: result.titles,
        data: bookingData
    };
}

export function getScheduleByPage(data, page) {

}

export function getHasDataRange(data) {

}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
