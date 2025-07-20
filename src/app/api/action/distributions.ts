"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

// Создание поставки
export async function createDis(formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Пользователь не авторизован");
    }

  const fd = z
    .object({
      userId: z.string(),
      date: z.string().optional(),
      material: z.string(),
      quantity: z.string(),
    })
    .parse({
      userId: formData.get("userId"),
      date: formData.get("date"),
      material: formData.get("material"),
      quantity: formData.get("quantity"),
    });

    const data = {
        userId: fd.userId,
        date: fd.date ? new Date(fd.date) : new Date(),
        material: fd.material,
        quantity: parseInt(fd.quantity, 10)
    }

  await db.dispatch.create({ data });
  revalidatePath("/distributions");
}

// Удаление поставки
const deleteDistributionsSchema = z.object({
  id: z.string(),
});

export async function deleteDistributions(data: { id: string }) {
  const fd = deleteDistributionsSchema.parse(data);
  await db.dispatch.delete({ where: { id: fd.id } });
  redirect("/distributions");
}

// Обновление поставки
export async function updateDistributions(formData: FormData) {
  const fd = z
    .object({
      id: z.string(),
      userId: z.string(),
      date: z.string().optional(),
      material: z.string(),
      quantity: z.string(),
    })
    .parse({
      id: formData.get("id"),
      userId: formData.get("userId"),
      date: formData.get("date"),
      material: formData.get("material"),
      quantity: formData.get("quantity"),
    });

  await db.dispatch.update({
    where: { id: fd.id },
    data: {
      userId: fd.userId,
      date: fd.date ? new Date(fd.date) : new Date(),
      material: fd.material,
      quantity: parseInt(fd.quantity, 10)
    },
  });
  revalidatePath("/distributions/" + fd.id);
}