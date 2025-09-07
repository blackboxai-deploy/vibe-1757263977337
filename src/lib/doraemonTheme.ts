export const doraemonColors = {
  primary: '#0066CC',      // Doraemon blue
  secondary: '#FFD700',    // Yellow (bell/accents)
  accent: '#FF6B6B',       // Red (nose/alerts)
  white: '#FFFFFF',        // Doraemon's face
  lightBlue: '#87CEEB',    // Sky blue
  pink: '#FFB6C1',         // Shizuka's color
  orange: '#FF6B35',       // Gian's color
  purple: '#9370DB',       // Gadget purple
  green: '#32CD32',        // Nature green
  gray: '#708090',         // Neutral gray
} as const;

export const doraemonGradients = {
  skyBackground: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #FFFFFF 100%)',
  messageOwn: 'linear-gradient(135deg, #0066CC 0%, #4A90E2 100%)',
  messageOther: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
  gadgetButton: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  header: 'linear-gradient(90deg, #0066CC 0%, #4A90E2 100%)',
} as const;

export const doraemonFonts = {
  primary: "'Comic Neue', 'Nunito', sans-serif",
  secondary: "'Fredoka One', cursive",
  body: "'Nunito', sans-serif",
} as const;

export const doraemonAnimations = {
  bounce: {
    animation: 'bounce 1s infinite',
  },
  fadeIn: {
    animation: 'fadeIn 0.5s ease-in-out',
  },
  slideIn: {
    animation: 'slideInRight 0.3s ease-out',
  },
  pulse: {
    animation: 'pulse 2s infinite',
  },
} as const;

export const doraemonShadows = {
  soft: '0 2px 8px rgba(0, 102, 204, 0.15)',
  medium: '0 4px 16px rgba(0, 102, 204, 0.2)',
  strong: '0 8px 32px rgba(0, 102, 204, 0.3)',
  glow: '0 0 20px rgba(255, 215, 0, 0.5)',
} as const;