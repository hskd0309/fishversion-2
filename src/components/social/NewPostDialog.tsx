import { useState } from 'react';
import { Plus, Upload, X, Fish, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { socialService } from '@/services/social';
import { authService } from '@/services/auth';
import { cn } from '@/lib/utils';

interface NewPostDialogProps {
  trigger?: React.ReactNode;
  onPostCreated?: () => void;
}

export const NewPostDialog = ({ trigger, onPostCreated }: NewPostDialogProps) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [caption, setCaption] = useState('');
  const [species, setSpecies] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fishSpecies = [
    'Pomfret', 'Kingfish', 'Tuna', 'Sardine', 'Mackerel', 'Snapper', 'Grouper',
    'Prawn', 'Sole Fish', 'Anchovy', 'Bombay Duck', 'Indian Salmon', 'Ghol Fish',
    'Ribbon Fish', 'Croaker', 'Black Pomfret', 'Threadfin Bream', 'Mullet',
    'Seer Fish', 'Barracuda', 'Catfish', 'Hilsa', 'Pearl Spot', 'Lobster',
    'Squid', 'Crab', 'Red Snapper', 'Octopus', 'Sea Bass', 'Mahi Mahi', 'Stingray'
  ];

  const indianLocations = [
    'Palolem Beach, Goa', 'Fort Kochi Beach, Kerala', 'Pondicherry Beach', 
    'RK Beach, Visakhapatnam', 'Ganpatipule Beach, Maharashtra', 'Kanyakumari Beach',
    'Panambur Beach, Mangalore', 'Puri Beach, Odisha', 'Karwar Beach, Karnataka',
    'Tuticorin Beach, Tamil Nadu', 'Juhu Beach, Mumbai', 'Diu Beach',
    'Daman Beach', 'Kakinada Beach, Andhra Pradesh', 'Ratnagiri Beach, Maharashtra',
    'Kozhikode Beach, Kerala', 'Malpe Beach, Karnataka', 'Mandvi Beach, Gujarat',
    'Marina Beach, Chennai', 'Baga Beach, Goa', 'Alibaug Beach, Maharashtra',
    'Digha Beach, West Bengal', 'Varkala Beach, Kerala', 'Kovalam Beach, Kerala',
    'Mahabalipuram Beach, Tamil Nadu', 'Calangute Beach, Goa', 'Bekal Beach, Kerala',
    'Anjuna Beach, Goa', 'Shankarpur Beach, West Bengal', 'Marve Beach, Mumbai',
    'Karaikal Beach, Puducherry'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select a file under 10MB',
          variant: 'destructive',
        });
        return;
      }

      const isVideo = file.type.startsWith('video/');
      setFileType(isVideo ? 'video' : 'image');

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const currentUser = authService.getState().user;
    if (!currentUser) {
      toast({
        title: 'Error',
        description: 'You must be logged in to create a post',
        variant: 'destructive',
      });
      return;
    }

    if (!imagePreview || !species) {
      toast({
        title: 'Missing information',
        description: 'Please select an image and species',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the post
      await socialService.createPost({
        userId: currentUser.id,
        user: currentUser,
        species,
        imageData: imagePreview,
        caption: caption || `Caught a beautiful ${species}!`,
        confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-100
        healthScore: Math.floor(Math.random() * 20) + 80, // Random health score between 80-100
        estimatedWeight: parseFloat(weight) || Math.random() * 5 + 1,
        estimatedCount: 1,
        location: location ? {
          name: location,
          latitude: 0,
          longitude: 0
        } : undefined,
        timestamp: new Date().toISOString(),
        isOffline: !navigator.onLine
      });

      toast({
        title: 'Post created!',
        description: 'Your catch has been shared with the community',
      });

      // Reset form
      setImagePreview('');
      setFileType(null);
      setCaption('');
      setSpecies('');
      setWeight('');
      setLocation('');
      setOpen(false);

      // Notify parent component
      onPostCreated?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button 
            size="sm"
            className="bg-gradient-primary hover:opacity-90 text-white shadow-glow"
            data-testid="button-new-post-trigger"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Fish className="h-5 w-5 text-primary" />
            Share Your Catch
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image-upload">Fish Photo *</Label>
            <div
              className={cn(
                "relative border-2 border-dashed rounded-lg transition-colors",
                imagePreview ? "border-primary" : "border-border hover:border-primary"
              )}
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*,video/*"
                className="sr-only"
                onChange={handleImageChange}
                data-testid="input-image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center cursor-pointer p-6"
              >
                {imagePreview ? (
                  <div className="relative w-full">
                    {fileType === 'video' ? (
                      <video
                        src={imagePreview}
                        controls
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setImagePreview('');
                        setFileType(null);
                      }}
                      data-testid="button-remove-image"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground text-center">
                      Click to upload image or video<br />
                      <span className="text-xs">Max file size: 10MB</span>
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Species Selection */}
          <div className="space-y-2">
            <Label htmlFor="species">Fish Species *</Label>
            <Select value={species} onValueChange={setSpecies}>
              <SelectTrigger id="species" data-testid="select-species">
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                {fishSpecies.map((fish) => (
                  <SelectItem key={fish} value={fish}>
                    {fish}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight">Estimated Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="e.g., 2.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              data-testid="input-weight"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              <MapPin className="h-4 w-4 inline mr-1" />
              Location
            </Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location" data-testid="select-location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {indianLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Share your fishing story..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              data-testid="input-caption"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !imagePreview || !species}
            className="w-full bg-gradient-primary hover:opacity-90 text-white"
            data-testid="button-create-post"
          >
            {isSubmitting ? 'Creating...' : 'Share Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
