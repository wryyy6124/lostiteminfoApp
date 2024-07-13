'use client';

import { useState, FormEvent } from 'react';
import { supabaseAdmin } from '../../../lib/supabaseAdmin';

const supabase = supabaseAdmin;

export default function GetUserById() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleGetUser = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.admin.getUserById(userId);

      if (error) {
        alert(`Failed to get user: ${error.message}`);
      } else {
        setUser(data);
        alert('User retrieved successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to get user: ${error.message}`);
      } else {
        alert('Failed to get user: An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Get User By ID</h1>
      <form onSubmit={handleGetUser}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </label>
        <button type="submit">Get User</button>
      </form>
      {user && (
        <div>
          <h2>User Details</h2>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.password}</p>
          {/* 他のユーザー情報を表示する */}
        </div>
      )}
    </div>
  );
}
