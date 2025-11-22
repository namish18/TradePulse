import { Card, CardContent, CardHeader } from '@/components/ui';
import { formatPercentage } from '@/utils/formatters';

interface VaRData {
  timestamp: string;
  var95: number;
  var99: number;
}

interface VaRChartProps {
  data: VaRData[];
  title?: string;
}

export function VaRChart({ data, title = 'Value at Risk Trend' }: VaRChartProps) {
  const maxVaR = Math.max(...data.map((d) => Math.max(d.var95, d.var99)));

  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-primary-dark rounded-lg">
            <div className="text-center">
              <p className="text-gray-400">No data available</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Simple bar chart representation */}
            <div className="space-y-3">
              {data.slice(-10).map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="relative h-6 bg-gray-700 rounded overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${(item.var95 / maxVaR) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">VaR 95%: {formatPercentage(item.var95)}</p>
                    </div>
                    <div className="flex-1">
                      <div className="relative h-6 bg-gray-700 rounded overflow-hidden">
                        <div
                          className="h-full bg-danger"
                          style={{ width: `${(item.var99 / maxVaR) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">VaR 99%: {formatPercentage(item.var99)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
