"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
      router.replace("/");
 
  }, [router]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">
        Oops! Page Not Found
      </h2>

      <p className="text-lg mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <p className="text-md text-gray-600">
        Redirecting to the <span className="font-semibold">Companies</span> page...
      </p>

      <div className="mt-6">
        <button
          onClick={() => router.replace("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Go to Companies Now
        </button>
      </div>
    </div>
  );
}
