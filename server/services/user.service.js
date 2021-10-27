const moment = require('moment');

const repositoryUser = require('./../repositories/user.repository');

module.exports.create = async (user) => {
  return repositoryUser.create(user);
}

module.exports.getAll = async () => {
  return repositoryUser.getAll();
}

module.exports.getUserByExternalId = async (externalId) => {
  return repositoryUser.getUserByExternalId(externalId);
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

module.exports.getAllUsersFeedbacks = async (filterMonth, columnOrder) => {

  const order = columnOrder === 'name' ? 'ASC' : 'DESC';
 
  const year = moment().format('YYYY');

  let startDate = moment().startOf('year');
  let endDate = moment().endOf('year');

  const months = {
    janeiro: 1,
    fevereiro: 2,
    março: 3,
    abril: 4,
    maio: 5,
    junho: 6,
    julho: 7,
    agosto: 8,
    setembro: 9,
    outubro: 10,
    novembro: 11,
    dezembro: 12
  }

  if(filterMonth !== 'all'){
     startDate = moment([year, months[filterMonth] - 1]).format();
     endDate = moment(startDate).endOf('month').format();
  }
 
  return repositoryUser.getAllUsersFeedbacks({
    startDate,
    endDate,
    columnOrder,
    order
  });
}