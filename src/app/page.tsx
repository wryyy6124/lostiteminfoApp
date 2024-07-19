'use client';

import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import PostList from './components/PostList';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profile, error } = await supabase
          .from('profile')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setUserRole(profile.role);
        }
      }
    };

    getSession();
  }, [supabase]);

  useAuth();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">おとしものインフォメーション</h1>

      {session ? (
        <>
        <p className="text-center text-gray-600 mb-4">ログインユーザーID: {session.user.id}</p>
        <PostList />
        {userRole === 'admin' && (
          <nav>
            <ul className='flex justify-around'>
              <li className='text-xl font-bold text-center my-10'>
                <Link href="/admin">アカウント情報ページ</Link>
              </li>
              <li className='text-xl font-bold text-center my-10'>
                <Link href="/post">新規スレッドを投稿する</Link>
              </li>
            </ul>
          </nav>
        )}
        </>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
}
