// components/ShareButton.jsx
import React from "react";

export default function ShareButton({ title, text, url }) {
  const handleShare = async () => {
    const shareData = { title, text, url };
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch {
        alert("Sharing not supported on this device.");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-green-500 text-white rounded-full shadow hover:from-indigo-600 hover:to-green-600 transition"
      title="Share organization"
      type="button"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0zM19.5 12.5a3 3 0 11-6 0 3 3 0 016 0zM8.5 16.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path d="M12 8v4m0 0l3.5 3.5m-3.5-3.5L8.5 16.5" />
      </svg>
      Share
    </button>
  );
}
