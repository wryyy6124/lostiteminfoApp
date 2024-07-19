'use client';

import { useEffect, useState } from 'react';
import { supabaseAdmin as supabase } from '../../../lib/supabaseAdmin';
import DeleteUser from './DeleteUser';
import { createClientComponentClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import useAuth from '../useAuth';
import Link from 'next/link';

type ListUsersProps = {
  onEdit: (userId: string) => void;
};

export default function ListUsers({ onEdit }: ListUsersProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [remarks, setRemarks] = useState<{ [key: string]: { role: string; remarks: string } }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const recordsPerPage = 8;

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
    const fetchUsers = async () => {
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        alert(`Failed to list users: ${error.message}`);
      } else {
        setUsers(data.users);
        setFilteredUsers(data.users); // 初期化時に全ユーザーをセット
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('id, role, remarks_column')
        .order('created_at', { ascending: false }); // created_atで降順に並び替え

      if (profileError) {
        console.error('Error fetching profiles:', profileError);
      } else if (profileData) {
        const remarksMap: { [key: string]: { role: string; remarks: string } } = {};
        profileData.forEach((profile: { id: string; role: string | null; remarks_column: string | null }) => {
          remarksMap[profile.id] = { role: profile.role ?? '未設定', remarks: profile.remarks_column ?? '' };
        });
        setRemarks(remarksMap);
      }
    };

    fetchUsers();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const startIndex = (currentPage - 1) * recordsPerPage;
  const selectedUsers = filteredUsers.slice(startIndex, startIndex + recordsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

  useEffect(() => {
    const searchQueryLower = searchQuery.toLowerCase();
    const filtered = users.filter(user => {
      const userProfile = remarks[user.id] || { role: '未設定', remarks: '' }; // デフォルト値を設定
      return (
        user.id.toLowerCase().includes(searchQueryLower) ||
        user.email.toLowerCase().includes(searchQueryLower) ||
        userProfile.role.toLowerCase().includes(searchQueryLower) ||
        userProfile.remarks.toLowerCase().includes(searchQueryLower)
      );
    });
    setFilteredUsers(filtered);
  }, [searchQuery, users, remarks]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">登録済みユーザーのリスト</h1>
      <input
        type="text"
        placeholder="検索"
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full sm:w-2/3 lg:w-1/2"
      />
      <ul className="space-y-4">
        {selectedUsers.map((user) => (
          <li key={user.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">ユーザーID: {user.id}</p>
              <p>メールアドレス: {user.email}</p>
              <p>権限: {remarks[user.id]?.role || '未設定'}</p>
              {remarks[user.id]?.remarks && <p>コメント: {remarks[user.id].remarks}</p>}
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-700"
                onClick={() => onEdit(user.id)}
              >
                修正
              </button>
              <DeleteUser userId={user.id} onDelete={handleDelete} />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center space-x-2">
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
}
