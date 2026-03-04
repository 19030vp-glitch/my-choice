const sortYear = (years) => {
    return years.sort((a, b) => {
        let yearA = a?.split('-')[0];
        let yearB = b?.split('-')[0];
        return yearA - yearB;
    })
}

export default sortYear