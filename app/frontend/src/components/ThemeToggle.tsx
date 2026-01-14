import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-[#F5F5F7] dark:hover:bg-[#2C2C2E] transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-[#1D1D1F] dark:text-[#F5F5F7]" />
      ) : (
        <Sun className="h-5 w-5 text-[#F5F5F7]" />
      )}
    </button>
  );
}