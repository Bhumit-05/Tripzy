export const formatTheDate = (date) => {
    const dateToFormat = new Date(date);
    const formattedDate = dateToFormat.toLocaleDateString('en-GB');
    return formattedDate;
};