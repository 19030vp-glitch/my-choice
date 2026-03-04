function capitalizeText(text) {
    // Split the name into an array of words
    const words = text.toLowerCase().split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words back into a string
    const capitalizedName = capitalizedWords.join(' ');

    return capitalizedName;
}

module.exports = capitalizeText 
