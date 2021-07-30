const repositoryUser = require('./../repositories/user.repository');

module.exports.create = async (user) => {
  return repositoryUser.create(user);
}

module.exports.getAll = async () => {
  return repositoryUser.getAll();
}

module.exports.getOne = async (userId) => {
  return repositoryUser.getOne(userId);
}

module.exports.update = async (user) => {
  return repositoryUser.update(user);
}

module.exports.delete = async (userId) => {
  return repositoryUser.delete(userId);
}
