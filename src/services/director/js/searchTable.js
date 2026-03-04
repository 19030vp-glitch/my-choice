const searchTable = (query, data) => {
    const lowercaseQuery = query.toLowerCase();

    const results = data?.filter(item => {
        return Object.keys(item).some(key => {
            if (key === 'durationYears') {
                return item[key].some(year => year.toLowerCase().includes(lowercaseQuery));
            } else {
                return String(item[key]).toLowerCase().includes(lowercaseQuery);
            }
        });
    });

    return results;
}


export default searchTable;