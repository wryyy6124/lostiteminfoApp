// src/app/components/UpdateProfile.tsx
'use client';

import { useState, FormEvent, useEffect } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import useAuth from '../useAuth';
import { supabaseAdmin as supabase } from '../../../lib/supabaseAdmin';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import styles from '../admin/edit/[userid]/UserId.module.css';

export default function UpdateProfile() {
  const [email, setEmail] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [role, setRole] = useState('user');
  const [remarksColumn, setRemarksColumn] = useState('');
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();
  const { userid } = useParams(); // URL パラメータから userId を取得
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
    if (!userid) return;

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.admin.getUserById(userid as string);

      if (error) {
        console.error('Error fetching user:', error);
        alert('User not found');
      } else if (data) {
        const userData = data.user;
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
  }, [userid]);

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { error: emailError } = await supabase.auth.admin.updateUserById(userid as string, {
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
        .eq('id', userid as string);

      if (profileError) {
        throw new Error(profileError.message);
      }

      alert('Profile updated successfully');

      // setEmail('');
      // // setTemporaryPassword('');
      // setRole('user');
      // setRemarksColumn('');

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
      const { error: passwordError } = await supabase.auth.admin.updateUserById(userid as string, {
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
    <div className="w-full pb-24">
      <h2
        className={`w-full bg-neutral-100 text-lg text-red-500 font-bold z-10 sticky top-0 ${styles.contents_h2}`}
      >
        <div className="w-full max-w-5xl mx-auto p-4">
          📝 ユーザー情報を修正する
        </div>
      </h2>
        <div className="w-full max-w-5xl mx-auto p-5 mt-5">
          <div className="w-full max-w-3xl mx-auto">
            <div className="mt-8 mb-8">
            <p>更新者 ID: {session?.user?.id}</p>
          </div>
            <form className="w-full" onSubmit={handleUpdateProfile}>
              <div className="mb-7">
                <label className="text-sm font-bold mb-1.5" htmlFor="id">
                        ユーザーID
                </label>
                <div className="mt-1 mb-2">
                  <input
                    title="User ID"
                    type="text"
                    value={userid as string}
                    readOnly
                    className="w-full p-3 border border-gray-300 rounded" />
                </div>
              </div>
              <div className="mb-7">
                <label className="text-sm font-bold mb-1.5" htmlFor="email">
                  メールアドレス
                </label>
                <div className="mt-1 mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="例: abcde@gmail.com"
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                  title="Email" />
              </div>
            </div>
              <div className="mb-7">
                <label className="text-sm font-bold mb-1.5" htmlFor="role">
                  権限
                </label>
                <div className="mt-1 mb-2">
                  <div className="w-80">
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
                </div>
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
                  className="w-full p-3 mb-6 border border-gray-300 rounded h-12" />
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
              <div className="mb-14">
                <label className="text-sm font-bold mb-1.5" htmlFor="remarks">
                  備考欄
                </label>
                <div className="mt-1 mb-2">
                  <textarea
                    placeholder="登録情報など必要に応じて記入ください。"
                    value={remarksColumn}
                    onChange={(e) => setRemarksColumn(e.target.value)}
                    className="w-full p-3 mb-6 border border-gray-300 rounded" />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="block w-5/6 md:w-1/2 rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
              >
                ユーザー情報を修正する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
