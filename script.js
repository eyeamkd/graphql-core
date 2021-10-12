const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const newLink =async ()=> await prisma.link.create({
  data: {
    description: "Best global search engine",
    url: "www.google.com",
  },
});

const main = async () => {
  await newLink();
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
