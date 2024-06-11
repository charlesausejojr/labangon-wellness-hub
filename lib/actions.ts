'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import prisma from "@/lib/prisma";

/*
const prisma = new PrismaClient().$extends({
    query: {
      user: {
        $allOperations({ operation, args, query }) {
          if (['create', 'update'].includes(operation) && args.data['password']) {
            args.data['password'] = bcrypt.hashSync(args.data['password'], 10)
          }
          return query(args)
        }
      }
    }
  })
  */

export async function createUser(formData : FormData) {
    const user = await prisma.user.create({
        data: {
            name: "charles",
            email: "charles@gmail.com",
        },
    })
    console.log(user);
    revalidatePath("/dashboard");
    redirect("/dashboard");
}
