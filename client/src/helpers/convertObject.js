export default (object) => {
  if (object.created_at) object.created_at = new Date(object.created_at);
  if (object.updated_at) object.updated_at = new Date(object.updated_at);
};
