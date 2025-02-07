import { Component } from '@angular/core';

@Component({
  selector: 'app-ai-bot',
  templateUrl: './ai-bot.component.html',
  styleUrls: ['./ai-bot.component.scss'],
})
export class AiBotComponent {
  messages: { text: string; sender: 'bot' | 'user' }[] = [];
  userInput: string = '';
  currentQuestionIndex = 0;
  questions = [
    'Would you like to plan this event by yourself or with an event planner?',
    'What is your event budget?',
    'What type of event would you like to plan?',
    'Can you describe your event in detail?',
  ];

  constructor() {
    this.addBotMessage(this.questions[this.currentQuestionIndex]);
  }

  addBotMessage(text: string) {
    this.messages.push({ text, sender: 'bot' });
  }

  addUserMessage(text: string) {
    this.messages.push({ text, sender: 'user' });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.addUserMessage(this.userInput);
    this.userInput = '';

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      setTimeout(
        () => this.addBotMessage(this.questions[this.currentQuestionIndex]),
        500
      );
    } else {
      setTimeout(
        () =>
          this.addBotMessage(
            'Thank you! We will use this information to help plan your event.'
          ),
        500
      );
    }
  }
}
