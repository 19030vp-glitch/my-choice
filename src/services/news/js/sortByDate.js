function sortByDate(arrayToSort) {
    return arrayToSort.sort((a, b) => {
        // Sort by the "date" field in descending order (recent dates first)
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA > dateB) {
            return -1;
        } else if (dateA < dateB) {
            return 1;
        } else {
            // If "date" is the same, sort by the "createdAt" field in descending order (newer "createdAt" first)
            const createdAtA = new Date(a.createdAt);
            const createdAtB = new Date(b.createdAt);
            return createdAtB - createdAtA;
        }
    });
}

export { sortByDate }