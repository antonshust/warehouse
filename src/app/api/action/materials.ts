"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";

export async function createMat(formData: FormData) {
    const fd = z
      .object({
        name: z.string(),
        description: z.string().optional(),
        quantity: z.string(),
      })
      .parse({
        name: formData.get("name"),
        description: formData.get("description"),
        quantity: formData.get("quantity"),
      });
      
      const data = {
        name: fd.name,
        description: fd.description,
        quantity: parseInt(fd.quantity, 10)
      }
    await db.material.create({ data });
    revalidatePath("/material");
}

  const deleteMapSchema = z.object({
    id: z.string(),
});

  export async function deleteMat(data: { id: string }) {
    const fd = deleteMapSchema.parse(data);
    await db.material.delete({ where: { id: fd.id } });
    redirect("/materials");
  }


  export async function updateMat(formData: FormData) {
    const fd = z
      .object({
        id: z.string(),      
        name: z.string(),
        description: z.string().optional(),
        quantity: z.string(),
      })
      .parse({
        id: formData.get("id"),      
        name: formData.get("name"),
        description: formData.get("description"),
        quantity: formData.get("quantity"),
      });


    await db.material.update({
        where: { id: fd.id },
        data: {
        name: fd.name,
        description: fd.description,
        quantity: parseInt(fd.quantity, 10)
        },
    });
    revalidatePath("/material/" + fd.id);
  }