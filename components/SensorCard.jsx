import { Thermometer, Droplets, Activity, Zap, Clock } from 'lucide-react';

export default function SensorCard({ sensorData, relayStatus }) {
  const { suhu, kelembaban, gerak, waktu_update } = sensorData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-xl">
          <Thermometer size={28} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Suhu</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{suhu}°C</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-xl">
          <Droplets size={28} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Kelembaban</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{kelembaban}%</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
        <div className={`p-3 rounded-xl ${gerak ? 'bg-orange-100 text-orange-500 dark:bg-orange-900/30' : 'bg-gray-100 text-gray-500 dark:bg-gray-700'}`}>
          <Activity size={28} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Sensor Gerak (PIR)</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {gerak ? 'Terdeteksi' : 'Aman'}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center space-x-4">
        <div className={`p-3 rounded-xl ${relayStatus ? 'bg-green-100 text-green-500 dark:bg-green-900/30' : 'bg-gray-100 text-gray-500 dark:bg-gray-700'}`}>
          <Zap size={28} />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Status Kipas</p>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {relayStatus ? 'Menyala' : 'Mati'}
          </p>
        </div>
      </div>
      
      <div className="col-span-1 md:col-span-2 lg:col-span-4 text-xs text-gray-400 flex justify-end items-center">
        <Clock size={12} className="mr-1" />
        Update Terakhir: {waktu_update}
      </div>
    </div>
  );
}
