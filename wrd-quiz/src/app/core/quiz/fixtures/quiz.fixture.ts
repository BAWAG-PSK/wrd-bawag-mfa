import { Quiz } from '@app/shared/models/quiz.model';
import { Question } from '@app/shared/models/question.model';

export default () => {
  return {
    category: 'IT',
    questions: ([
      {
        id: '1',
        question: 'What is the name of the network of computers from which the Internet has emerged?',
        answers: [
          { key: 'a', value: 'Arpanet' },
          { key: 'b', value: 'Papanet' },
          { key: 'c', value: 'Apenet' },
          { key: 'd', value: 'Internet' }
        ],
        correctAnswer: 'a'
      },
      {
        id: '2',
        question: 'In what year was Google launched on the web?',
        answers: [
          { key: 'a', value: '1989' },
          { key: 'b', value: '1999' },
          { key: 'c', value: '1997' },
          { key: 'd', value: '1998' }
        ],
        correctAnswer: 'd'
      },
      {
        id: '3',
        question: 'Which unit is an indication for the sound quality of MP3?',
        answers: [
          { key: 'a', value: 'Mbps' },
          { key: 'b', value: 'Kbps' },
          { key: 'c', value: 'baud' },
          { key: 'd', value: 'Gbps' }
        ],
        correctAnswer: 'b'
      }
    ] as Question[])
  } as Quiz;
};
