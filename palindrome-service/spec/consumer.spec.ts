import { newProblemConsumer } from './../src/consumers/newProblemConsumer';
import * as PalindromeDao from '../src/daos';

describe('Consumer process', () => {

  it('should update the database before processing the palindrome', () => {
    // tslint:disable-next-line:max-line-length
    const updateStatusByTaskIdSpy = spyOn(PalindromeDao, 'updateStatusByTaskId').and.returnValue(Promise.resolve());

    const testString = '{ "_id": 1, "problem": { "text": "This is a test"}}';
    newProblemConsumer(testString);

    expect(updateStatusByTaskIdSpy).toHaveBeenCalledTimes(1);
  });

  // it('should update the database after processing the palindrome', () => {
  //   spyOn(PalindromeDao, 'updateStatusByTaskId').and.returnValue(Promise.resolve());
  //   // tslint:disable-next-line:max-line-length'
  //   const updatePalindromeSolutionSpy = spyOn(PalindromeDao, 'updatePalindromeSolution').and.stub();

  //   console.log(updatePalindromeSolutionSpy.calls);
  //   const testString = '{ "_id": 1, "problem": { "text": "This is a test"}}';
  //   newProblemConsumer(testString);

  //   expect(updatePalindromeSolutionSpy).toHaveBeenCalled();
  // });
});
