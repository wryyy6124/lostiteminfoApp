'use client';

import { useState, FormEvent, useEffect } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import useAuth from '../useAuth';
import { supabaseAdmin as supabase } from '../../../lib/supabaseAdmin';

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [remarksColumn, setRemarksColumn] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  const supabaseClient = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      setSession(session);
      console.log('Session:', session);
    };
    getSession();
  }, [supabaseClient.auth]);

  useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
      });

      if (error) {
        alert(`Failed to create user: ${error.message}`);
      } else {
        // ユーザー作成成功後、プロフィールテーブルにroleとremarksを追加
        await supabase
          .from('profile')
          .upsert({
            id: data.user.id,
            role,
            remarks_column: remarksColumn,
            created_at: new Date(),
            created_by: session?.user?.id || '',
          });

        alert('User created successfully');
        setEmail('');
        setPassword('');
        setRole('user');
        setRemarksColumn('');
        setTemporaryPassword('');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to create user: ${error.message}`);
      } else {
        alert('Failed to create user: An unknown error occurred');
      }
    }
  };

  const generateTemporaryPassword = () => {
    const tempPassword = Math.random().toString(36).slice(-8);
    setTemporaryPassword(tempPassword);
    setPassword(tempPassword);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">新規ユーザーを追加する</h1>
      <div className="mt-8 mb-8">
        <p>登録者 ID: {session?.user?.id}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">メールアドレス:</label>
          <input
            type="email"
            placeholder="例: abcde@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-3">権限:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-10 border border-gray-300 rounded"
            required
            title="Role"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex align-items: center justify-center">
          {temporaryPassword && <p className="mt-4 text-gray-700">発行パスワード: {temporaryPassword}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">仮パスワード:</label>
          <input
            type="password"
            placeholder="例: ab12%&~aet"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded h-12 border flex-grow"
            required
          />
        </div>
        <div className="flex align-items: center justify-center">
          <button
            type="button"
            onClick={generateTemporaryPassword}
            className="w-1/2 p-3 mt-8 bg-black text-white rounded hover:bg-gray-700"
          >
            仮パスワードを生成
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mt-6 mb-2">備考欄:</label>
          <textarea
            placeholder="登録情報など必要に応じて記入ください。"
            value={remarksColumn}
            onChange={(e) => setRemarksColumn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div className="flex align-items: center justify-center">
          <button type="submit" className="w-1/2 p-3 mt-8 mb-8 bg-black text-white rounded hover:bg-gray-700">ユーザーを追加する</button>
        </div>
      </form>
    </div>
  );
}
