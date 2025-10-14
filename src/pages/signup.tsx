import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('advertiser')
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: any) {
    e.preventDefault()
    setLoading(true)

    // 1. Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    const user = data.user
    if (!user) {
      alert('No user returned from Supabase')
      setLoading(false)
      return
    }

    // 2. Insert user into our public.users table with role
    await supabase.from('users').insert([{ id: user.id, email, role }]).select()

    // 3. Redirect based on role
    router.push(`/dashboard/${role}`)
  }

  return (
    <form onSubmit={handleSignup} className="max-w-sm mx-auto mt-20 space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2"
      >
        <option value="advertiser">Advertiser</option>
        <option value="driver">Driver</option>
        <option value="partner">Partner</option>
      </select>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2"
        disabled={loading}
      >
        {loading ? 'Signing up…' : 'Sign Up'}
      </button>
    </form>
  )
}