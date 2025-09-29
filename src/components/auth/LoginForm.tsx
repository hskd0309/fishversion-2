import { useState } from 'react';
import { Eye, EyeOff, Fish, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await authService.signIn(formData.email, formData.password);
      } else {
        result = await authService.signUp(formData.email, formData.password, formData.name);
      }

      if (result.success) {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin ? "You've successfully signed in." : "Welcome to Fish Net community!",
        });
      } else {
        toast({
          title: "Authentication failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/80 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,transparent_50%)] opacity-10" />
      
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-md border border-border/50 shadow-float">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-primary rounded-2xl shadow-glow">
              <Fish className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Fish Net
            </h1>
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Join Fish Net'}
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              {isLogin 
                ? 'Sign in to continue your fishing journey' 
                : 'Connect with anglers worldwide'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange('password')}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full bg-gradient-primary hover:opacity-90 transition-all duration-200",
                "text-white font-semibold py-6 shadow-glow",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>

            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:text-primary/80 font-semibold p-0 h-auto mt-1"
              >
                {isLogin ? 'Sign up here' : 'Sign in instead'}
              </Button>
            </div>
          </form>

        </CardContent>
      </Card>
    </div>
  );
};
