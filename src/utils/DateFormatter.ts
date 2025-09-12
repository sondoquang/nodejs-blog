import dayjs from "dayjs";

function convertDate(date: Date | string, format: string = "DD/MM/YYYY"): string {
    return dayjs(date).format(format);
}

export default convertDate;