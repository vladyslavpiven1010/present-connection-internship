import { useEffect, useMemo, useState } from "react";
import { DataTable, TableCell, TableHeaderCell, TableWrap } from "../components/ui/DataTable";
import { PagePanel, PanelHeader } from "../components/ui/PagePanel";
import { Pagination } from "../components/ui/Pagination";
import { pagination } from "../constants/pagination";
import type { User } from "../types";

interface UsersPageProps {
  users: User[];
  isLoading: boolean;
}

export function UsersPage({ users, isLoading }: UsersPageProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.max(1, Math.ceil(users.length / pagination.usersPageSize));
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pagination.usersPageSize;
    return users.slice(startIndex, startIndex + pagination.usersPageSize);
  }, [currentPage, users]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <PagePanel>
      <PanelHeader
        badge={<span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 font-bold text-blue-700">{users.length} users</span>}
        description="People who can have assigned inventory items."
        title="Users"
      />

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
            ) : paginatedUsers.length === 0 ? (
              <tr>
                <TableCell className="text-slate-700" colSpan={3}>
                  No users found.
                </TableCell>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
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
          totalItems={users.length}
        />
      )}
    </PagePanel>
  );
}
