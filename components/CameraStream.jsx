import { Camera, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CameraStream({ streamUrl }) {
  const [url, setUrl] = useState(streamUrl || '');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (streamUrl) {
      setUrl(streamUrl);
      setIsError(false);
    }
  }, [streamUrl]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
          <Camera size={20} className="mr-2 text-blue-500" />
          Kamera Live Stream
        </h2>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:text-blue-700 flex items-center">
            Buka Tab Baru <ExternalLink size={12} className="ml-1" />
          </a>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://192.168.x.x:81/stream"
            className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative flex items-center justify-center">
          {url && !isError ? (
            <img 
              src={url} 
              alt="ESP32-CAM Stream" 
              className="w-full h-full object-contain"
              onError={() => setIsError(true)}
            />
          ) : (
            <div className="text-center text-gray-500 flex flex-col items-center">
              <Camera size={48} className="mb-2 opacity-20" />
              <p className="text-sm">
                {isError ? 'Gagal memuat stream. Pastikan Anda berada di jaringan WiFi yang sama dengan ESP32-CAM.' : 'Stream URL belum dikonfigurasi'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
