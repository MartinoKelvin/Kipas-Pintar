import { useState, useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, onValue, set, update, push, serverTimestamp, query, limitToLast } from 'firebase/database';

export function useSensor(user) {
  const [sensorData, setSensorData] = useState({
    suhu: 0,
    kelembaban: 0,
    gerak: false,
    mode_aktif: 'manual',
    waktu_update: '-'
  });
  const [kipasConfig, setKipasConfig] = useState({
    mode: 'manual',
    relay: false,
    status_relay: false,
    suhu_min: 25,
    timer: { jam_nyala: 0, menit_nyala: 0, jam_mati: 0, menit_mati: 0 }
  });
  const [kameraUrl, setKameraUrl] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const sensorRef = ref(database, 'sensor');
    const unsubscribeSensor = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setSensorData(snapshot.val());
      }
    });

    const kipasRef = ref(database, 'kipas');
    const unsubscribeKipas = onValue(kipasRef, (snapshot) => {
      if (snapshot.exists()) {
        setKipasConfig(snapshot.val());
      }
    });

    const kameraRef = ref(database, 'kamera/stream_url');
    const unsubscribeKamera = onValue(kameraRef, (snapshot) => {
      if (snapshot.exists()) {
        setKameraUrl(snapshot.val());
      }
    });

    const logsRef = query(ref(database, 'logs'), limitToLast(100));
    const unsubscribeLogs = onValue(logsRef, (snapshot) => {
      if (snapshot.exists()) {
        const logsData = [];
        snapshot.forEach((childSnapshot) => {
          logsData.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        setLogs(logsData.reverse());
      } else {
        setLogs([]);
      }
    });

    return () => {
      unsubscribeSensor();
      unsubscribeKipas();
      unsubscribeKamera();
      unsubscribeLogs();
    };
  }, []);

  const logActivity = async (action) => {
    if (!user) return;
    const logsRef = ref(database, 'logs');
    await push(logsRef, {
      user: user.email || 'Unknown User',
      action,
      timestamp: serverTimestamp()
    });
  };

  const updateKipasConfig = async (updates, logMessage) => {
    const kipasRef = ref(database, 'kipas');
    await update(kipasRef, updates);
    if (logMessage) {
      await logActivity(logMessage);
    }
  };

  return { sensorData, kipasConfig, kameraUrl, logs, updateKipasConfig, logActivity };
}
