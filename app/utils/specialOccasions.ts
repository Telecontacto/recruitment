export type SpecialOccasion = 
  | 'valentine'
  | 'christmas'
  | 'thanksgiving'
  | 'halloween'
  | 'independenceDay'
  | 'laborDay'
  | 'mothersDay'
  | 'fathersDay'
  | 'none';

export const specialOccasionsConfig: Record<Exclude<SpecialOccasion, 'none'>, {
  symbol: string,
  colors: string[],
  count: number
}> = {
  valentine: {
    symbol: '❤️',
    colors: ['#FF69B4', '#FF1493', '#FF0000'],
    count: 30
  },
  christmas: {
    symbol: '🎄',
    colors: ['#FF0000', '#008000', '#FFD700'],
    count: 40
  },
  thanksgiving: {
    symbol: '🦃',
    colors: ['#8B4513', '#DEB887', '#D2691E'],
    count: 20
  },
  halloween: {
    symbol: '🎃',
    colors: ['#FFA500', '#000000', '#800080'],
    count: 25
  },
  independenceDay: {
    symbol: '⭐',
    colors: ['#FF0000', '#FFFFFF', '#0000FF'],
    count: 35
  },
  laborDay: {
    symbol: '👷',
    colors: ['#4682B4', '#B8860B', '#CD853F'],
    count: 15
  },
  mothersDay: {
    symbol: '🌺',
    colors: ['#FF69B4', '#FFB6C1', '#FFC0CB'],
    count: 30
  },
  fathersDay: {
    symbol: '👔',
    colors: ['#000080', '#4169E1', '#1E90FF'],
    count: 30
  }
};

function isWithinDays(targetDate: Date, days: number): boolean {
  const currentDate = new Date();
  const diffTime = targetDate.getTime() - currentDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
}

export function isSpecialOccasion(): { isSpecial: boolean; occasion: SpecialOccasion } {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Valentine's Day (Feb 14) - 7 days before
  const valentinesDay = new Date(currentYear, 1, 14);
  if (isWithinDays(valentinesDay, 7))
    return { isSpecial: true, occasion: 'valentine' };

  // Christmas (Dec 25) - 7 days before
  const christmas = new Date(currentYear, 11, 25);
  if (isWithinDays(christmas, 7))
    return { isSpecial: true, occasion: 'christmas' };

  // Thanksgiving (4th Thursday of November) - 7 days before
  const thanksgiving = new Date(currentYear, 10, 1);
  thanksgiving.setDate(thanksgiving.getDate() + (4 - thanksgiving.getDay()) + 21);
  if (isWithinDays(thanksgiving, 7))
    return { isSpecial: true, occasion: 'thanksgiving' };

  // Halloween (Oct 31) - 7 days before
  const halloween = new Date(currentYear, 9, 31);
  if (isWithinDays(halloween, 7))
    return { isSpecial: true, occasion: 'halloween' };

  // Independence Day (July 4) - 7 days before
  const independenceDay = new Date(currentYear, 6, 4);
  if (isWithinDays(independenceDay, 7))
    return { isSpecial: true, occasion: 'independenceDay' };

  // Labor Day (1st Monday in September) - 7 days before
  const laborDay = new Date(currentYear, 8, 1);
  laborDay.setDate(laborDay.getDate() + (1 - laborDay.getDay() + 7) % 7);
  if (isWithinDays(laborDay, 7))
    return { isSpecial: true, occasion: 'laborDay' };

  // Mother's Day (2nd Sunday in May) - 7 days before
  const mothersDay = new Date(currentYear, 4, 1);
  mothersDay.setDate(mothersDay.getDate() + (14 - mothersDay.getDay()));
  if (isWithinDays(mothersDay, 7))
    return { isSpecial: true, occasion: 'mothersDay' };

  // Father's Day (3rd Sunday in June) - 7 days before
  const fathersDay = new Date(currentYear, 5, 1);
  fathersDay.setDate(fathersDay.getDate() + (21 - fathersDay.getDay()));
  if (isWithinDays(fathersDay, 7))
    return { isSpecial: true, occasion: 'fathersDay' };

  return { isSpecial: false, occasion: 'none' };
}
