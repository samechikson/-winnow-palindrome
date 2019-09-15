import { findPalindromes } from './../src/process/findPalindrome';
import supertest from 'supertest';
import { Response, SuperTest, Test } from 'supertest';

let agent: SuperTest<Test>;

describe('Users Routes', () => {

  // beforeAll((done) => {
  //   agent = supertest.agent(app);
  //   done();
  // });

  it('Should find all palindromes', () => {
    const testString = 'testtest test';
    const palindromeResult = findPalindromes(testString);

    expect(palindromeResult).toEqual(['tt', 't t']);
  });
});
