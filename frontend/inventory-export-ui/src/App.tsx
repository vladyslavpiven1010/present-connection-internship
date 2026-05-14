import { useEffect, useState } from "react";
import { getUsers } from "./api/client";
import { Button } from "./components/ui/Button";
import { ErrorBanner } from "./components/ui/ErrorBanner";
import { pagination } from "./constants/pagination";
import { InventoryPage } from "./pages/InventoryPage";
import { UsersPage } from "./pages/UsersPage";
import type { ActivePage, User } from "./types";

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>("inventory");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await getUsers({
          page: 1,
          pageSize: pagination.usersSelectPageSize
        });
        setUsers(response.items);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users.");
      }
    }

    void loadUsers();
  }, []);

  return (
    <main className="mx-auto w-[min(1180px,calc(100%_-_32px))] py-7 max-sm:w-[calc(100%_-_20px)] max-sm:py-5">
      <header className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight text-slate-900">Inventory Manager</h1>
        </div>

        <nav className="flex gap-2 rounded-lg border border-slate-200 bg-white p-1" aria-label="Main navigation">
          <Button
            className="w-full sm:w-auto"
            isActive={activePage === "inventory"}
            onClick={() => setActivePage("inventory")}
            variant="tab"
          >
            Inventory
          </Button>
          <Button
            className="w-full sm:w-auto"
            isActive={activePage === "users"}
            onClick={() => setActivePage("users")}
            variant="tab"
          >
            Users
          </Button>
        </nav>
      </header>

      {error && <ErrorBanner className="mb-3.5" message={error} />}

      {activePage === "inventory" ? (
        <InventoryPage users={users} />
      ) : (
        <UsersPage />
      )}
    </main>
  );
}
