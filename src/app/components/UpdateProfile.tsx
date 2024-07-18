'use client';

import { useState, FormEvent, useEffect } from 'react';
import { supabaseAdmin as supabase } from '../../../lib/supabaseAdmin';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import useAuth from '../useAuth';

type SupabaseUser = {
  id: string;
  email?: string;
};

type UpdateProfileProps = {
  userId: string;
};

export default function UpdateProfile({ userId }: UpdateProfileProps) {
  const [email, setEmail] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [role, setRole] = useState('user');
  const [remarksColumn, setRemarksColumn] = useState('');
  const [user, setUser] = useState<SupabaseUser | null>(null);
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

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.admin.getUserById(userId);

      if (error) {
        console.error('Error fetching user:', error);
        alert('User not found');
      } else if (data) {
        const userData = data.user as SupabaseUser;
        setUser(userData);
        setEmail(userData.email || '');

        // プロフィール情報を取得するための修正
        const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('role, remarks_column')
          .eq('id', userData.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
          alert('Profile not found');
        } else if (profileData) {
          setRole(profileData.role || 'user');
          setRemarksColumn(profileData.remarks_column || '');
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { error: emailError } = await supabase.auth.admin.updateUserById(userId, {
        email,
      });

      if (emailError) {
        throw new Error(emailError.message);
      }

      const { error: profileError } = await supabase
        .from('profile')
        .update({
          role,
          updated_at: new Date(),
          updated_by: session?.user?.id || '',
          remarks_column: remarksColumn,
        })
        .eq('id', userId);

      if (profileError) {
        throw new Error(profileError.message);
      }

      alert('Profile updated successfully');

      setEmail(''); // フォームをリセット
      setTemporaryPassword(''); // フォームをリセット
      setRole('user'); // フォームをリセット
      setRemarksColumn(''); // フォームをリセット

    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to update profile: ${error.message}`);
      } else {
        alert('Failed to update profile: An unknown error occurred');
      }
    }
  };

  const handleGenerateTemporaryPassword = async () => {
    const generatedPassword = Math.random().toString(36).slice(-8); // 仮パスワードを生成
    setTemporaryPassword(generatedPassword);

    try {
      const { error: passwordError } = await supabase.auth.admin.updateUserById(userId, {
        password: generatedPassword,
      });

      if (passwordError) {
        throw new Error(passwordError.message);
      }

      alert('Temporary password generated and updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to generate temporary password: ${error.message}`);
      } else {
        alert('Failed to generate temporary password: An unknown error occurred');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl text-center font-bold mb-4">ユーザー情報を修正する</h1>
      <div className="mt-8 mb-8">
        <p>更新者 ID: {session?.user?.id}</p>
      </div>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">ユーザーID:</label>
          <input
            title="User ID"
            type="text"
            value={userId}
            readOnly
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">メールアドレス:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="例: abcde@gmail.com"
            className="w-full p-3 border border-gray-300 rounded"
            required
            title="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">権限:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
            title="Select Role"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          {temporaryPassword && <p className="mt-4 text-gray-700">発行パスワード: {temporaryPassword}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-6">パスワード:</label>
          <input
            type="password"
            value={temporaryPassword}
            placeholder="例: ab12%&~aet"
            readOnly
            className="w-full p-3 mb-6 border border-gray-300 rounded h-12"
          />
        </div>
        <div className="flex mt-15 items-center justify-center">
          <button
            type="button"
            onClick={handleGenerateTemporaryPassword}
            className="p-3 bg-black text-white rounded hover:bg-gray-700 w-1/3"
          >
            仮パスワードを生成
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mt-16 mb-2">備考欄:</label>
          <textarea
            placeholder="登録情報など必要に応じて記入ください。"
            value={remarksColumn}
            onChange={(e) => setRemarksColumn(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" className="w-1/3 p-3 mb-10 bg-black text-white rounded hover:bg-gray-700">ユーザー情報を更新する</button>
        </div>
      </form>
    </div>
  );
}
