export function dateTimeHelper(timestamp) {
	    const date = new Date(timestamp);
	    return date.toUTCString();
}