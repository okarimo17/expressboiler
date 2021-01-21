let mlist = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(date) {
  return (
    date.getDate() + " " + mlist[date.getMonth()] + " " + date.getFullYear()
  );
}

module.exports = {
  formatDate,
};
