'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import useAuth from '../useAuth';

const AccountInfo = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: user } = await supabase.from('profile').select('role').eq('id', session.user.id).single();
        setRole(user?.role || null);
      }
    };

    getSession();
  }, [supabase]);

  useAuth();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">🔑 アカウント情報</h1>
      {role === 'admin' && (
        <div className="mt-10 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">★ 管理者権限ページ <span className="text-sm text-gray-600">admin権限者のみ</span></h2>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-red-500">新規スレッドを投稿する</li>
            <li className="text-red-500">新規ユーザーを追加する</li>
            <li className="text-red-500">登録済みユーザーのリスト</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
