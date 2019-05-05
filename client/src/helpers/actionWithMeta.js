export default async (data) => {
  if (typeof data.data.then === 'function') data.data = await (data.data);
  return data;
};
