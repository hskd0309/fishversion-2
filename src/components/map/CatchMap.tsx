import { useEffect, useRef, useState } from "react";
import L, { Map as LeafletMap, LayerGroup, DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Eye, Fish, Navigation, Users, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { FishCatch, databaseService } from "@/services/database";
import { sampleIndiaFishCatches } from "@/services/sampleData";

// Available fish images for random markers
const availableFishImages = [
  '/fish/tuna.jpg',
  '/fish/kingfish.jpg',
  '/fish/pomfret.jpg',
  '/fish/mackerel.jpg',
  '/fish/sardine.jpg',
  '/fish/seabass.jpg',
  '/fish/snapper.jpg',
  '/fish/grouper.jpg',
  '/fish/redsnapper.jpg',
  '/fish/seerfish.jpg',
  '/fish/hilsa.jpg',
  '/fish/indiansalmon.jpg'
];

const getRandomFishImage = () => {
  return availableFishImages[Math.floor(Math.random() * availableFishImages.length)];
};

// Fix Leaflet default icon paths in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface CatchMapProps {
  onCatchSelect?: (catch_data: FishCatch) => void;
  className?: string;
}

export const CatchMap = ({ onCatchSelect, className }: CatchMapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const catchesLayerRef = useRef<LayerGroup | null>(null);
  const [sampleFish, setSampleFish] = useState<FishCatch[]>([]);
  const [catches, setCatches] = useState<FishCatch[]>([]);
  const [hoveredCatch, setHoveredCatch] = useState<FishCatch | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "mine" | "community">("all");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    async function loadData() {
      const userCatches = await databaseService.getAllCatches();
      setCatches(userCatches);
      setSampleFish(sampleIndiaFishCatches.slice(0, 31));
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLocationError("");
      },
      () => setLocationError("Location unavailable")
    );
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
      attributionControl: true,
    });
    
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);
    
    mapRef.current = map;
    catchesLayerRef.current = L.layerGroup().addTo(map);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !catchesLayerRef.current) return;
    const group = catchesLayerRef.current;
    group.clearLayers();
    let visible: FishCatch[] = [];
    if (selectedFilter === "all") visible = [...catches, ...sampleFish];
    else if (selectedFilter === "mine") visible = catches;
    else visible = sampleFish;
    
    visible.forEach((c) => {
      if (typeof c.latitude !== "number" || typeof c.longitude !== "number") return;
      
      // Determine image to use: user's original image or random fish image
      const isUserCatch = catches.some(uc => uc.id === c.id);
      const markerImage = isUserCatch ? c.image_data : getRandomFishImage();
      
      // Create custom icon with fish image
      const customIcon = L.divIcon({
        className: 'custom-fish-marker',
        html: `
          <div style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #3b82f6;
            background: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            cursor: pointer;
            transition: all 0.2s;
          " class="fish-marker-icon">
            <img src="${markerImage}" alt="${c.species}" style="
              width: 100%;
              height: 100%;
              object-fit: cover;
            " />
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      
      const marker = L.marker([c.latitude, c.longitude], {
        title: c.species,
        icon: customIcon,
      });
      
      marker.on("mouseover", (e) => {
        setHoveredCatch(c);
        const element = e.target.getElement();
        if (element) {
          const icon = element.querySelector('.fish-marker-icon');
          if (icon) {
            (icon as HTMLElement).style.transform = 'scale(1.3)';
            (icon as HTMLElement).style.borderColor = '#06b6d4';
            (icon as HTMLElement).style.zIndex = '1000';
          }
        }
      });
      
      marker.on("mouseout", (e) => {
        setHoveredCatch(null);
        const element = e.target.getElement();
        if (element) {
          const icon = element.querySelector('.fish-marker-icon');
          if (icon) {
            (icon as HTMLElement).style.transform = 'scale(1)';
            (icon as HTMLElement).style.borderColor = '#3b82f6';
            (icon as HTMLElement).style.zIndex = '1';
          }
        }
      });
      
      marker.on("click", () => onCatchSelect?.(c));
      marker.addTo(group);
    });
  }, [catches, sampleFish, selectedFilter, onCatchSelect]);

  const centerOnUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.setView(userLocation, 13);
    }
  };

  const totalVisible =
    selectedFilter === "all"
      ? catches.length + sampleFish.length
      : selectedFilter === "mine"
      ? catches.length
      : sampleFish.length;

  return (
    <div className={cn("relative h-full", className)}>
  <div ref={containerRef} className="absolute inset-0 h-full rounded-xl overflow-hidden shadow-2xl" />
      {hoveredCatch && (
        <div className="absolute left-1/2 top-4 z-[2000] -translate-x-1/2 bg-white/95 rounded-xl shadow-2xl border border-gray-200 p-4 w-80 max-w-full animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={hoveredCatch.image_data}
              alt="Fish preview"
              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            />
            <div>
              <div className="font-bold text-base text-gray-800">{hoveredCatch.species}</div>
              <div className="text-xs text-gray-500 mb-1">{new Date(hoveredCatch.timestamp).toLocaleString()}</div>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200">🎯 {hoveredCatch.confidence.toFixed(0)}% confident</span>
                {typeof hoveredCatch.health_score === 'number' && (
                  <span className="px-2 py-1 rounded-md bg-green-100 text-green-700 border-green-200">💚 Health: {hoveredCatch.health_score.toFixed(0)}%</span>
                )}
              </div>
            </div>
          </div>
          {hoveredCatch.estimated_weight && (
            <div className="text-xs text-blue-700 font-semibold mb-1">Weight: {hoveredCatch.estimated_weight.toFixed(1)} kg</div>
          )}
          {hoveredCatch.latitude && hoveredCatch.longitude && (
            <div className="text-xs text-gray-500">GPS: {hoveredCatch.latitude.toFixed(4)}, {hoveredCatch.longitude.toFixed(4)}</div>
          )}
        </div>
      )}
      <div className="absolute top-6 right-6 z-[1000] space-y-3">
        <Button
          size="icon"
          onClick={centerOnUserLocation}
          className="bg-white/90 backdrop-blur-md hover:bg-white shadow-xl border border-white/20 text-blue-600 hover:text-blue-700"
          title="Center on my location"
        >
          <Navigation size={18} />
        </Button>
        <Card className="bg-white/90 backdrop-blur-md shadow-xl border-white/20">
          <CardContent className="p-3 space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-600 mb-2">
              <Eye className="w-3 h-3" />
              Map Layers
            </div>
            <div className="flex flex-col gap-1">
              {[
                { key: "all", label: "All Catches", icon: Fish, count: catches.length + sampleFish.length },
                { key: "mine", label: "My Catches", icon: Award, count: catches.length },
                { key: "community", label: "Sample Fish", icon: Users, count: sampleFish.length },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  size="sm"
                  variant={selectedFilter === filter.key ? "default" : "ghost"}
                  onClick={() => setSelectedFilter(filter.key as "all" | "mine" | "community")}
                  className={cn(
                    "justify-between text-xs h-8 w-full",
                    selectedFilter === filter.key
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "hover:bg-blue-50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <filter.icon className="w-3 h-3" />
                    <span>{filter.label}</span>
                  </div>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="absolute bottom-6 left-6 right-6 z-[1000]">
        <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <Fish size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-800">
                    {totalVisible} catches mapped
                  </div>
                  <div className="text-sm text-gray-600">
                    {catches.length > 0 && (
                      <>
                        Avg confidence: {(catches.reduce((sum, c) => sum + c.confidence, 0) / catches.length).toFixed(0)}%
                        {catches.filter(c => !c.is_synced).length > 0 && (
                          <span className="ml-2 text-warning">
                            • {catches.filter(c => !c.is_synced).length} pending sync
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    isOnline 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-warning/10 text-warning border-warning/20"
                  )}
                >
                  {isOnline ? (
                    <><Wifi className="h-3 w-3 mr-1" /> Online</>
                  ) : (
                    <><WifiOff className="h-3 w-3 mr-1" /> Offline</>
                  )}
                </Badge>
                {locationError ? (
                  <Badge variant="outline" className="text-amber-600 border-amber-200 block">
                    📍 {locationError}
                  </Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-700 border-green-200 block">
                    📍 Location active
                  </Badge>
                )}
              </div>
            </div>
            {totalVisible === 0 && (
              <div className="text-sm text-gray-500 mt-2 text-center py-2 border-t">
                🎣 Start fishing and your catches with GPS will appear here!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};