import { useEffect, useState } from "react";
import { getUsers } from "./api/client";
import { InventoryPage } from "./pages/InventoryPage";
import { UsersPage } from "./pages/UsersPage";
import type { ActivePage, User } from "./types";

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>("inventory");
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setUsersLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setUsers(await getUsers());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load users.");
      } finally {
        setUsersLoading(false);
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
          <button
            className={
              activePage === "inventory"
                ? "w-full rounded-md bg-blue-600 px-4 py-2.5 font-bold text-white sm:w-auto"
                : "w-full rounded-md px-4 py-2.5 font-bold text-slate-500 sm:w-auto"
            }
            onClick={() => setActivePage("inventory")}
          >
            Inventory
          </button>
          <button
            className={
              activePage === "users"
                ? "w-full rounded-md bg-blue-600 px-4 py-2.5 font-bold text-white sm:w-auto"
                : "w-full rounded-md px-4 py-2.5 font-bold text-slate-500 sm:w-auto"
            }
            onClick={() => setActivePage("users")}
          >
            Users
          </button>
        </nav>
      </header>

      {error && <div className="mb-3.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-800">{error}</div>}

      {activePage === "inventory" ? (
        <InventoryPage users={users} />
      ) : (
        <UsersPage users={users} isLoading={isUsersLoading} />
      )}
    </main>
  );
}
