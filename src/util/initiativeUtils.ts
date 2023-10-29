import { Player } from "@/types/Initiative";

export function advancePlayer(order: Player[], turn: number) {
  const newOrder = [...order];
  let newTurn = turn;
  const currentPlayer = newOrder.findIndex((player) => player.active);
  if (currentPlayer != -1) {
    newOrder[currentPlayer].active = false;
  }
  newOrder[(currentPlayer + 1) % newOrder.length].active = true;

  if (currentPlayer === newOrder.length - 1) {
    newTurn = turn + 1;
  }
  return { newOrder, newTurn };
}
