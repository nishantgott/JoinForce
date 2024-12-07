import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionService } from '../../services/question.service';
import { AnswerService } from '../../services/answer.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  vacancyId: number = 0;
  questions: Question[] = [];
  answersMap: { [key: number]: any[] } = {};
  answersVisibility: { [key: number]: boolean } = {};
  newQuestionContent: string = '';
  newAnswerContent: { [key: number]: string } = {}; // Object to hold answers for each question
  user: any = null;

  submitQuestion(): void {
    if (this.newQuestionContent.trim()) {
      const newQuestion = {
        senderName: this.user.username,
        createdAt: new Date().toISOString(),
        questionContent: this.newQuestionContent,
        vacancyId: this.vacancyId,
        questionId: 0,
      };

      this.questionService.createQuestion(newQuestion).subscribe(
        (question) => {
          this.questions.push(question);
          this.newQuestionContent = '';
        },
        (error) => {
          console.error('Error posting question:', error);
        }
      );
    }
  }

  submitAnswer(questionId: number): void {
    const answerContent = this.newAnswerContent[questionId]?.trim();
    if (answerContent) {
      const newAnswer = {
        senderName: this.user.username,
        createdAt: new Date().toISOString(),
        answerContent,
        questionId,
        answerId: 0,
      };

      this.answerService.createAnswer(newAnswer).subscribe(
        (answer) => {
          // Push the new answer to the answers map for the specific question
          if (!this.answersMap[questionId]) {
            this.answersMap[questionId] = [];
          }
          this.answersMap[questionId].push(answer);

          // Clear the answer input box
          this.newAnswerContent[questionId] = '';
        },
        (error) => {
          console.error('Error posting answer:', error);
        }
      );
    }
  }

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) { }

  ngOnInit(): void {
    this.vacancyId = +this.route.snapshot.paramMap.get('vacancyId')!;
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    }
    console.log(this.user);
    this.getQuestionsForVacancy(this.vacancyId);
  }

  getQuestionsForVacancy(vacancyId: number): void {
    this.questionService.getQuestionsByVacancyId(vacancyId).subscribe(
      (questions) => {
        this.questions = questions;
        this.questions.forEach((question) => {
          this.getAnswersForQuestion(question.questionId);
        });
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  toggleAnswers(questionId: number): void {
    this.answersVisibility[questionId] = !this.answersVisibility[questionId];
  }

  getAnswersForQuestion(questionId: number): void {
    this.answerService.getAnswersByQuestionId(questionId).subscribe(
      (answers) => {
        this.answersMap[questionId] = answers;
      },
      (error) => {
        console.error('Error fetching answers:', error);
      }
    );
  }
}
