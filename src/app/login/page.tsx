"use client";

import { useState, useEffect } from "react";

import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";

const Login = (): JSX.Element => {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async (): Promise<void> => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      setSession(session as Session | null);
      console.log("Session:", session);
      console.log("Error:", error);

      if (session) {
        router.push("/");
      }
    };

    fetchSession();
  }, [router, supabase]);

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-10 min-h-screen bg-gray-100 px-10`}
      >
        <h1
          className={`flex flex-wrap flex-col gap-y-5 text-center mx-auto w-fit`}
        >
          <span
            className={`bg-neutral-200 flex items-center justify-center rounded-e-full rounded-l-full text-5xl inline-block place-self-center w-20 h-20`}
          >
            📦
          </span>
          <span className={`block text-3xl font-bold`}>
            <span className={`inline-block`}>おとしもの</span>
            <span className={`inline-block`}>インフォメーション</span>
          </span>
        </h1>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
          className={`w-full max-w-xl mx-auto p-6 bg-gray-600 text-white text-2xl font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg`}
        >
          <span className={`inline-block`}>Googleアカウントで</span>
          <span className={`inline-block`}>サインイン</span>
        </button>
      </div>
    </>
  );
};

export default Login;
