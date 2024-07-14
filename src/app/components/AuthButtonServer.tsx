import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "./AuthButtonClient";

export default async function AuthButtonServer() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let posts = [];
  if (session) {
    const { data, error } = await supabase.from('post').select('*');
    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      posts = data || [];
    }
  }

  return <AuthButtonClient initialSession={session} initialPosts={posts} />;
}
