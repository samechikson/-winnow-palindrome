import { IPalindrome } from './../src/daos/Palindrome/PalindromeDao';
import supertest, { SuperTest, Test } from 'supertest';
import { OK, CREATED } from 'http-status-codes';
import * as  PalindromeDao from '../src/daos/Palindrome/PalindromeDao';
import { pErr } from '@shared';
import app from '@server';

describe('Palindrome Routes', () => {

  const palindromePath = '/palindrome';
  const getPalindromePath = '/palindrome/:taskId';

  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  describe(`'GET:${getPalindromePath}'`, () => {

    it(`should return a JSON object with a palindrome response and status code of '${OK}' if the
        request was successful.`, (done) => {

      const palindrome: IPalindrome = {
        timestamps: {
          submitted: 1568564742614,
          started: 1568564742629,
          completed: 1568564742649,
        },
        problem: {
          text: 'I am anna',
        },
        solution: {
          largestPalindrome: 'anna',
          largestPalindromeLength: 4,
        },
        _id: '5d7e6606c9697636601efbcb',
        status: 'completed',
      } as any;

      spyOn(PalindromeDao, 'FindPalindromeById').and.returnValue(Promise.resolve(palindrome));

      agent.get(getPalindromePath)
        .end((err: Error, res) => {
          pErr(err);
          expect(res.status).toBe(OK);
          expect(res && res.body).toEqual(palindrome);
          expect(res && res.body.error).toBeUndefined();
          done();
        });
    });
  });

  describe(`'POST:${palindromePath}'`, () => {

    const callApi = (reqBody: object) => {
      return agent.post(palindromePath).set('Accept', 'application/json').send(reqBody);
    };

    it(`should return a JSON object with a palindrome response and status code of '${CREATED}' if the
        request was successful.`, (done) => {

      const palindrome: IPalindrome = {
        timestamps: {
          submitted: 1568564742614,
        },
        problem: {
          text: 'I am anna',
        },
        _id: '5d7e6606c9697636601efbcb',
        taskId: '5d7e6606c9697636601efbcb',
        status: 'submitted',
      } as any;
      palindrome.toJSON = () => '{"timestamps":{"submitted":1568564742614},"problem":{"text":"I am anna"},"_id":"5d7e6606c9697636601efbcb","taskId":"5d7e6606c9697636601efbcb","status":"submitted"}';

      spyOn(PalindromeDao, 'findPalindromeByProblemText').and.returnValue(Promise.resolve(null));
      spyOn(PalindromeDao, 'saveNewPalindromeProblem').and.returnValue(Promise.resolve(palindrome));

      callApi({ text: 'I am anna' })
        .end((err: Error, res) => {
          pErr(err);
          expect(res.status).toBe(CREATED);
          expect(res && res.body).toBeDefined();
          expect(res && res.body.error).toBeUndefined();
          done();
        });
    });
  });
});
