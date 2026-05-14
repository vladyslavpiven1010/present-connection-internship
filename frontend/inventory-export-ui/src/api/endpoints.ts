export const apiEndpoints = {
  users: "/users",
  inventoryItems: "/inventory-items",
  inventoryItemById: (id: string) => `/inventory-items/${id}`,
  exportPdf: "/export/pdf"
} as const;

export const downloadFileNames = {
  inventoryExportPdf: (template: string) => `inventory-export-${template.toLowerCase()}.pdf`
} as const;
