export const convertToReadableDate = (dateString: string) => {
    const date = new Date(dateString);

    const dateFormat = date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
    });

    const timeFormat = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
        hour12: false,
    });

    const readable = `${dateFormat} ${timeFormat}`;

    return readable;
}