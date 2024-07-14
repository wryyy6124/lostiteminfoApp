'use client';

import { useEffect, useState } from 'react';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';
import DeleteUser from './DeleteUser';

const supabase = supabaseAdmin;

type ListUsersProps = {
  onEdit: (userId: string) => void;
};

export default function ListUsers({ onEdit }: ListUsersProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [remarks, setRemarks] = useState<{ [key: string]: { role: string; remarks: string } }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 16;

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.auth.admin.listUsers();

      if (error) {
        alert(`Failed to list users: ${error.message}`);
      } else {
        setUsers(data.users);
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('id, role, remarks_column');

      if (profileError) {
        console.error('Error fetching profiles:', profileError);
      } else if (profileData) {
        const remarksMap: { [key: string]: { role: string; remarks: string } } = {};
        profileData.forEach((profile: { id: string; role: string; remarks_column: string }) => {
          remarksMap[profile.id] = { role: profile.role, remarks: profile.remarks_column };
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
  const selectedUsers = users.slice(startIndex, startIndex + recordsPerPage);
  const totalPages = Math.ceil(users.length / recordsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">登録済みユーザーのリスト</h1>
      <ul className="space-y-4">
        {selectedUsers.map((user) => (
          <li key={user.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">ユーザーID: {user.id}</p>
              <p>メールアドレス: {user.email}</p>
              <p>権限: {remarks[user.id]?.role || 'N/A'}</p>
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
