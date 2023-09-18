import prisma from "@/utils/connect";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "davi.p.m94@gmail.com" },
    update: {},
    create: {
      email: "davi.p.m94@gmail.com",
      name: "avi",
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
