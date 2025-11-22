import { Card, CardContent, CardHeader } from '@/components/ui';

interface PriceChartProps {
  symbol: string;
  data?: Array<{ timestamp: string; price: number }>;
}

export function PriceChart({ symbol, data }: PriceChartProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">{symbol} Price Chart</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-64 bg-primary-dark rounded-lg">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Chart integration coming soon</p>
            <p className="text-sm text-gray-500">
              {data?.length ? `${data.length} data points available` : 'No data available'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
