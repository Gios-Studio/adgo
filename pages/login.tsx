export default function LoginForm({ onLogin }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    onLogin?.(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label htmlFor="email" className="font-semibold text-sm">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
        className="border rounded-lg p-2"
      />

      <label htmlFor="password" className="font-semibold text-sm">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="••••••••"
        required
        className="border rounded-lg p-2"
      />

      <button type="submit" className="bg-green-600 text-white rounded-lg py-2 mt-3">
        Log In
      </button>
    </form>
  );
}