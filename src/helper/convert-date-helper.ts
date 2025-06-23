export const convertDate = (date: string) => {
    const [day, month, year] = date.split("-");
    const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
    return isoDate;
}