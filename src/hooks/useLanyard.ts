'use client';

import { useState, useEffect } from 'react';

export interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    global_name: string | null;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: any[];
}

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    if (!userId) return;

    let ws: WebSocket;
    let heartbeatInterval: NodeJS.Timeout;

    function connect() {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.onmessage = (event) => {
        const { op, d, t } = JSON.parse(event.data);

        if (op === 1) {
          ws.send(
            JSON.stringify({
              op: 2,
              d: { subscribe_to_id: userId },
            })
          );

          heartbeatInterval = setInterval(() => {
            ws.send(JSON.stringify({ op: 3 }));
          }, d.heartbeat_interval);
        }

        if (op === 0 && (t === 'INIT_STATE' || t === 'PRESENCE_UPDATE')) {
          setData(d);
        }
      };

      ws.onclose = () => {
        clearInterval(heartbeatInterval);
        setTimeout(connect, 5000);
      };
    }

    connect();

    return () => {
      if (ws) ws.close();
      if (heartbeatInterval) clearInterval(heartbeatInterval);
    };
  }, [userId]);

  return data;
}
