const prisma = require('../utils/prisma');

function link(parent) {
  return prisma.vote.findUnique({ where: { id: parent.id } });
}

function user(parent) { 
    console.log("vote user",prisma.vote);
  return prisma.vote.findUnique({ where: { id: parent.id } });
}

module.exports = {
  link,
  user,
};
