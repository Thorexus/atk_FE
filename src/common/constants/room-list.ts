export const roomList = Array.from({ length: 100 }).map((item, index) => {
  return { label: index + 1, value: index + 1 };
});
