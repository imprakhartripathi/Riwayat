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
  userResponses: string[] = []; // To store user responses for each question
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
    this.userResponses.push(this.userInput.toLowerCase()); // Store lowercase responses for easier matching
    this.userInput = '';

    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.questions.length) {
      setTimeout(
        () => this.addBotMessage(this.questions[this.currentQuestionIndex]),
        500
      );
    } else {
      setTimeout(() => this.evaluateResponses(), 500);
    }
  }

  evaluateResponses() {
    const [plannerChoice, budget, eventType, description] = this.userResponses;

    if (plannerChoice.includes('event planner')) {
      if (eventType.includes('birthday')) {
        this.addBotMessage(
          'Based on your preferences, we recommend Donna! She is really good with parties and can handle everything for your birthday event.'
        );
      } else if (eventType.includes('wedding')) {
        this.addBotMessage(
          'For weddings, we recommend Rachel! She is an expert at making weddings unforgettable.'
        );
      } else if (eventType.includes('law')) {
        this.addBotMessage(
          'For law-related events, Harvey Specter is your go-to person. He will make sure your event is a success.'
        );
      } else if (eventType.includes('medical')) {
        this.addBotMessage(
          'For medical events, we recommend Dr. House. He is highly experienced and will take care of everything.'
        );
      } else {
        this.addBotMessage(
          'Thank you! We will use this information to help plan your event.'
        );
      }
    } else {
      this.addBotMessage(
        'Thank you! We will use this information to help plan your event.'
      );
    }
  }
}
