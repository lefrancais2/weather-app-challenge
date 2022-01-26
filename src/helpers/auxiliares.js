export const getDate = (data) => {
  let dateToday = new Date(data * 1000);
  const dateString = dateToday.toDateString().split(" ");
  return `${dateString[0]}, ${dateString[2]} ${dateString[1]}`;
};

export const tomorrow = (data) => {
  let date = new Date(data * 1000);
  return date.getDate() === new Date().getDate() + 1;
};

export const castingIcons = (data) => {
  let num = data.match(/\d+/);
  num = parseInt(num);
  const casting = [
    "",
    "c",
    "lc",
    "hc",
    "hc",
    "5",
    "6",
    "7",
    "8",
    "hr",
    "s",
    "t",
    "12",
    "sn",
  ];
  return casting[num];
};
