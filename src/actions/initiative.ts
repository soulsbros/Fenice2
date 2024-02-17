"use server";

import { Character } from "@/types/Initiative";

export async function saveInitiative(order: Character[]) {
  //TODO
}

export async function loadInitiative() {
  return [
    {
      name: "Morgrym",
      score: 0.1,
      active: false,
      player: "stefano.taille@gmail.com",
      isPlayer: true,
      isEnemy: false,
      currentHealth: 220,
      totalHealth: 220,
      notes: "",
    },
    {
      name: "Rok",
      score: 0.1,
      active: false,
      player: "andrea.britesma@gmail.com",
      isPlayer: true,
      isEnemy: false,
      currentHealth: 180,
      totalHealth: 180,
      notes: "",
    },
  ];
}
