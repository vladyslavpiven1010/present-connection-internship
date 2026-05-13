import type { User } from "../types";

interface UsersPageProps {
  users: User[];
  isLoading: boolean;
}

export function UsersPage({ users, isLoading }: UsersPageProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
      <div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="mt-1 text-slate-500">People who can have assigned inventory items.</p>
        </div>
        <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 font-bold text-blue-700">{users.length} users</span>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse">
          <thead>
            <tr>
              <th className="border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-xs font-extrabold uppercase text-slate-500">First name</th>
              <th className="border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-xs font-extrabold uppercase text-slate-500">Last name</th>
              <th className="border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-xs font-extrabold uppercase text-slate-500">Unique identifier</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="border-b border-slate-200 px-4 py-3.5 text-slate-700" colSpan={3}>
                  Loading users...
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border-b border-slate-200 px-4 py-3.5 text-slate-700">{user.firstName}</td>
                  <td className="border-b border-slate-200 px-4 py-3.5 text-slate-700">{user.lastName}</td>
                  <td className="border-b border-slate-200 px-4 py-3.5 text-slate-700">{user.uniqueIdentifier}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
