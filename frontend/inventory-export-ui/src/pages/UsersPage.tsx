import { useEffect, useState } from "react";
import { getUsers } from "../api/client";
import { DataTable, TableCell, TableHeaderCell, TableWrap } from "../components/ui/DataTable";
import { ErrorBanner } from "../components/ui/ErrorBanner";
import { PagePanel, PanelHeader } from "../components/ui/PagePanel";
import { Pagination } from "../components/ui/Pagination";
import { pagination } from "../constants/pagination";
import type { User } from "../types";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        const response = await getUsers({
          page: currentPage,
          pageSize: pagination.usersPageSize
        });
        setUsers(response.items);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users.");
      } finally {
        setLoading(false);
      }
    }

    void loadUsers();
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <PagePanel>
      <PanelHeader
        description="People who can have assigned inventory items."
        title="Users"
      />

      {error && <ErrorBanner className="m-4" message={error} />}

      <TableWrap>
        <DataTable>
          <colgroup>
            <col className="w-1/3" />
            <col className="w-1/3" />
            <col className="w-1/3" />
          </colgroup>
          <thead>
            <tr>
              <TableHeaderCell>First name</TableHeaderCell>
              <TableHeaderCell>Last name</TableHeaderCell>
              <TableHeaderCell>Unique identifier</TableHeaderCell>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <TableCell className="text-slate-700" colSpan={3}>
                  Loading users...
                </TableCell>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <TableCell className="text-slate-700" colSpan={3}>
                  No users found.
                </TableCell>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <TableCell className="text-slate-700">{user.firstName}</TableCell>
                  <TableCell className="text-slate-700">{user.lastName}</TableCell>
                  <TableCell className="text-slate-700">{user.uniqueIdentifier}</TableCell>
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
          pageSize={pagination.usersPageSize}
          totalItems={totalItems}
          totalPages={totalPages}
        />
      )}
    </PagePanel>
  );
}
