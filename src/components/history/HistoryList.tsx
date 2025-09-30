import { useState, useEffect } from "react";
import { Calendar, MapPin, Fish, Filter, Search, Map } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FishCatch, databaseService } from "@/services/database";
import { sampleIndiaFishCatches } from "@/services/sampleData";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";


interface HistoryListProps {
  onCatchSelect?: (catch_data: FishCatch) => void;
  className?: string;
}

const HistoryList: React.FC<HistoryListProps> = ({ onCatchSelect, className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [catchQuality, setCatchQuality] = useState("");
  const [catches, setCatches] = useState<FishCatch[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [showMapPreview, setShowMapPreview] = useState<null | { lat: number; lng: number; label: string }>(null);


  useEffect(() => {
    // Fetch catches from database (user and sample)
    const fetchCatches = async () => {
      const userCatches = await databaseService.getAllCatches();
      const allCatches = [...userCatches, ...sampleIndiaFishCatches];
      setCatches(allCatches);
      
      // Load images for all catches
      const urls: { [key: string]: string } = {};
      
      // Handle user catches
      for (const c of userCatches) {
        if (c.image_data && typeof c.image_data === 'string' && !c.image_data.startsWith('data:image') && !c.image_data.startsWith('/')) {
          // Try to load from IndexedDB
          const blob = await databaseService.getImage(c.image_data);
          if (blob) {
            urls[c.image_data] = URL.createObjectURL(blob);
          }
        } else if (c.image_data && typeof c.image_data === 'string' && (c.image_data.startsWith('data:image') || c.image_data.startsWith('/'))) {
          urls[c.image_data] = c.image_data;
        }
      }
      
      // Handle sample data - they use direct paths
      for (const c of sampleIndiaFishCatches) {
        if (c.image_data && typeof c.image_data === 'string') {
          urls[c.image_data] = c.image_data;
        }
      }
      
      setImageUrls(urls);
    };
    fetchCatches();
  }, []);

  const filteredCatches = catches.filter(c => {
    const matchesSearch = c.species.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <>
      <div className={cn("p-4 w-full", className)}>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by species..."
            className="flex-1"
          />
          <div className="flex gap-2">
            <Button
              variant={catchQuality === 'good' ? 'default' : 'outline'}
              onClick={() => setCatchQuality(prev => prev === 'good' ? '' : 'good')}
            >
              Good Catch
            </Button>
            <Button
              variant={catchQuality === 'ok' ? 'default' : 'outline'}
              onClick={() => setCatchQuality(prev => prev === 'ok' ? '' : 'ok')}
            >
              Ok Catch
            </Button>
            <Button
              variant={catchQuality === 'bad' ? 'default' : 'outline'}
              onClick={() => setCatchQuality(prev => prev === 'bad' ? '' : 'bad')}
            >
              Bad Catch
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {filteredCatches.map(catch_data => (
            <Card 
              key={catch_data.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-2xl hover:border-primary/60 flex flex-col items-center p-0 overflow-hidden rounded-2xl border-2 border-blue-100",
                "active:bg-gray-900 active:border-gray-700",
                !catch_data.is_synced ? "border-warning/50 bg-warning/5" : "bg-white"
              )}
              style={{ minHeight: 480, maxWidth: 500, margin: '0 auto' }}
              onClick={() => onCatchSelect?.(catch_data)}
            >
              <div className="relative w-full" style={{height: 320}}>
                <img
                  src={imageUrls[catch_data.image_data] || '/placeholder.svg'}
                  alt={catch_data.species}
                  className="w-full h-full object-cover object-center rounded-t-2xl"
                  style={{height: '100%', minHeight: 320, maxHeight: 320}}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                  <div className="font-bold text-lg">{catch_data.species}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(catch_data.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <CardContent className="p-4 w-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Fish className="w-4 h-4" />
                    {catch_data.count} caught
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Location saved
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <Badge variant={catch_data.is_synced ? 'outline' : 'secondary'}>
                    {catch_data.is_synced ? 'Synced' : 'Local only'}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={e => { e.stopPropagation(); setShowMapPreview({ lat: catch_data.latitude, lng: catch_data.longitude, label: catch_data.species }); }}>
                    <Map className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* Sneak peek map modal for catch */}
      {showMapPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowMapPreview(null)}
              aria-label="Close preview"
            >
              ×
            </button>
            <div className="mb-2 font-semibold text-center">{showMapPreview.label} Location</div>
            <div className="embed-map-responsive">
              <div className="embed-map-container">
                <iframe
                  className="embed-map-frame"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://maps.google.com/maps?width=600&height=400&hl=en&q=marina%20beach%20with%20rive&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                ></iframe>
                <a href="https://sprunkiretake.net" style={{fontSize:'2px',color:'gray',position:'absolute',bottom:0,left:0,zIndex:1,maxHeight:'1px',overflow:'hidden'}}>sprunki retake</a>
              </div>
              <style>{`.embed-map-responsive{position:relative;text-align:right;width:100%;height:0;padding-bottom:66.66666666666666%;}.embed-map-container{overflow:hidden;background:none!important;width:100%;height:100%;position:absolute;top:0;left:0;}.embed-map-frame{width:100%!important;height:100%!important;position:absolute;top:0;left:0;}`}</style>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-2">Marina Beach with river</div>
          </div>
        </div>
      )}
    </>
  );
};

export default HistoryList;