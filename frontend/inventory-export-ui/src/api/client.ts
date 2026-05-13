import type { InventoryFilters, InventoryItem, PdfTemplate, User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is not configured. Add it to frontend/inventory-export-ui/.env.");
}

function toSearchParams(filters: InventoryFilters, template?: PdfTemplate): URLSearchParams {
  const params = new URLSearchParams();

  if (template) params.set("template", template);
  if (filters.type) params.set("type", filters.type);
  if (filters.comment?.trim()) params.set("comment", filters.comment.trim());
  if (filters.userId) params.set("userId", filters.userId);

  return params;
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);

  return response.json() as Promise<T>;
}

export function getUsers(): Promise<User[]> {
  return request<User[]>("/users");
}

export function getInventoryItems(filters: InventoryFilters): Promise<InventoryItem[]> {
  const params = toSearchParams(filters);
  return request<InventoryItem[]>(`/inventory-items?${params}`);
}

export async function softDeleteInventoryItem(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/inventory-items/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
}

export async function exportInventoryPdf(filters: InventoryFilters, template: PdfTemplate): Promise<void> {
  const params = toSearchParams(filters, template);
  const response = await fetch(`${API_BASE_URL}/export/pdf?${params}`);

  if (!response.ok) throw new Error(`Export failed: ${response.status}`);

  const blob = await response.blob();
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = `inventory-export-${template.toLowerCase()}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(href);
}
