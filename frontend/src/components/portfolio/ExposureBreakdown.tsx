import { Card, CardContent, CardHeader } from '@/components/ui';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

interface ExposureItem {
  asset: string;
  value: number;
  percentage: number;
}

interface ExposureBreakdownProps {
  exposures: ExposureItem[];
  title?: string;
}

export function ExposureBreakdown({ exposures, title = 'Asset Exposure' }: ExposureBreakdownProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {exposures.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No exposure data available</p>
          ) : (
            exposures.map((exposure) => (
              <div key={exposure.asset} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{exposure.asset}</span>
                  <div className="text-right">
                    <p className="text-white font-semibold">{formatCurrency(exposure.value)}</p>
                    <p className="text-gray-400 text-sm">{formatPercentage(exposure.percentage)}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-light to-danger h-2 rounded-full transition-all"
                    style={{ width: `${exposure.percentage}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
