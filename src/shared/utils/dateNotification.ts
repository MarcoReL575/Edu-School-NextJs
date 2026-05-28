import { formatDistanceToNow } from 'date-fns'

export const formatDateNotification = (date: Date) => {
    return formatDistanceToNow(date);
}