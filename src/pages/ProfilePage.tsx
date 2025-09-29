import { useState, useEffect } from 'react';
import { User, Settings, LogOut, Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { authService } from '@/services/auth';
import { socialService } from '@/services/social';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(authService.getState().user);
  const [userStats, setUserStats] = useState({ posts: 0, likes: 0 });

  useEffect(() => {
    const unsubscribe = authService.subscribe((state) => {
      setCurrentUser(state.user);
    });

    if (currentUser) {
      const posts = socialService.getPostsByUser(currentUser.id);
      const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
      setUserStats({ posts: posts.length, likes: totalLikes });
    }

    return unsubscribe;
  }, [currentUser]);

  const handleSignOut = async () => {
    await authService.signOut();
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-md p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {currentUser.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground">{currentUser.name}</h2>
                <p className="text-muted-foreground">{currentUser.email}</p>
                {currentUser.bio && (
                  <p className="text-sm text-foreground mt-2">{currentUser.bio}</p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{userStats.posts}</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{userStats.likes}</div>
                  <div className="text-xs text-muted-foreground">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{currentUser.totalCatches}</div>
                  <div className="text-xs text-muted-foreground">Total Catches</div>
                </div>
              </div>

              <Badge variant="secondary" className="flex items-center gap-1">
                <Fish className="h-3 w-3" />
                Favorite: {currentUser.favoriteSpecies}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}