import { Power, Settings, Clock, Settings2 } from 'lucide-react';
import { useState } from 'react';

export default function ModeControl({ kipasConfig, updateKipasConfig }) {
  const { mode, relay, suhu_min, timer } = kipasConfig;
  const [localSuhuMin, setLocalSuhuMin] = useState(suhu_min);

  const handleModeChange = (newMode) => {
    updateKipasConfig({ mode: newMode }, `Mengubah mode operasi menjadi ${newMode.toUpperCase()}`);
  };

  const handleManualToggle = () => {
    if (mode === 'manual') {
      const newStatus = !relay;
      updateKipasConfig({ relay: newStatus }, `Mematikan/Menyalakan kipas secara manual: ${newStatus ? 'ON' : 'OFF'}`);
    }
  };

  const handleSuhuMinChange = () => {
    const val = parseFloat(localSuhuMin);
    updateKipasConfig({ suhu_min: val }, `Mengubah batas suhu minimum menjadi ${val}°C`);
  };

  const handleTimerChange = (field, value) => {
    const val = parseInt(value) || 0;
    updateKipasConfig({ [`timer/${field}`]: val }, `Mengubah pengaturan timer (${field.replace('_', ' ')}) menjadi ${val}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <Settings2 size={20} className="mr-2" />
        Kontrol Kipas
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Pilih Mode Operasi
        </label>
        <div className="relative">
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors"
          >
            <option value="manual">Mode Manual</option>
            <option value="auto">Mode Auto</option>
            <option value="timer">Mode Timer</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="min-h-[120px]">
        {mode === 'manual' && (
          <div className="flex flex-col items-center justify-center py-4">
            <button
              onClick={handleManualToggle}
              className={`p-6 rounded-full transition-all duration-300 ${
                relay 
                  ? 'bg-green-100 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                  : 'bg-red-100 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
              }`}
            >
              <Power size={48} />
            </button>
            <p className="mt-4 font-medium text-gray-600 dark:text-gray-300">
              Kipas {relay ? 'Menyala' : 'Mati'}
            </p>
          </div>
        )}

        {mode === 'auto' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-300">
              Mode Auto aktif. Kipas akan menyala jika PIR mendeteksi orang <strong>dan</strong> suhu ruangan di atas batas minimum.
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Batas Suhu Minimum (°C)
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={localSuhuMin}
                  onChange={(e) => setLocalSuhuMin(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button 
                  onClick={handleSuhuMinChange}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {mode === 'timer' && (
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-sm text-purple-800 dark:text-purple-300">
              Mode Timer aktif. Kipas akan menyala dan mati sesuai jadwal yang ditentukan.
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Clock size={16} className="mr-1 text-green-500" /> Waktu Nyala
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number" min="0" max="23"
                    value={timer?.jam_nyala || 0}
                    onChange={(e) => handleTimerChange('jam_nyala', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="HH"
                  />
                  <span className="self-center">:</span>
                  <input
                    type="number" min="0" max="59"
                    value={timer?.menit_nyala || 0}
                    onChange={(e) => handleTimerChange('menit_nyala', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="MM"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Clock size={16} className="mr-1 text-red-500" /> Waktu Mati
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number" min="0" max="23"
                    value={timer?.jam_mati || 0}
                    onChange={(e) => handleTimerChange('jam_mati', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="HH"
                  />
                  <span className="self-center">:</span>
                  <input
                    type="number" min="0" max="59"
                    value={timer?.menit_mati || 0}
                    onChange={(e) => handleTimerChange('menit_mati', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="MM"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
