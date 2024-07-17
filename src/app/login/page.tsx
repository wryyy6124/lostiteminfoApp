'use client'; // クライアントコンポーネントとして扱うために追加

import { useState, useEffect } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      setSession(session as Session | null);
      console.log('Session:', session);
      console.log('Error:', error);

      if (session) {
        router.push("/");
      }
    };

    fetchSession();
  }, [router, supabase]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
        className="mt-8 px-10 py-6 bg-gray-600 text-white text-2xl font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Googleでサインイン
      </button>
    </div>
  );
};

export default Login;
