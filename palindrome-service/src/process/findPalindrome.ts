function isPalindrome(str: string): boolean {
  const rev = str.split('').reverse().join('');
  return str === rev;
}

export const findPalindromes = (s: string): string[] => {
  const subStrings: string[] = [];

  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < s.length - i; j++) {
      const subString = s.substring(j, j + i + 1);
      if (subString.length > 1 && isPalindrome(subString) && !subStrings.includes(subString)) {
        subStrings.push(subString);
      }
    }
  }
  return subStrings;
};
