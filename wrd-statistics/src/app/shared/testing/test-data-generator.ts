// tslint:disable
import { Statistic } from '@app/shared/models/statistic.model';
import { QuizRun } from '@app/shared/models/run.model';
import { Category } from '@app/shared/models/category.enum';

export class TestDataGenerator {

  private static NUM_RUNS = 1000;

  static main(): void {
    this.print(this.generate('quiz', TestDataGenerator.NUM_RUNS));
  }

  static generate(game: string, numRuns: number): Statistic {
    let statistic: Statistic = { game: game, runs: [] };

    switch (game) {
      case 'quiz':
        statistic.runs = QuizDataGenerator.generateRuns(numRuns);
        break;
    }

    return statistic;
  }

  static print(statistic: Statistic): void {
    console.log(JSON.stringify(statistic, null, 2));
  }

}

class QuizDataGenerator {

  static generateRuns(numRuns: number): QuizRun[] {
    let runs: QuizRun[] = [];
    let availableCategories = Object.keys(Category).length;
    let categories: string[] = QuizDataGenerator.getRandomCategoriesOnce(
      Math.floor(numRuns / 3) > availableCategories ? availableCategories : Math.floor(numRuns / 3));

    for (let i = 0; i < numRuns; i++) {
      let category = categories[Math.floor(Math.random() * categories.length)];
      let { start, stop } = QuizDataGenerator.getStartStop();
      let correct = QuizDataGenerator.getCorrect(category);
      runs.push({ category: category, start, stop, correct, wrong: 10 - correct });
    }

    return runs;
  }

  static getRandomCategoriesOnce(numCategories: number): string[] {
    const all = Object.keys(Category).map(key => Category[key]);;
    if (numCategories === Object.keys(Category).length) {
      return all;
    }

    return all.sort(() => Math.random() - Math.random()).slice(0, numCategories);
  }

  static getStartStop(): { start: string, stop: string } {
    const max = Date.now();
    const min = max - (1 * 365 * 24 * 60 * 60 * 1000); // 1 year
    // random day from the interval [now - 1 year, now]
    const start = Math.floor(Math.random() * (max - min + 1)) + min;

    const maxTime = (10 * 60 * 1000);
    const minTime = (4 * 60 * 1000);
    // random duration from the interval [10 min, 4 min]
    let duration = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

    duration = QuizDataGenerator.getModifiedDuration(start, duration);

    return { start: new Date(start).toISOString(), stop: new Date(start + duration).toISOString() };
  }

  static getModifiedDuration(date: number, duration: number): number {
    const hour = new Date(date).getUTCHours();

    if (hour > 1 && hour < 6) {
      return duration * 2;
    } else if (hour > 18 && hour < 22) {
      return duration / 2;
    }

    return duration;
  }

  static getCorrect(category: string): number {

    switch (category) {
      case 'Cars':
        return Math.floor(Math.random() * (4 - 2 + 1)) + 2;
      case 'Dogs':
        return Math.floor(Math.random() * (10 - 7 + 1)) + 7;
      case 'Geography':
        return Math.floor(Math.random() * (9 - 6 + 1)) + 6;
      case 'History':
        return Math.floor(Math.random() * (7 - 5 + 1)) + 5;
      case 'IT':
        return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
      case 'Sports':
        return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    }

    return 0;
  }

}
