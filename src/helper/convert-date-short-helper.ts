export const convertShortDate = (date: string) => {
    const [day, month, yearShort] = date.split("-");
    const year = parseInt(yearShort, 10);

    const fullYear = year + 2000;

    const isoDate = new Date(`${fullYear}-${month}-${day}T00:00:00Z`);
    return isoDate;
};