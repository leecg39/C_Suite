import { FC } from 'react';

interface AgentAvatarProps {
  agentId: 'cfo' | 'cto' | 'cmo' | 'coo' | 'chro';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AgentAvatar: FC<AgentAvatarProps> = ({ agentId, size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const avatars = {
    cfo: (
      <svg viewBox="0 0 64 64" className={`${sizeMap[size]} ${className}`}>
        {/* CFO - 안경 쓴 전문가 */}
        <defs>
          <linearGradient id="cfo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* 얼굴 */}
        <circle cx="32" cy="28" r="16" fill="url(#cfo-gradient)" />
        {/* 몸 */}
        <path d="M 16 44 Q 16 38 20 36 L 44 36 Q 48 38 48 44 L 48 64 L 16 64 Z" fill="url(#cfo-gradient)" />
        {/* 안경 */}
        <circle cx="26" cy="26" r="4" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="38" cy="26" r="4" fill="none" stroke="white" strokeWidth="2" />
        <line x1="30" y1="26" x2="34" y2="26" stroke="white" strokeWidth="2" />
        {/* 눈 */}
        <circle cx="26" cy="26" r="1.5" fill="white" />
        <circle cx="38" cy="26" r="1.5" fill="white" />
        {/* 미소 */}
        <path d="M 24 32 Q 32 36 40 32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* 넥타이 */}
        <path d="M 32 36 L 30 44 L 32 52 L 34 44 Z" fill="#047857" />
      </svg>
    ),
    cto: (
      <svg viewBox="0 0 64 64" className={`${sizeMap[size]} ${className}`}>
        {/* CTO - 노트북 든 개발자 */}
        <defs>
          <linearGradient id="cto-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        {/* 얼굴 */}
        <circle cx="32" cy="26" r="14" fill="url(#cto-gradient)" />
        {/* 몸 */}
        <path d="M 18 40 Q 18 36 22 34 L 42 34 Q 46 36 46 40 L 46 64 L 18 64 Z" fill="url(#cto-gradient)" />
        {/* 헤드폰 */}
        <path d="M 20 22 Q 20 14 32 14 Q 44 14 44 22" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="18" y="22" width="4" height="6" rx="2" fill="white" />
        <rect x="42" y="22" width="4" height="6" rx="2" fill="white" />
        {/* 눈 */}
        <circle cx="27" cy="25" r="2" fill="white" />
        <circle cx="37" cy="25" r="2" fill="white" />
        {/* 미소 */}
        <path d="M 26 31 Q 32 34 38 31" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* 노트북 */}
        <rect x="22" y="44" width="20" height="12" rx="1" fill="#3730A3" />
        <rect x="23" y="45" width="18" height="8" fill="#6366F1" />
        <line x1="24" y1="47" x2="40" y2="47" stroke="white" strokeWidth="0.5" />
        <line x1="24" y1="49" x2="36" y2="49" stroke="white" strokeWidth="0.5" />
      </svg>
    ),
    cmo: (
      <svg viewBox="0 0 64 64" className={`${sizeMap[size]} ${className}`}>
        {/* CMO - 확성기 든 마케터 */}
        <defs>
          <linearGradient id="cmo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
        {/* 얼굴 */}
        <circle cx="32" cy="28" r="15" fill="url(#cmo-gradient)" />
        {/* 몸 */}
        <path d="M 17 43 Q 17 38 21 36 L 43 36 Q 47 38 47 43 L 47 64 L 17 64 Z" fill="url(#cmo-gradient)" />
        {/* 머리카락 */}
        <path d="M 20 18 Q 24 14 32 14 Q 40 14 44 18 L 44 24 Q 40 20 32 20 Q 24 20 20 24 Z" fill="#C2410C" />
        {/* 눈 */}
        <circle cx="27" cy="27" r="2" fill="white" />
        <circle cx="37" cy="27" r="2" fill="white" />
        {/* 미소 */}
        <path d="M 25 33 Q 32 37 39 33" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* 확성기 */}
        <path d="M 42 42 L 48 40 L 52 44 L 48 48 L 42 46 Z" fill="#DC2626" />
        <circle cx="44" cy="44" r="2" fill="white" />
        <path d="M 48 40 L 54 36" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        <path d="M 52 44 L 58 44" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        <path d="M 48 48 L 54 52" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    coo: (
      <svg viewBox="0 0 64 64" className={`${sizeMap[size]} ${className}`}>
        {/* COO - 체크리스트 든 관리자 */}
        <defs>
          <linearGradient id="coo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
        {/* 얼굴 */}
        <circle cx="32" cy="27" r="14" fill="url(#coo-gradient)" />
        {/* 몸 */}
        <path d="M 18 41 Q 18 37 22 35 L 42 35 Q 46 37 46 41 L 46 64 L 18 64 Z" fill="url(#coo-gradient)" />
        {/* 안경 */}
        <rect x="23" y="24" width="8" height="6" rx="1" fill="none" stroke="white" strokeWidth="2" />
        <rect x="33" y="24" width="8" height="6" rx="1" fill="none" stroke="white" strokeWidth="2" />
        <line x1="31" y1="27" x2="33" y2="27" stroke="white" strokeWidth="2" />
        {/* 눈 */}
        <circle cx="27" cy="27" r="1.5" fill="white" />
        <circle cx="37" cy="27" r="1.5" fill="white" />
        {/* 미소 */}
        <path d="M 26 32 Q 32 35 38 32" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* 체크리스트 */}
        <rect x="40" y="42" width="16" height="18" rx="1" fill="white" />
        <line x1="43" y1="46" x2="53" y2="46" stroke="#7C3AED" strokeWidth="1" />
        <line x1="43" y1="50" x2="53" y2="50" stroke="#7C3AED" strokeWidth="1" />
        <line x1="43" y1="54" x2="53" y2="54" stroke="#7C3AED" strokeWidth="1" />
        <path d="M 43 46 L 44 47 L 46 45" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 43 50 L 44 51 L 46 49" fill="none" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chro: (
      <svg viewBox="0 0 64 64" className={`${sizeMap[size]} ${className}`}>
        {/* CHRO - 하트 든 HR 담당자 */}
        <defs>
          <linearGradient id="chro-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        {/* 얼굴 */}
        <circle cx="32" cy="28" r="15" fill="url(#chro-gradient)" />
        {/* 몸 */}
        <path d="M 17 43 Q 17 38 21 36 L 43 36 Q 47 38 47 43 L 47 64 L 17 64 Z" fill="url(#chro-gradient)" />
        {/* 머리카락 (긴 머리) */}
        <path d="M 18 22 Q 18 16 24 14 Q 28 13 32 13 Q 36 13 40 14 Q 46 16 46 22 L 46 30 Q 44 26 40 24 Q 36 22 32 22 Q 28 22 24 24 Q 20 26 18 30 Z" fill="#BE185D" />
        {/* 눈 */}
        <circle cx="27" cy="27" r="2" fill="white" />
        <circle cx="37" cy="27" r="2" fill="white" />
        {/* 속눈썹 */}
        <path d="M 25 25 L 24 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 27 24 L 27 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 35 24 L 35 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 39 25 L 40 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        {/* 미소 */}
        <path d="M 25 33 Q 32 37 39 33" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* 하트 */}
        <path d="M 48 46 Q 48 42 51 42 Q 54 42 54 46 Q 54 50 48 54 Q 42 50 42 46 Q 42 42 45 42 Q 48 42 48 46 Z" fill="#DC2626" />
        <path d="M 48 46 Q 48 42 51 42 Q 54 42 54 46 Q 54 50 48 54 Q 42 50 42 46 Q 42 42 45 42 Q 48 42 48 46 Z" fill="none" stroke="white" strokeWidth="1" />
      </svg>
    )
  };

  return avatars[agentId];
};