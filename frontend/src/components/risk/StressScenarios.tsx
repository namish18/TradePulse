import { Card, CardContent, CardHeader } from '@/components/ui';
import { formatPercentage } from '@/utils/formatters';

interface Scenario {
  id: string;
  name: string;
  description: string;
  marketShock: number;
  volatilityShock: number;
  portfolioDelta: number;
}

interface StressScenariosProps {
  scenarios: Scenario[];
}

export function StressScenarios({ scenarios }: StressScenariosProps) {
  return (
    <Card variant="glass">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">Stress Test Scenarios</h3>
      </CardHeader>
      <CardContent>
        {scenarios.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">No stress scenarios available</div>
          </div>
        ) : (
          <div className="space-y-4">
            {scenarios.map((scenario) => {
              const isNegative = scenario.portfolioDelta < 0;
              return (
                <div key={scenario.id} className="p-4 bg-primary-dark rounded-lg border border-white/5">
                  <div className="mb-2">
                    <h4 className="text-white font-semibold">{scenario.name}</h4>
                    <p className="text-sm text-gray-400">{scenario.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Market Shock</p>
                      <p className="text-sm font-semibold text-white">
                        {formatPercentage(scenario.marketShock)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Vol Shock</p>
                      <p className="text-sm font-semibold text-white">
                        {formatPercentage(scenario.volatilityShock)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Portfolio Impact</p>
                      <p className={`text-sm font-semibold ${isNegative ? 'text-red-400' : 'text-green-400'}`}>
                        {formatPercentage(scenario.portfolioDelta)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
