import { List, Clock, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

export default function ActivityLog({ logs = [] }) {
  const [filter, setFilter] = useState('all');

  // Filter logs berdasarkan waktu
  const filteredLogs = logs.filter(log => {
    if (filter === 'all' || !log.timestamp) return true;
    
    const logDate = new Date(log.timestamp);
    const now = new Date();
    
    // Normalize to midnight for accurate day difference
    const logDay = new Date(logDate.getFullYear(), logDate.getMonth(), logDate.getDate());
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTime = Math.abs(today - logDay);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (filter === 'today') return diffDays === 0;
    if (filter === 'yesterday') return diffDays === 1;
    if (filter === '7days') return diffDays <= 7;
    if (filter === '30days') return diffDays <= 30;
    
    return true;
  });

  // Kelompokkan log berdasarkan tanggal
  const groupedLogs = filteredLogs.reduce((groups, log) => {
    const dateStr = log.timestamp 
      ? new Date(log.timestamp).toLocaleDateString('id-ID', { 
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        }) 
      : 'Hari Ini';
      
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push(log);
    return groups;
  }, {});

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 dark:bg-gray-800/50 gap-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
          <List size={20} className="mr-2 text-indigo-500" />
          Log Aktivitas
        </h2>
        
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none pl-8 pr-8 py-1.5 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 dark:text-gray-200 shadow-sm transition-colors cursor-pointer"
          >
            <option value="all">Semua Waktu</option>
            <option value="today">Hari Ini</option>
            <option value="yesterday">Kemarin</option>
            <option value="7days">7 Hari Terakhir</option>
            <option value="30days">30 Hari Terakhir</option>
          </select>
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <Filter size={14} />
          </div>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-0">
        {filteredLogs.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Tidak ada aktivitas untuk rentang waktu ini.</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {Object.entries(groupedLogs).map(([date, dateLogs]) => (
              <div key={date}>
                <div className="bg-gray-100 dark:bg-gray-700/50 px-4 py-2 flex items-center sticky top-0 z-10">
                  <Calendar size={14} className="text-gray-500 dark:text-gray-400 mr-2" />
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    {date}
                  </span>
                </div>
                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                  {dateLogs.map((log) => (
                    <li key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {log.action}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Oleh: {log.user}
                          </p>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center shrink-0 ml-4">
                          <Clock size={12} className="mr-1" />
                          {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Baru saja'}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
