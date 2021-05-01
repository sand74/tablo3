export const parsePeriodToDate = (dateString) => {
  const strBegin = dateString.substr(0, 16);
  const strEnd = dateString.substr(17, dateString.length);

  return [strToDate(strBegin), strToDate(strEnd)];
};

export const parsePeriodToString = (dateString) => {
  const arr = parsePeriodToDate(dateString);
  const beginStr = dateToStr(arr[0]);
  const endStr = dateToStr(arr[1]);

  return `${beginStr} - ${endStr}`;
};

export const parsePeriodToString2 = (dateString) => {
  const arr = dateString.split(" - ");
  const result = `${arr[0]}-${arr[1]}`;

  return parsePeriodToString(result);
};

export const strToDate = (dateString) => {
  const arrAll = dateString.trim().split(" ");
  const arrDate = arrAll[0].split("-");
  const strDate = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;

  const date = new Date(`${strDate}T${arrAll[1]}`);
  return date;
};

export const dateToStr = (date) => {
  let timeStr = date.toLocaleTimeString();
  const dateStr = date.toLocaleDateString();

  timeStr = timeStr.substr(0, timeStr.length - 3);

  return `${timeStr} ${dateStr}`;
};

export const replaceURL = (url, ...arg) => {
  const a2 = url.trim().split("$");
  const a3 = a2.map((i, index) => (i ? `${i}${arg[index]}` : ""));
  return a3.join("");
};
