'use client';

import { useTransition } from 'react';

export default function CreateForm() {
  const [pending, start] = useTransition();

  async function onCreate() {
    await fetch('/api/copilot/create-task', { method: 'POST' });
    window.location.reload();
  }

  return (
    <button
      onClick={() => start(onCreate)}
      className="px-4 py-2 rounded bg-emerald-600 text-white"
      disabled={pending}
    >
      {pending ? 'Creating…' : 'Create Nairobi Partner Task'}
    </button>
  );
}
