// Takes input and formats into standard MM/DD/YYYY format

module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
  },
};
