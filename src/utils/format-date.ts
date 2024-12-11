export const formatDate = (date?: Date) => { //this function formats a date
	if(!date) return '';
	return new Date(date).toLocaleDateString();
}