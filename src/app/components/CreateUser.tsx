'use client';

import { useState, FormEvent, useEffect } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import useAuth from '../useAuth';
import { supabaseAdmin as supabase } from '../../../lib/supabaseAdmin';
import styles from '../admin/adduser/AddUser.module.css';

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [remarksColumn, setRemarksColumn] = useState('');
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
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to create user: ${error.message}`);
      } else {
        alert('Failed to create user: An unknown error occurred');
      }
    }
  };

  return (
    <div className={`w-full pb-24`}>
    <h2
      className={`w-full bg-neutral-100 text-lg text-red-500 font-bold z-10 sticky top-0 ${styles.contents_h2}`}
    >
      <div className={`w-full max-w-5xl mx-auto p-4`}>
        🙋 新規ユーザーを追加する
      </div>
    </h2>
    <div className={`w-full max-w-5xl mx-auto p-5 mt-5`}>
      <div className={`w-full max-w-3xl mx-auto`}>
        <form className={`w-full`} onSubmit={handleSubmit}>
          <div className={`mb-7`}>
            <label className={`text-sm font-bold mb-1.5`}>メールアドレス</label>
            <div className={`mt-1 mb-2`}>
              <input
                type="email"
                placeholder="例: abcde@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200`}
                required
              />
            </div>
          </div>
        <div className={`mb-7`}>
          <label className={`text-sm font-bold mb-1.5`}>権限</label>
            <div className={`mt-1 mb-2`}>
              <div className={`w-80`}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`${styles.select} w-full text-sm p-3 rounded-md border-2 border-solid border-blue-gray-200 focus:border-2`}
                required
                title="Role"
              >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
        <div className={`mb-14`}>
          <label className={`text-sm font-bold mb-1.5`}>備考欄</label>
            <div className="mt-1 mb-2">
              <textarea
                placeholder="登録情報など必要に応じて記入ください。"
                value={remarksColumn}
                onChange={(e) => setRemarksColumn(e.target.value)}
                className={`w-full text-sm p-3 rounded-md border-2 border-solid border-gray-200`}
              />
            </div>
        </div>
        <div className={`flex justify-center`}>
          <button type="submit" className={`block w-5/6 md:w-1/2 rounded-lg bg-gray-950 p-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700`}>ユーザーを追加する</button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}
