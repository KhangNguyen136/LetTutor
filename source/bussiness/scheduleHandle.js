export function initSectionSchedule(start = 0, end = 47) {
    var startID = start;
    const result = [];
    while (startID < end) {
        const h = parseInt(startID / 2);
        const hStr = h < 10 ? '0' + h : h;
        if (h % 2 == 0)
            result.push(hStr + ':00 - ' + hStr + ':25');
        else
            result.push(hStr + ':30 - ' + hStr + ':55');
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
        // section: initSectionSchedule(),
        data: bookingData
    };
}

export function getScheduleByPage(data, page) {

}

export function getHasDataRange(data) {

}

const getStartID = (data) => {
    var result = 16;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < result; j++) {
            if (data[i][j] != null) {
                result = j;
                break;
            }
        }
        if (result == 0)
            return result
    }
    return result;
}

const getEndID = (data) => {
    var result = 35;
    for (let i = 0; i < data.length; i++) {
        for (let j = 47; j > result; j--) {
            if (data[i][j] != null) {
                result = j;
                break;
            }
        }
        if (result == 47)
            return result
    }
    return result;
}

export function formatBookingTable(bookingData) {
    const data = bookingData.data;
    const start = getStartID(data);
    console.log(getStartID(data));
    // const start = 0;
    var end = getEndID(data);

    const getResultData = () => {
        const result = [];
        data.forEach(item =>
            result.push(item.slice(start, end)))
        return result
    }
    return (
        {
            title: bookingData.title,
            data: getResultData(),
            section: initSectionSchedule(start, end),
        }
    )
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
