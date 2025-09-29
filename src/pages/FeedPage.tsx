import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Plus, RefreshCw } from 'lucide-react';
import { PostCard } from '@/components/social/PostCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { socialService, SocialPost } from '@/services/social';
import { authService } from '@/services/auth';
import { syncService, SyncStatus } from '@/services/sync';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function FeedPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [currentUser, setCurrentUser] = useState(authService.getState().user);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(syncService.getStatus());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();

    // Listen for auth changes
    const unsubscribeAuth = authService.subscribe((state) => {
      setCurrentUser(state.user);
    });

    // Listen for sync status changes
    const unsubscribeSync = syncService.subscribe((status) => {
      setSyncStatus(status);
      
      // Reload posts when sync completes
      if (!status.isSyncing && status.isOnline) {
        loadPosts();
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSync();
    };
  }, []);

  const loadPosts = () => {
    const feedPosts = socialService.getFeedPosts();
    setPosts(feedPosts);
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) return;

    try {
      const isNowLiked = await socialService.toggleLike(postId, currentUser.id);
      
      // Update posts state immediately for responsive UI
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: isNowLiked ? post.likes + 1 : post.likes - 1,
              likedBy: isNowLiked 
                ? [...post.likedBy, currentUser.id]
                : post.likedBy.filter(id => id !== currentUser.id)
            };
          }
          return post;
        })
      );

      if (!syncStatus.isOnline) {
        toast({
          title: "Liked offline",
          description: "Your like will sync when you're back online",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like post",
        variant: "destructive",
      });
    }
  };

  const handleComment = async (postId: string) => {
    if (!currentUser) return;

    // For demo, add a sample comment
    try {
      const sampleComments = [
        "Amazing catch! 🎣",
        "What a beauty! Where did you catch this?",
        "Great photo quality! The AI analysis looks spot on.",
        "This species is quite rare in our waters!",
        "Perfect timing for this catch! 🌊"
      ];
      
      const randomComment = sampleComments[Math.floor(Math.random() * sampleComments.length)];
      
      await socialService.addComment(postId, currentUser.id, currentUser, randomComment);
      
      // Reload posts to show new comment
      loadPosts();
      
      toast({
        title: "Comment added!",
        description: syncStatus.isOnline ? "Comment posted successfully" : "Comment saved offline",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (navigator.share) {
      navigator.share({
        title: `Check out this ${post.species} catch on FishNet!`,
        text: post.caption,
        url: window.location.href,
      });
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Share this awesome catch with friends.",
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (syncStatus.isOnline) {
        await syncService.forcSync();
      }
      loadPosts();
      toast({
        title: "Feed refreshed",
        description: syncStatus.isOnline ? "Latest posts loaded" : "Showing cached posts",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not refresh feed",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const isPostLiked = (postId: string) => {
    if (!currentUser) return false;
    return socialService.isPostLiked(postId, currentUser.id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FishNet
            </h1>
            <Badge 
              variant={syncStatus.isOnline ? "default" : "secondary"}
              className={cn(
                "text-xs",
                syncStatus.isOnline 
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-warning/10 text-warning border-warning/20"
              )}
            >
              {syncStatus.isOnline ? (
                <><Wifi className="h-3 w-3 mr-1" /> Online</>
              ) : (
                <><WifiOff className="h-3 w-3 mr-1" /> Offline</>
              )}
            </Badge>
            
            {/* Pending sync indicator */}
            {(syncStatus.pendingCatches > 0 || syncStatus.pendingPosts > 0) && (
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                {syncStatus.pendingCatches + syncStatus.pendingPosts} pending
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            </Button>
            
            <Button 
              size="sm"
              className="bg-gradient-primary hover:opacity-90 text-white shadow-glow"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Post
            </Button>
          </div>
        </div>
      </header>

      {/* Sync Status Banner */}
      {syncStatus.isSyncing && (
        <div className="bg-blue-50 border-b border-blue-200 p-3">
          <div className="container mx-auto max-w-md flex items-center justify-center gap-2 text-blue-700">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Syncing your data...</span>
          </div>
        </div>
      )}

      {/* Feed */}
      <div className="container mx-auto max-w-md p-4 space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              isLiked={isPostLiked(post.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">
              Be the first to share your catch with the community!
            </p>
            <Button className="bg-gradient-primary hover:opacity-90 text-white">
              Create Your First Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}