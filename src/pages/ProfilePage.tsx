import { useState, useEffect } from 'react';
import { User, Settings, LogOut, Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { authService } from '@/services/auth';
import { socialService, type SocialPost } from '@/services/social';
import { PostCard } from '@/components/social/PostCard';
import { SettingsDialog } from '@/components/settings/SettingsDialog';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(authService.getState().user);
  const [userStats, setUserStats] = useState({ posts: 0, likes: 0 });
  const [userPosts, setUserPosts] = useState<SocialPost[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const loadUserData = () => {
    if (currentUser) {
      const posts = socialService.getPostsByUser(currentUser.id);
      const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
      setUserStats({ posts: posts.length, likes: totalLikes });
      setUserPosts(posts);
    }
  };

  useEffect(() => {
    const unsubscribeAuth = authService.subscribe((state) => {
      setCurrentUser(state.user);
    });

    const unsubscribeSocial = socialService.subscribe(() => {
      loadUserData();
    });

    loadUserData();

    return () => {
      unsubscribeAuth();
      unsubscribeSocial();
    };
  }, [currentUser]);

  const handleSignOut = async () => {
    await authService.signOut();
  };

  const handleLike = (postId: string) => {
    if (currentUser) {
      socialService.toggleLike(postId, currentUser.id);
    }
  };

  const handleComment = async (postId: string) => {
    if (!currentUser) return;

    // For demo, add a sample comment
    try {
      const sampleComments = [
        "Great catch!",
        "That's a beautiful fish!",
        "Where did you catch this?",
        "Amazing size!",
      ];
      
      const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
      await socialService.addComment(postId, currentUser.id, currentUser, randomComment);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleShare = (postId: string) => {
    const post = userPosts.find(p => p.id === postId);
    if (!post) return;

    if (navigator.share) {
      navigator.share({
        title: `Check out this ${post.species}!`,
        text: post.caption,
        url: window.location.href,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard!');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-sky-400">
              Fish Net
            </h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" />
              Profile
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSettingsOpen(true)}>
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
          <Button variant="outline" className="w-full justify-start" data-testid="button-edit-profile">
            <User className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleSignOut}
            data-testid="button-sign-out"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* User Posts Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {userPosts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground" data-testid="text-no-posts">
                <Fish className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No posts yet</p>
                <p className="text-sm">Share your first catch!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                    isLiked={post.likedBy?.includes(currentUser.id) || false}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}