import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X, CircleDot, LayoutDashboard, DollarSign, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';

const Header = () => {
  const [activePage, setActivePage] = useState('features');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default to light mode

  useEffect(() => {
    // Apply the theme to the document when it changes
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const handleNavClick = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePage(page);
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="sticky top-0 z-50 pt-8 px-4">
      <header className="w-full max-w-7xl mx-auto py-3 px-6 md:px-8 flex items-center justify-between">
        <div className="p-3">
          <Logo />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          {/* Theme toggle for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 p-0"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="h-8 w-8 p-0"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ToggleGroup
            type="single"
            value={activePage}
            onValueChange={(value) => value && setActivePage(value)}
            className="gap-1"
          >
            <ToggleGroupItem
              value="features"
              variant="outline"
              onClick={handleNavClick('features')}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                activePage === 'features'
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <CircleDot className="h-4 w-4 mr-2" />
              Features
            </ToggleGroupItem>
            
            <ToggleGroupItem
              value="testimonials"
              variant="outline"
              onClick={handleNavClick('testimonials')}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                activePage === 'testimonials'
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Testimonials
            </ToggleGroupItem>
            
            <ToggleGroupItem
              value="pricing"
              variant="outline"
              onClick={handleNavClick('pricing')}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                activePage === 'pricing'
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Pricing
            </ToggleGroupItem>
          </ToggleGroup>
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle */}
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="scale-75"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <Button variant="outline" size="sm">
            Log in
          </Button>
          <Button size="sm">
            Get started
          </Button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg mt-2 p-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-2 mb-4">
              <Button
                variant={activePage === 'features' ? 'default' : 'ghost'}
                onClick={handleNavClick('features')}
                className="justify-start"
              >
                <CircleDot className="h-4 w-4 mr-2" />
                Features
              </Button>
              <Button
                variant={activePage === 'testimonials' ? 'default' : 'ghost'}
                onClick={handleNavClick('testimonials')}
                className="justify-start"
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Testimonials
              </Button>
              <Button
                variant={activePage === 'pricing' ? 'default' : 'ghost'}
                onClick={handleNavClick('pricing')}
                className="justify-start"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Pricing
              </Button>
            </nav>
            
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm">
                Log in
              </Button>
              <Button size="sm">
                Get started
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;