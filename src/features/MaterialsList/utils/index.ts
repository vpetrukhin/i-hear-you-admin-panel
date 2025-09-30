export const columns = [
  { title: "файл" },
  { title: "категория" },
  { title: "формат" },
  { title: "дата загрузки" },
  { title: "статус" },
];

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
