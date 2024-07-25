'use client';

import { useState } from 'react';
import ListUsers from '../../components/ListUsers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './Edit.module.css';

export default function EditPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = (userId: string) => {
    setSelectedUserId(userId);
    router.push(`/admin/edit/${userId}`);
  };

  return (
    <>
      <header className={`w-full`}>
        <div className={`w-full max-w-5xl mx-auto`}>
          <h1
            className={`flex flex-wrap flex-col gap-y-1.5 text-center mx-auto py-5 w-fit`}
          >
            <span
              className={`bg-neutral-100 rounded-e-full rounded-l-full text-3xl inline-block place-self-center p-2`}
            >
              📦
            </span>
            <span className={`block text-sm font-bold`}>
              おとしものインフォメーション
            </span>
          </h1>
        </div>
      </header>
      <ListUsers onEdit={handleEdit} />
      <footer
      className={`w-full bg-neutral-50 fixed bottom-0 ${styles.footer}`}
    >
        <ul className={`w-fit mx-auto flex gap-10 py-2`}>
          <li className={`text-center`}>
            <Link href="/account">
              <span className={`text-3xl inline-block place-self-center p-2`}>
                🚪
              </span>
              <span className={`block text-sm font-bold`}>戻る</span>
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
}