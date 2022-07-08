const copyProperties = (target, source) => {
  for (const key in source) {
    target[key] = source[key];
  }
};

module.exports = { copyProperties };
