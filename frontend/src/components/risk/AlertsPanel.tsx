import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { formatDateTime } from '@/utils/formatters';

interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  loading?: boolean;
}

export function AlertsPanel({ alerts, loading }: AlertsPanelProps) {
  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'high':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      case 'medium':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
      case 'low':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  const getSeverityIcon = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5" />;
      case 'low':
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Risk Alerts</h3>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">Loading alerts...</div>
          </div>
        ) : alerts.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">No active alerts</div>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts
              .filter((alert) => !alert.resolved)
              .map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getSeverityStyles(alert.severity)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{getSeverityIcon(alert.severity)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">{alert.message}</p>
                      <p className="text-xs opacity-75 mt-1">{formatDateTime(alert.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
