import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
  }, []);

  if (!promptEvent) return null;

  const promptToInstall = () => {
    promptEvent.prompt();
    setPromptEvent(null);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-lg rounded">
      <p className="mb-2">Install this app for a better experience.</p>
      <button
        className="px-3 py-1 rounded bg-blue-600 text-white"
        onClick={promptToInstall}
      >
        Install
      </button>
    </div>
  );
};

export default InstallPrompt;
