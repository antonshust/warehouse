"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export async function createSup(formData: FormData) {
    const fd = z
      .object({
        name: z.string(),
        contact: z.string(),
      })
      .parse({
        name: formData.get("name"),
        contact: formData.get("contact"),
      });
    await db.supplier.create({ data: fd });
    revalidatePath("/suppliers");
  }

  export async function getSuppliers() {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Пользователь не авторизован");
    }

    const suppliers = await db.supplier.findMany({
    });

    return suppliers; 
  }

  const deleteSupSchema = z.object({
    id: z.string(),
});

  export async function deleteSup(data: { id: string }) {
    const fd = deleteSupSchema.parse(data);
    await db.supplier.delete({ where: { id: fd.id } });
    redirect("/suppliers");
  }


  export async function updateSup(formData: FormData) {
    const fd = z
      .object({
        id: z.string(),      
        name: z.string(),
        contact: z.string(),
      })
      .parse({
        id: formData.get("id"),      
        name: formData.get("name"),
        contact: formData.get("contact"),
      });
    await db.supplier.update({ where: { id: fd.id }, data: fd });
    revalidatePath("/suppliers/"+fd.id);
  }