const uuidNum = () => {
  const num = Math.ceil(Math.random() * 10000000);
  return num;
};

module.exports = {
  uuidNum,
};
