import { TestDataGenerator } from '@app/shared/testing/test-data-generator';

describe('TestDataGenerator', () => {
  describe('quiz', () => {
    it('generates a statistic for the quiz', () => {
      TestDataGenerator.main();
    });
  });
});
