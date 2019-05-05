import convertObject from './convertObject';

export default (data) => {
  if (data instanceof Array) {
    for (const d of data) convertObject(d);
  } else if (data instanceof Object) {
    convertObject(data);
  };
};
