'use client';

import React, { useState } from 'react';
import CreateUser from '../components/CreateUser';
import DeleteUser from '../components/DeleteUser';
import ListUsers from '../components/ListUsers';
import UpdateProfile from '../components/UpdateProfile';
//import UpdateUserById from '../components/UpdateUserById';
import Link from 'next/link';

export default function AdminPage() {
  const [view, setView] = useState('listUsers');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleEdit = (userId: string) => {
    setSelectedUserId(userId);
    setView('updateProfile');
  };

  const renderView = () => {
    switch (view) {
      case 'createUser':
        return <CreateUser />;
      case 'deleteUser':
        return <DeleteUser userId={selectedUserId || ''} onDelete={() => setView('listUsers')} />;
      case 'listUsers':
        return <ListUsers onEdit={handleEdit} />;
      case 'updateProfile':
        return selectedUserId ? <UpdateProfile userId={selectedUserId} /> : <ListUsers onEdit={handleEdit} />;
      case 'updateUserById':
       // return <UpdateUserById />;
      default:
        return <ListUsers onEdit={handleEdit} />;
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <nav className="p-4">
        <Link className="text-xl mb-4" href={'/'}>To Home Page</Link>
        <div className="container text-s mx-auto flex justify-around">
          <button
            onClick={() => setView('createUser')}
            className={`text-gray-600 px-4 py-2 rounded ${view === 'createUser' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            Create User
          </button>
          <button
            onClick={() => setView('listUsers')}
            className={`text-gray-600 px-4 py-2 rounded ${view === 'listUsers' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            List Users
          </button>
          {/* <button */}
            {/* onClick={() => setView('updateUserById')} */}
            {/* className={`text-gray-600 px-4 py-2 rounded ${view === 'updateUserById' ? 'bg-gray-200' : 'hover:bg-gray-100'}`} */}
          {/* > */}
            {/* Update User By ID */}
          {/* </button> */}
        </div>
      </nav>
      <div className="container mx-auto p-4">
        {renderView()}
      </div>
    </div>
  );
}
