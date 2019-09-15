import { findPalindromes } from './../src/process/findPalindrome';

describe('Palindrome Process', () => {

  it('Should find all palindromes', () => {
    const testString = 'testtest test';
    const palindromeResult = findPalindromes(testString);

    expect(palindromeResult).toEqual(['tt', 't t']);
  });
});
