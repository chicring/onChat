import dayjs from 'dayjs';

export const formatDate = (timestamp : number) => {
    return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
}
