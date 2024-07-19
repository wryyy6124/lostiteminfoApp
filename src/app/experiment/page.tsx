import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import AuthButtonClient from "../components/AuthButtonClient";
import { cookies } from "next/headers";
// todo; push直前に消す

export const dynamic = 'force-dynamic'; // ページ全体を動的にする

export default async function Login() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  console.log('Session:', session);
  console.log('Error:', error);

  if (session) {
    redirect("/");
  }

  return (
    <AuthButtonClient initialSession={session} initialPosts={[]} />
  );
}
