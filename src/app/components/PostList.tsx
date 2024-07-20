'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import useAuth from '../useAuth';

const PostList = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ページネーションのためのステートを追加
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const supabase = createClientComponentClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: posts, error } = await supabase
          .from('post')
          .select('*')
          .eq('hidden', false) // hiddenがfalseのレコードのみ取得
          .order('find_date', { ascending: false }); // find_dateで降順に並び替え;
        if (error) {
          console.error('Error fetching posts:', error);
        } else {
          setPosts(posts || []);
          setFilteredPosts(posts);
        }
      }
    };

    // URLパラメータから検索クエリを取得
    const searchQueryParam = searchParams.get('search');
    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }

    getSession();
  }, [supabase, searchParams]);

  useAuth();

  const navigateToDetail = (postId: string) => {
    // 現在の検索クエリをURLパラメータに保存
    const url = new URL(window.location.href);
    url.searchParams.set('search', searchQuery);
    history.replaceState(null, '', url.toString());

    router.push(`/post/${postId}`);
  };

  useEffect(() => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = posts.filter(post => {
      const dateMatch = new Date(post.find_date).toLocaleDateString().includes(searchQueryLower);
      const resolvedMatch = (searchQueryLower === '済' && post.resolved === true) ||
                            (searchQueryLower === '未' && post.resolved === false);
      return post.lostitem_name.toLowerCase().includes(searchQueryLower) || dateMatch || resolvedMatch;
    });
    setFilteredPosts(filtered);
    setCurrentPage(1); // 検索クエリが変更されたときにページをリセット
  }, [searchQuery, posts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `発見日：${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // ページネーションのためのハンドラを追加
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const selectedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="border-b-2 border-gray-200 pb-4 mb-6">
        <input
          type="text"
          placeholder="キーワードを入力してください"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col space-y-4">
        {selectedPosts.map((post) => ( // 変更：filteredPostsからselectedPostsへ
          <div key={post.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full">
                {post.resolved ? (
                  <Image src="/img/true.png" alt="Resolved" width={50} height={50} className="rounded-full" />
                ) : (
                  <Image src="/img/false.png" alt="Unresolved" width={50} height={50} className="rounded-full" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{post.lostitem_name}</h2>
                <p className="text-gray-700">{formatDate(post.find_date)}</p>
              </div>
            </div>
            <button
              onClick={() => navigateToDetail(post.id)}
              className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-700"
            >
              詳細
            </button>
          </div>
        ))}
      </div>

      {/* ページネーションのためのボタンを追加 */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
            className={`py-2 px-4 rounded ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;
