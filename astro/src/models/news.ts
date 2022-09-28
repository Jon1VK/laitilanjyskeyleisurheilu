import prisma from '@lib/prisma';

const PAGE_SIZE = 6;

const PrismaNews = Object.assign(prisma.news, {
  async findRecent(take: number) {
    return prisma.news.findMany({
      where: { draft: false },
      take,
      orderBy: { publishedAt: 'desc' },
    });
  },
  async countPages({ includeDrafts = false }) {
    const newsCount = await prisma.news.count({
      where: includeDrafts ? {} : { draft: false },
    });
    return Math.ceil(newsCount / PAGE_SIZE);
  },
  async findNewsForPage(page: number, { includeDrafts = false }) {
    return await prisma.news.findMany({
      where: includeDrafts ? {} : { draft: false },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: [{ draft: 'desc' }, { publishedAt: 'desc' }],
    });
  },
});

export default PrismaNews;
