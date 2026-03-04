const convertToURLFormat = (name) => {
  return encodeURIComponent(name.replace(/\s+/g, '-').toLowerCase());
};

const reverseURLFormat = (urlName) => {
  return decodeURIComponent(urlName.replace(/[-_]/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()));
};

const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

export { convertToURLFormat, reverseURLFormat, truncateString }