import React, { useEffect, useRef } from 'react';
import { GameLog } from '../types/game';

interface LogPanelProps {
  logs: GameLog[];
}

export const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="log-panel">
      <div className="log-header">
        <h3>ゲームログ</h3>
      </div>
      
      <div className="log-content">
        {logs.length === 0 ? (
          <div className="no-logs">ログがありません</div>
        ) : (
          logs.slice(0, 50).map(log => (
            <div key={log.id} className={`log-item log-${log.type}`}>
              <span className="log-time">{formatTime(log.timestamp)}</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
};