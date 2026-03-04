function numberToWord(number) {
    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (number === 0) {
        return 'zero';
    } else if (number < 0 || number > 999999999999) {
        return 'Out of range';
    }

    const trillion = Math.floor(number / 1000000000000);
    const billion = Math.floor((number % 1000000000000) / 1000000000);
    const million = Math.floor((number % 1000000000) / 1000000);
    const thousand = Math.floor((number % 1000000) / 1000);
    const remainder = number % 1000;

    const words = [];

    function convertGroup(group, unit) {
        if (group === 0) {
            return '';
        }

        const hundred = Math.floor(group / 100);
        const remainderTwoDigits = group % 100;

        const wordsGroup = [];

        if (hundred > 0) {
            wordsGroup.push(units[hundred] + ' hundred');
        }

        if (remainderTwoDigits > 0) {
            if (remainderTwoDigits < 10) {
                wordsGroup.push(units[remainderTwoDigits]);
            } else if (remainderTwoDigits < 20) {
                wordsGroup.push(teens[remainderTwoDigits - 11]);
            } else {
                const tensDigit = Math.floor(remainderTwoDigits / 10);
                const unitsDigit = remainderTwoDigits % 10;
                wordsGroup.push(tens[tensDigit]);
                if (unitsDigit > 0) {
                    wordsGroup.push(units[unitsDigit]);
                }
            }
        }

        return wordsGroup.join(' ') + unit;
    }

    words.push(convertGroup(trillion, 'trillion'));
    words.push(convertGroup(billion, 'billion'));
    words.push(convertGroup(million, 'million'));
    words.push(convertGroup(thousand, 'thousand'));
    words.push(convertGroup(remainder, ''));

    return words.filter(word => word.trim() !== '').join(' ');
}

export { numberToWord }