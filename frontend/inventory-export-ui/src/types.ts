export type ItemType = "Tablet" | "Phone" | "SimCard" | "Laptop";

export const itemTypes: ItemType[] = ["Tablet", "Phone", "SimCard", "Laptop"];

export type PdfTemplate = "Classic" | "Compact";

export type ActivePage = "inventory" | "users";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  uniqueIdentifier: string;
}

export interface InventoryItem {
  id: string;
  type: ItemType;
  uniqueIdentifier: string;
  comment: string | null;
  purchaseDate: string;
  isActive: boolean;
  assignedUserId: string;
  assignedUserName: string;
  assignedUserIdentifier: string;
}

export interface InventoryFilters {
  type?: ItemType | "";
  comment?: string;
  userId?: string;
}

export function formatItemType(type: ItemType): string {
  return type === "SimCard" ? "SIM card" : type;
}
