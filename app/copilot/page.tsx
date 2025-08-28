import { getMyTasks } from '@/server/copilot';
import CreateForm from './_create-form';

export default async function CopilotPage() {
  const tasks = await getMyTasks({ city: 'Nairobi' }).catch(() => []);
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">AdGo Copilot — Nairobi</h1>
      <CreateForm />
      <section>
        <h2 className="text-xl font-medium mb-2">My Tasks</h2>
        <ul className="space-y-2">
          {tasks.map((t: any) => (
            <li key={t.id} className="border rounded p-3">
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-gray-600">{t.status} · Priority {t.priority}</div>
              {t.city && <div className="text-sm">City: {t.city}</div>}
            </li>
          ))}
          {tasks.length === 0 && <p className="text-sm text-gray-500">No tasks yet.</p>}
        </ul>
      </section>
    </main>
  );
}
