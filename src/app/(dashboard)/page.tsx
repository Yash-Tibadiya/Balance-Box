"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface Session {
  user: {
    name?: string;
    email?: string;
    image?: string | null;
  };
}

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (!data) {
          router.push("/home");
        } else {
          setSession(data);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        router.push("/home");
      } finally {
        setLoading(false);
      }
    };

    getSession();
  }, [router]);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/home");
          },
        },
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center gap-8 rounded-lg bg-white p-8 shadow-lg dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {session?.user?.email}
          </p>
        </div>

        <div className="grid gap-4">
          <p className="text-lg">
            <strong>Name:</strong> {session?.user?.name || "N/A"}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {session?.user?.email || "N/A"}
          </p>
        </div>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="mt-4 flex items-center gap-2"
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
