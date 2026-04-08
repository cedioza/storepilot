import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seedeo de la base de datos...')

  await prisma.product.deleteMany()
  await prisma.document.deleteMany()
  await prisma.user.deleteMany()

  // 1. FREE User
  const userFree = await prisma.user.create({
    data: {
      email: 'free@storepilot.com',
      name: 'Boutique Local (FREE)',
      role: 'FREE',
      products: {
        create: [
          { name: 'Camisa Básica Algodón', price: 250, stock: 15 },
          { name: 'Gorra Deportiva', price: 150, stock: 5 },
        ]
      }
    }
  })
  console.log(`✅ Usuario FREE creado: ${userFree.name}`)

  // 2. PRO User
  const userPro = await prisma.user.create({
    data: {
      email: 'pro@storepilot.com',
      name: 'Urban Streetwear (PRO)',
      role: 'PRO',
      products: {
        create: [
          { name: 'Sneakers Limitados Vol 1', price: 2500, stock: 3, description: 'Edición limitada' },
          { name: 'Jacket de Cuero Vegano', price: 1800, stock: 12, description: 'Invierno 2026' },
          { name: 'Pantalón Cargo Negro', price: 890, stock: 45 },
        ]
      }
    }
  })
  console.log(`✅ Usuario PRO creado: ${userPro.name}`)

  // 3. ENTERPRISE User
  const userEnterprise = await prisma.user.create({
    data: {
      email: 'enterprise@storepilot.com',
      name: 'Global Electronics (ENTERPRISE)',
      role: 'ENTERPRISE',
      products: {
        create: [
          { name: 'Laptop Pro 16"', price: 45000, stock: 120 },
          { name: 'Monitor 4K Curved', price: 12000, stock: 45 },
          { name: 'Teclado Mecánico', price: 2500, stock: 0 },
          { name: 'Mouse Inalámbrico', price: 1200, stock: 300 },
        ]
      }
    }
  })
  console.log(`✅ Usuario ENTERPRISE creado: ${userEnterprise.name}`)
  console.log('🚀 Seedeo completado.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
