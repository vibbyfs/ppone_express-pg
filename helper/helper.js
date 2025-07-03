function timeAgoDetail(dateInput) {
  const now = new Date();
  const then = new Date(dateInput);
  const diffMs = now - then;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < minute) return 'Just now';
  if (diffMs < hour) return `${Math.floor(diffMs / minute)} minutes ago`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)} hours ago`;
  if (diffMs < week) return `${Math.floor(diffMs / day)} days ago`;
  if (diffMs < month) return `${Math.floor(diffMs / week)} weeks ago`;
  if (diffMs < year) return `${Math.floor(diffMs / month)} months ago`;
  return `${Math.floor(diffMs / year)} years ago`;
}


module.exports = { timeAgoDetail };
