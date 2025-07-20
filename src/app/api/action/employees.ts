"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function createUser(formData: FormData) {
    const fd = z
      .object({
        email: z.string().email(),
        firstmame: z.string(),
        surname: z.string(),
      })
      .parse({
        email: formData.get("email"),
        firstmame: formData.get("firstmame"),
        surname: formData.get("surname"),
      });
    await db.user.create({ data: fd });
    revalidatePath("/employees");
  }

    export async function getEmployees() {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Пользователь не авторизован");
    }

    const employees = await db.user.findMany({
    });

    return employees; 
  }

  const deleteUserSchema = z.object({
    id: z.string(),
});

  export async function deleteUser(data: { id: string }) {
    const fd = deleteUserSchema.parse(data);
    await db.user.delete({ where: { id: fd.id } });
    redirect("/employees");
  }


  export async function updateUser(formData: FormData) {
    const fd = z
      .object({
        id: z.string(),      
        firstmame: z.string(),
        surname: z.string(),
      })
      .parse({
        id: formData.get("id"),      
        firstmame: formData.get("firstmame"),
        surname: formData.get("surname"),
      });
    await db.user.update({ where: { id: fd.id }, data: fd });
    revalidatePath("/employees/"+fd.id);
  }