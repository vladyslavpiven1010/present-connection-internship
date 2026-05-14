import { useEffect, useState } from "react";
import { exportInventoryPdf, getInventoryItems, softDeleteInventoryItem } from "../api/client";
import { StatusBadge } from "../components/StatusBadge";
import { TemplateDialog } from "../components/TemplateDialog";
import { Button } from "../components/ui/Button";
import { DataTable, TableCell, TableHeaderCell, TableWrap } from "../components/ui/DataTable";
import { ErrorBanner } from "../components/ui/ErrorBanner";
import { Field, Select, TextInput } from "../components/ui/Field";
import { PagePanel, PanelHeader } from "../components/ui/PagePanel";
import { Pagination } from "../components/ui/Pagination";
import { pagination } from "../constants/pagination";
import { formatItemType, itemTypes, type InventoryFilters, type InventoryItem, type PdfTemplate, type User } from "../types";

interface InventoryPageProps {
  users: User[];
}

const initialFilters: InventoryFilters = {
  type: "",
  comment: "",
  userId: ""
};

export function InventoryPage({ users }: InventoryPageProps) {
  const [filters, setFilters] = useState<InventoryFilters>(initialFilters);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExportDialogOpen, setExportDialogOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  async function loadItems() {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getInventoryItems(filters, {
        page: currentPage,
        pageSize: pagination.inventoryItemsPageSize
      });
      setItems(result.items);
      setTotalItems(result.totalItems);
      setTotalPages(result.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inventory items.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, [currentPage, filters.type, filters.comment, filters.userId]);

  function updateFilters(nextFilters: InventoryFilters) {
    setCurrentPage(1);
    setFilters(nextFilters);
  }

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
    <PagePanel>
      <PanelHeader
        action={
          <Button className="w-full sm:w-auto" onClick={() => setExportDialogOpen(true)}>
            Export PDF
          </Button>
        }
        description="Filter assigned devices and export the active subset to PDF."
        title="Inventory items"
      />

      <div className="grid grid-cols-1 gap-3.5 border-b border-slate-200 bg-slate-50/70 px-6 py-4 md:grid-cols-[180px_minmax(220px,1fr)_240px]">
        <Field label="Type">
          <Select
            value={filters.type}
            onChange={(event) => updateFilters({ ...filters, type: event.target.value as InventoryFilters["type"] })}
          >
            <option value="">All types</option>
            {itemTypes.map((type) => (
              <option key={type} value={type}>
                {formatItemType(type)}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Comment">
          <TextInput
            value={filters.comment}
            onChange={(event) => updateFilters({ ...filters, comment: event.target.value })}
            placeholder="Search comment"
          />
        </Field>

        <Field label="User">
          <Select
            value={filters.userId}
            onChange={(event) => updateFilters({ ...filters, userId: event.target.value })}
          >
            <option value="">All users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {error && <ErrorBanner className="m-4" message={error} />}

      <TableWrap>
        <DataTable>
          <colgroup>
            <col className="w-[12%]" />
            <col className="w-[16%]" />
            <col className="w-[20%]" />
            <col className="w-[18%]" />
            <col className="w-[12%]" />
            <col className="w-[10%]" />
            <col className="w-[12%]" />
          </colgroup>
          <thead>
            <tr>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Identifier</TableHeaderCell>
              <TableHeaderCell>Comment</TableHeaderCell>
              <TableHeaderCell>Assigned user</TableHeaderCell>
              <TableHeaderCell>Purchase date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <TableCell className="text-slate-700" colSpan={7}>
                  Loading inventory...
                </TableCell>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <TableCell className="text-slate-700" colSpan={7}>
                  No inventory items found.
                </TableCell>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className={item.isActive ? "text-slate-700" : "bg-slate-50 text-slate-400"}>
                  <TableCell>{formatItemType(item.type)}</TableCell>
                  <TableCell>{item.uniqueIdentifier}</TableCell>
                  <TableCell>{item.comment ?? "-"}</TableCell>
                  <TableCell>{item.assignedUserName}</TableCell>
                  <TableCell>{item.purchaseDate}</TableCell>
                  <TableCell>
                    <StatusBadge isActive={item.isActive} />
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={!item.isActive}
                      onClick={() => void handleSoftDelete(item.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </tr>
              ))
            )}
          </tbody>
        </DataTable>
      </TableWrap>

      {!isLoading && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          pageSize={pagination.inventoryItemsPageSize}
          totalItems={totalItems}
          totalPages={totalPages}
        />
      )}

      <TemplateDialog
        isOpen={isExportDialogOpen}
        isExporting={isExporting}
        onClose={() => setExportDialogOpen(false)}
        onExport={(template) => void handleExport(template)}
      />
    </PagePanel>
  );
}
