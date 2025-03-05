import { isSpecialOccasion, specialOccasionsConfig } from './specialOccasions';
export type Season = 'winter' | 'spring' | 'summer' | 'fall';

const getSeasonConfig = () => {
  // Check for special occasions first
  const { isSpecial, occasion } = isSpecialOccasion();
  if (isSpecial && occasion !== 'none') {
    return {
      season: occasion,
      config: specialOccasionsConfig[occasion]
    };
  }

  const now = new Date();
  const month = now.getMonth(); // 0-11

  const seasons: Record<Season, {
    symbol: string,
    colors: string[],
    count: number
  }> = {
    winter: {
      symbol: '❄️',
      colors: ['#52CBFF', '#ECECEC', '#FFFFFF'],
      count: 50
    },
    spring: {
      symbol: '🌸',
      colors: ['#e51e25', '#E0E0E0', '#ff99cc'],
      count: 30
    },
    summer: {
      symbol: '🌿',
      colors: ['#90EE90', '#98FB98', '#F9F252'],
      count: 20
    },
    fall: {
      symbol: '🍁',
      colors: ['#634126', '#F5740E', '#8B4513'],
      count: 40
    }
  };

  // Determine season based on month
  if (month >= 11 || month <= 1) return { season: 'winter', config: seasons.winter };
  if (month >= 2 && month <= 4) return { season: 'spring', config: seasons.spring };
  if (month >= 5 && month <= 7) return { season: 'summer', config: seasons.summer };
  return { season: 'fall', config: seasons.fall };
};

export default getSeasonConfig;