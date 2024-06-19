
// need to regenerate output for seed.ts to use in dev
import { PrismaClient } from '../node_modules/.prisma/client';
// to disable prod errors
// import { PrismaClient } from '../src/generated/client';

import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

const prisma = new PrismaClient();

const customConfig: Config = {
  dictionaries: [adjectives, colors, animals],
  separator: ' ',
  length: 3,
};

async function main() {
    let title = "";
    let description = "";
    let date = new Date(); 
    let endDate = new Date();
    const start = new Date();
    const end = new Date(2025, 1, 1);
    const createdAt = new Date();
    for (let i = 0; i < 10; i++) {
        title = uniqueNamesGenerator(customConfig); 
        description = uniqueNamesGenerator(customConfig); 
        date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        endDate = new Date(date.getTime())
        endDate.setHours(date.getHours() + (Math.random() * 3));
        try {
            await prisma.event.create({
                data: {
                    title: title,
                    description: description,
                    startDate: date,
                    endDate: endDate,
                    createdAt: createdAt,
                    creator: {
                        connect : {
                            id : "user_2hmR7cnvDfFDK4G8iecy5PsGvxm",
                        }
                    },
                }
            }); 
            console.log(title, description, date.getHours(), endDate.getHours());
        } catch (error) {
            console.log(error);
        }
    }
  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })