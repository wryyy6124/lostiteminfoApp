'use client';

import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import AuthButtonClient from './components/AuthButtonClient';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: posts } = await supabase.from('posts').select('*');
        setPosts(posts || []);
      }
    };

    getSession();
  }, [router, supabase]);

  useAuth();

  const navigateToAdmin = () => {
    router.push('/admin');
  };

  const navigateToPost = () => {
    router.push('/post');
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">This website is currently being manufactured...</h1>
      {session ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <AuthButtonClient initialSession={session} initialPosts={posts} />
          </div>
          <div className="flex flex-col"> 
            {posts.map((post, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-20">
            <button
              onClick={navigateToAdmin}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 mr-6"
            >
              Go to Admin Page
            </button>
            <button
              onClick={navigateToPost}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 ml-6"
            >
              Go to Post Page
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
}
