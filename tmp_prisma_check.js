const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient();
  try {
    const rows = await prisma.user.findMany({ take: 1 });
    console.log('prisma ok, rows=', rows);
  } catch (e) {
    console.error('prisma err:', e?.message || e);
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
})();

