import { useEffect, useState } from "react";
import { exportInventoryPdf, getInventoryItems, softDeleteInventoryItem } from "../api/client";
import { StatusBadge } from "../components/StatusBadge";
import { TemplateDialog } from "../components/TemplateDialog";
import { formatItemType, itemTypes, type InventoryFilters, type InventoryItem, type PdfTemplate, type User } from "../types";

interface InventoryPageProps {
  users: User[];
}

const initialFilters: InventoryFilters = {
  type: "",
  comment: "",
  userId: ""
};

const tableHeaderClass = "border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-xs font-extrabold uppercase text-slate-500";
const tableCellClass = "border-b border-slate-200 px-4 py-3.5";
const controlClass = "min-h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10";

export function InventoryPage({ users }: InventoryPageProps) {
  const [filters, setFilters] = useState<InventoryFilters>(initialFilters);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExportDialogOpen, setExportDialogOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function loadItems() {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getInventoryItems(filters);
      setItems(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inventory items.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, [filters.type, filters.comment, filters.userId]);

  async function handleSoftDelete(id: string) {
    setError(null);

    try {
      await softDeleteInventoryItem(id);
      await loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item.");
    }
  }

  async function handleExport(template: PdfTemplate) {
    setIsExporting(true);
    setError(null);

    try {
      await exportInventoryPdf(filters, template);
      setExportDialogOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export PDF.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
      <div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory items</h1>
          <p className="mt-1 text-slate-500">Filter assigned devices and export the active subset to PDF.</p>
        </div>
        <button
          className="min-h-10 w-full rounded-md bg-blue-600 px-4 font-extrabold text-white sm:w-auto"
          onClick={() => setExportDialogOpen(true)}
        >
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3.5 border-b border-slate-200 bg-slate-50/70 px-6 py-4 md:grid-cols-[180px_minmax(220px,1fr)_240px]">
        <label className="grid gap-1.5 text-sm font-bold text-slate-700">
          <span>Type</span>
          <select
            className={controlClass}
            value={filters.type}
            onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value as InventoryFilters["type"] }))}
          >
            <option value="">All types</option>
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {formatItemType(type)}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm font-bold text-slate-700">
          <span>Comment</span>
          <input
            className={controlClass}
            value={filters.comment}
            onChange={(event) => setFilters((current) => ({ ...current, comment: event.target.value }))}
            placeholder="Search comment"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-bold text-slate-700">
          <span>User</span>
          <select
            className={controlClass}
            value={filters.userId}
            onChange={(event) => setFilters((current) => ({ ...current, userId: event.target.value }))}
          >
            <option value="">All users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <div className="m-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-800">{error}</div>}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr>
              <th className={tableHeaderClass}>Type</th>
              <th className={tableHeaderClass}>Identifier</th>
              <th className={tableHeaderClass}>Comment</th>
              <th className={tableHeaderClass}>Assigned user</th>
              <th className={tableHeaderClass}>Purchase date</th>
              <th className={tableHeaderClass}>Status</th>
              <th className={tableHeaderClass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className={`${tableCellClass} text-slate-700`} colSpan={7}>
                  Loading inventory...
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className={item.isActive ? "text-slate-700" : "bg-slate-50 text-slate-400"}>
                  <td className={tableCellClass}>{formatItemType(item.type)}</td>
                  <td className={tableCellClass}>{item.uniqueIdentifier}</td>
                  <td className={tableCellClass}>{item.comment ?? "-"}</td>
                  <td className={tableCellClass}>
                    {item.assignedUserName}
                    <span className="mt-1 block text-xs text-slate-500">{item.assignedUserIdentifier}</span>
                  </td>
                  <td className={tableCellClass}>{item.purchaseDate}</td>
                  <td className={tableCellClass}>
                    <StatusBadge isActive={item.isActive} />
                  </td>
                  <td className={tableCellClass}>
                    <button
                      className="min-h-10 rounded-md border border-red-200 bg-red-50 px-3.5 font-extrabold text-red-800"
                      onClick={() => void handleSoftDelete(item.id)}
                      disabled={!item.isActive}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TemplateDialog
        isOpen={isExportDialogOpen}
        isExporting={isExporting}
        onClose={() => setExportDialogOpen(false)}
        onExport={(template) => void handleExport(template)}
      />
    </section>
  );
}
