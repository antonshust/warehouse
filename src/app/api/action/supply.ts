"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

// Создание поставки
export async function createSupply(formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Пользователь не авторизован");
    }

  const fd = z
    .object({
      supplierId: z.string(),
      date: z.string().optional(),
      material: z.string(),
      quantity: z.string(),
    })
    .parse({
      supplierId: formData.get("supplierId"),
      date: formData.get("date"),
      material: formData.get("material"),
      quantity: formData.get("quantity"),
    });

    const data = {
        supplierId: fd.supplierId,
        date: fd.date ? new Date(fd.date) : new Date(),
        material: fd.material,
        quantity: parseInt(fd.quantity, 10)
    }

  await db.supply.create({ data });
  revalidatePath("/supply");
}

// Удаление поставки
const deleteSupplySchema = z.object({
  id: z.string(),
});

export async function deleteSupply(data: { id: string }) {
  const fd = deleteSupplySchema.parse(data);
  await db.supply.delete({ where: { id: fd.id } });
  redirect("/supply");
}

// Обновление поставки
export async function updateSupply(formData: FormData) {
  const fd = z
    .object({
      id: z.string(),
      supplierId: z.string(),
      date: z.string().optional(),
      material: z.string(),
      quantity: z.string(),
    })
    .parse({
      id: formData.get("id"),
      supplierId: formData.get("supplierId"),
      date: formData.get("date"),
      material: formData.get("material"),
      quantity: formData.get("quantity"),
    });

  await db.supply.update({
    where: { id: fd.id },
    data: {
      supplierId: fd.supplierId,
      date: fd.date ? new Date(fd.date) : new Date(),
      material: fd.material,
      quantity: parseInt(fd.quantity, 10)
    },
  });
  revalidatePath("/supply/" + fd.id);
}