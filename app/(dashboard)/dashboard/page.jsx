"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useSensor } from '@/hooks/useSensor';
import { Wind, LogOut, Loader2 } from 'lucide-react';

import SensorCard from '@/components/SensorCard';
import ModeControl from '@/components/ModeControl';
import CameraStream from '@/components/CameraStream';
import ActivityLog from '@/components/ActivityLog';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const { sensorData, kipasConfig, kameraUrl, logs, updateKipasConfig } = useSensor(user);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><Loader2 className="animate-spin text-blue-500" size={48} /></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Wind size={24} className="text-blue-500 mr-2" />
              <span className="font-bold text-xl">Kipas Pintar</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-4 hidden md:block">{user.email}</span>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center"
              >
                <LogOut size={20} className="md:mr-2" />
                <span className="hidden md:block text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Dashboard Monitor</h1>
          <p className="text-gray-500 dark:text-gray-400">Pantau dan kendalikan kipas ruangan Anda secara real-time.</p>
        </div>

        <SensorCard sensorData={sensorData} relayStatus={kipasConfig.status_relay} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ModeControl kipasConfig={kipasConfig} updateKipasConfig={updateKipasConfig} />
            <ActivityLog logs={logs} />
          </div>
          <div>
            <CameraStream streamUrl={kameraUrl} />
          </div>
        </div>
      </main>
    </div>
  );
}
