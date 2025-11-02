import { useState } from 'react';
import { Auth } from './components/Auth';
import { Navbar } from './components/Navbar';
import { NotesGrid } from './components/NotesGrid';
import { AlertModal, ConfirmModal } from './components/Modals.tsx';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
  
  const [alertInfo, setAlertInfo] = useState<{ title: string, message: string } | null>(null);
  const [confirmInfo, setConfirmInfo] = useState<{ title: string, message: string, onConfirm: () => void } | null>(null);

  const handleAuthSuccess = (newToken: string, newUsername: string) => {
    setToken(newToken);
    setUsername(newUsername);
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername);
  };

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  if (!token || !username) {
    return (
      <>
        <Auth onSuccess={handleAuthSuccess} setAlertInfo={setAlertInfo} />

        {alertInfo && (
          <AlertModal
            title={alertInfo.title}
            message={alertInfo.message}
            onClose={() => setAlertInfo(null)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#D5DEEF] text-[#395886]">
        <Navbar username={username} onLogout={handleLogout} />
        <NotesGrid
          token={token}
          setAlertInfo={setAlertInfo}
          setConfirmInfo={setConfirmInfo}
        />
      </div>

      {alertInfo && (
        <AlertModal
          title={alertInfo.title}
          message={alertInfo.message}
          onClose={() => setAlertInfo(null)}
        />
      )}
      {confirmInfo && (
        <ConfirmModal
          title={confirmInfo.title}
          message={confirmInfo.message}
          onConfirm={() => {
            if (confirmInfo.onConfirm) {
              confirmInfo.onConfirm();
            }
            setConfirmInfo(null);
          }}
          onCancel={() => setConfirmInfo(null)}
        />
      )}
    </>
  );
}

export default App;

