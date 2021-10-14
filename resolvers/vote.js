const prisma = require('../utils/prisma');

function link(parent) {
  return prisma.vote.findUnique({ where: { id: parent.id } }).link();
}

function user(parent) { 
    console.log("vote user",prisma.vote);
  return prisma.vote.findUnique({ where: { id: parent.id } }).user();
}

module.exports = {
  link,
  user,
};
