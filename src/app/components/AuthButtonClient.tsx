'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const AuthButtonClient = ({ initialSession, initialPosts }: { initialSession: Session | null, initialPosts: any[] }) => {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [posts, setPosts] = useState<any[]>(initialPosts);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: posts } = await supabase.from('post').select('*');
        setPosts(posts || []);
      }
    };

    getSession();
  }, [supabase]); // supabaseを依存配列に追加

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://cxhwsktvngsmxnxfhyaj.supabase.co/auth/v1/callback',
      },
    });
    if (error) console.error('Sign in error', error.message);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign out error', error.message);
    setSession(null);
    setPosts([]);
    router.refresh();
  };

  return (
    <>
      {session ? (
          <button className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-700 mt-12 mr-6" onClick={handleSignOut}>ログアウト</button>
      ) : (
        <button className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-700 mt-12 mr-6" onClick={handleSignIn}>サインイン</button>
      )}
    </>
  );
};

export default AuthButtonClient;
