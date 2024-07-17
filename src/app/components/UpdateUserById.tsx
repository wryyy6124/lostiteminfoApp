'use client';

import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { supabaseAdmin as supabase } from '../../../lib/supabaseAdmin';

export default function UpdateUserById() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [remarksColumn, setRemarksColumn] = useState('');
  const supabaseClient = createClientComponentClient();

  const handleFetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.admin.getUserById(userId);

      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setEmail(data.user.email ?? '');
        // role と remarks を表示するためのデータ取得
        const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('role, remarks_column')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile data:', profileError.message);
        } else {
          setRole(profileData?.role || '未設定');
          setRemarksColumn(profileData?.remarks_column || '');
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updates: { email?: string; data?: { role?: string; remarks_column?: string } } = {};
      if (email) updates.email = email;
      if (role || remarksColumn) {
        updates.data = {};
        if (role) updates.data.role = role;
        if (remarksColumn) updates.data.remarks_column = remarksColumn;
      }

      const { error } = await supabase.auth.admin.updateUserById(userId, updates);

      if (error) {
        console.error('Error updating user:', error.message);
      } else {
        alert('User updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Update User By ID</h1>
      <form onSubmit={handleUpdateUser}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">User ID:</label>
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleFetchUser}
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Fetch User
        </button>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Role:</label>
          <input
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Remarks:</label>
          <textarea
            placeholder="Enter Remarks"
            value={remarksColumn}
            onChange={(e) => setRemarksColumn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
