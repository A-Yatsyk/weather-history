const parse = (data, key) => data.trim().split(key);

export default (data) => {
  const rows = parse(data, '\n');
  const keys = ['yyyy', 'mm', 'tmax', 'tmin', 'af', 'rain', 'sun'];
  let startBy;
  const result = {};

  rows.forEach((row, index) => {
    const items = parse(row, / {2,}/g);

    if (startBy < index) {
      const elements = {};
      keys.forEach((key, i) => {
        elements[key] = items[i];
      });
      if (!Number(items[0])) return;
      result[items[0]] = {
        ...result[items[0]],
        [items[1]]: elements,
      };
      return;
    }

    if (items[0] === 'degC') {
      startBy = index;
    }
  });

  return result;
};
