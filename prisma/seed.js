const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const demoProducts = [
  {
    title: 'Everyday Travel Backpack',
    description:
      'Water-resistant backpack with a padded laptop pocket, quick-access organizer and compact travel profile.',
    url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80',
    price: 4999,
  },
  {
    title: 'Wireless Studio Headphones',
    description:
      'Noise-isolating over-ear headphones with long battery life, soft ear pads and balanced sound for daily use.',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    price: 8999,
  },
  {
    title: 'Smart Desk Lamp',
    description:
      'Minimal LED desk lamp with dimmable warm and cool modes, touch controls and an adjustable aluminum arm.',
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    price: 3499,
  },
  {
    title: 'Compact Mechanical Keyboard',
    description:
      'Hot-swappable compact keyboard with tactile switches, double-shot keycaps and multi-device Bluetooth.',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    price: 7499,
  },
  {
    title: 'Ceramic Coffee Set',
    description:
      'Two-piece ceramic coffee set with matte finish, comfortable handles and gift-ready packaging.',
    url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80',
    price: 2199,
  },
  {
    title: 'Portable Bluetooth Speaker',
    description:
      'Splash-resistant speaker with punchy bass, fabric shell and an all-day battery for home or travel.',
    url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',
    price: 5999,
  },
  {
    title: 'Minimal Leather Wallet',
    description:
      'Slim RFID-blocking wallet made from full-grain leather with quick card access and a compact silhouette.',
    url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
    price: 2499,
  },
  {
    title: 'Fitness Smart Watch',
    description:
      'Lightweight smart watch with health tracking, sleep insights, notifications and a bright always-on display.',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    price: 12999,
  },
]

async function seedProducts() {
  try {
    await prisma.orderItem.deleteMany()
    await prisma.orders.deleteMany()
    await prisma.addresses.deleteMany()
    await prisma.products.deleteMany()
    await prisma.products.createMany({ data: demoProducts })
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

seedProducts()
