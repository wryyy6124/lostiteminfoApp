'use client';

import { useParams } from 'next/navigation';
import PostDetail from '../../components/PostDetail';

export default function PostPage() {
  const params = useParams();
  let { id } = params;

  // Ensure id is a string
  if (Array.isArray(id)) {
    id = id[0];
  }

  return (
    <div>
      {id && <PostDetail postId={id} />}
    </div>
  );
}
