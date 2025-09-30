
import { useEffect, useMemo, useState } from 'react';
import { History, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HistoryList from '@/components/history/HistoryList';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AnalysisResults } from '@/components/analyze/AnalysisResults';
import { FishCatch, databaseService } from '@/services/database';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function HistoryPage() {
  const [selected, setSelected] = useState<FishCatch | null>(null);
  const [speciesHistory, setSpeciesHistory] = useState<FishCatch[]>([]);

  useEffect(() => {
    const load = async () => {
      if (selected) {
        const list = await databaseService.getCatchesBySpecies(selected.species);
        setSpeciesHistory(list.slice(0, 12));
      } else {
        setSpeciesHistory([]);
      }
    };
    load();
  }, [selected]);

  const chartData = useMemo(() => {
    return speciesHistory
      .slice()
      .reverse()
      .map((c, idx) => ({
        label: new Date(c.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        Confidence: Math.round(c.confidence),
        Health: Math.round(c.health_score),
      }));
  }, [speciesHistory]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Fish Net
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <History className="h-3 w-3" />
              My Catches
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl p-4">
        <HistoryList onCatchSelect={setSelected} />
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          {selected && (
            <div className="space-y-6 p-4 overflow-y-auto max-h-[80vh] bg-gradient-to-br from-blue-50/80 to-white rounded-2xl shadow-xl border border-blue-100">
              <DialogHeader>
                <DialogTitle>
                  <span className="inline-flex items-center gap-2 text-2xl font-bold text-blue-900">
                    <span className="inline-block w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-2">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2M9 17a4 4 0 01-4-4V7a4 4 0 014-4h6a4 4 0 014 4v6a4 4 0 01-4 4M9 17h6" /></svg>
                    </span>
                    {selected.species}
                  </span>
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-full md:w-1/2 flex flex-col items-center gap-2">
                  <img src={selected.image_data} alt={selected.species} className="rounded-xl shadow-md w-full max-w-xs object-cover border border-blue-100" />
                  <div className="flex gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">{selected.confidence.toFixed(0)}% Confidence</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">{selected.health_score.toFixed(0)}% Health</span>
                  </div>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium mt-1">{selected.estimated_weight.toFixed(1)} kg</span>
                </div>
                <div className="w-full md:w-1/2">
                  <AnalysisResults
                    result={{
                      species: selected.species,
                      confidence: selected.confidence,
                      healthScore: selected.health_score,
                      estimatedWeight: selected.estimated_weight,
                      estimatedCount: 1,
                    }}
                    imageData={selected.image_data}
                    location={{ latitude: selected.latitude, longitude: selected.longitude }}
                    onSave={() => Promise.resolve()}
                    onRetake={() => setSelected(null)}
                  />
                </div>
              </div>

              {/* Trends */}
              {chartData.length > 1 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Recent {selected.species} trends</h3>
                  <ChartContainer
                    config={{
                      Confidence: { label: 'Confidence', color: 'hsl(var(--primary))' },
                      Health: { label: 'Health', color: 'hsl(var(--success))' },
                    }}
                    className="h-48"
                  >
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="Confidence" stroke="var(--color-Confidence)" fill="var(--color-Confidence)" fillOpacity={0.15} />
                      <Area type="monotone" dataKey="Health" stroke="var(--color-Health)" fill="var(--color-Health)" fillOpacity={0.15} />
                    </AreaChart>
                  </ChartContainer>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}