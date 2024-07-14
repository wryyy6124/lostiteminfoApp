'use client';

import { supabaseAdmin } from '../../../lib/supabaseAdmin';

const supabase = supabaseAdmin;

export default function DeleteUser({ userId, onDelete }: { userId: string, onDelete: (userId: string) => void }) {
  const handleDelete = async () => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        alert(`Failed to delete user: ${error.message}`);
      } else {
        alert('User deleted successfully');
        onDelete(userId); // リストからユーザーを削除
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to delete user: ${error.message}`);
      } else {
        alert('Failed to delete user: An unknown error occurred');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700">
      削除
    </button>
  );
}
