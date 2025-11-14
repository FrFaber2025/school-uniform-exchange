import { Link, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, MessageSquare, Package, PlusCircle, Settings, BookOpen, UserPlus, LogIn } from 'lucide-react';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import { useState } from 'react';

export default function Header() {
    const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async (isRegistration = false) => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const NavLinks = ({ mobile = false, onLinkClick = () => {} }) => (
    <>
      <Link
        to="/browse"
        className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        onClick={onLinkClick}
      >
        Browse
      </Link>
      <Link
        to="/seller-tips"
        className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        onClick={onLinkClick}
      >
        <BookOpen className="h-4 w-4" />
        Seller Tips
      </Link>
      {isAuthenticated && (
        <>
          <Link
            to="/create-listing"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={onLinkClick}
          >
            <PlusCircle className="h-4 w-4" />
            Sell
          </Link>
          <Link
            to="/my-listings"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={onLinkClick}
          >
            <Package className="h-4 w-4" />
            My Listings
          </Link>
          <Link
            to="/messages"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            onClick={onLinkClick}
          >
            <MessageSquare className="h-4 w-4" />
            Messages
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              onClick={onLinkClick}
            >
              <Settings className="h-4 w-4" />
              Admin
            </Link>
          )}
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/assets/generated/sue-mascot-new.png" alt="Sue Mascot" className="h-12 w-12 rounded-full object-cover shadow-md" />
            <div className="flex flex-col">
              <span className="text-base font-bold leading-tight text-primary sm:text-lg">School Uniform Exchange (SUE)</span>
              <span className="text-xs font-bold leading-tight text-[oklch(45%_0.12_15)] sm:text-sm">secondhandschooluniforms.co.uk</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated && userProfile && (
            <span className="hidden text-sm text-muted-foreground lg:inline">Hello, {userProfile.name}</span>
          )}
          
          {!isAuthenticated ? (
            <>
              {/* Registration Button - Matching Login button style exactly */}
              <Button 
                onClick={() => handleAuth(true)} 
                disabled={disabled}
                variant="outline"
                size="sm"
                className="font-semibold hover:bg-muted"
              >
                <UserPlus className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">Register as a New User</span>
                <span className="sm:hidden">Register</span>
              </Button>
              
              {/* Login Button */}
              <Button 
                onClick={() => handleAuth(false)} 
                disabled={disabled}
                variant="outline"
                size="sm"
                className="font-semibold hover:bg-muted"
              >
                <LogIn className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">
                  {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
                </span>
                <span className="sm:hidden">
                  {loginStatus === 'logging-in' ? 'Wait...' : 'Login'}
                </span>
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => handleAuth(false)} 
              disabled={disabled} 
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 pt-8">
                <NavLinks mobile onLinkClick={() => setMobileMenuOpen(false)} />
                
                {!isAuthenticated && (
                  <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                    <p className="text-sm font-medium text-muted-foreground">Get Started</p>
                    <Button 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleAuth(true);
                      }} 
                      disabled={disabled}
                      variant="outline"
                      className="w-full font-semibold hover:bg-muted"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register as a New User
                    </Button>
                    <Button 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleAuth(false);
                      }} 
                      disabled={disabled}
                      variant="outline"
                      className="w-full font-semibold hover:bg-muted"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
