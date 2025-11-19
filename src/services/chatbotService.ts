interface Intent {
  tag: string;
  patterns: string[];
  responses: string[];
  context: string[];
}

interface IntentsData {
  intents: Intent[];
}

export class ChatbotService {
  private intents: Intent[] = [];
  // Removed unused context property

  constructor(intentsData: IntentsData) {
    this.intents = intentsData.intents;
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  }

  private calculateSimilarity(pattern: string, input: string): number {
    const patternTokens = this.tokenize(pattern);
    const inputTokens = this.tokenize(input);

    let matches = 0;
    for (const token of inputTokens) {
      if (patternTokens.some(pt => pt.includes(token) || token.includes(pt))) {
        matches++;
      }
    }

    return matches / Math.max(patternTokens.length, inputTokens.length);
  }

  private findBestIntent(message: string): Intent | null {
    let bestMatch: { intent: Intent; score: number } | null = null;

    for (const intent of this.intents) {
      for (const pattern of intent.patterns) {
        const score = this.calculateSimilarity(pattern, message);

        if (score > 0.3 && (!bestMatch || score > bestMatch.score)) {
          bestMatch = { intent, score };
        }
      }
    }

    return bestMatch ? bestMatch.intent : null;
  }

  public getResponse(message: string): string {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return "Please enter a message.";
    }

    const intent = this.findBestIntent(trimmedMessage);

    if (intent) {
      // Removed assignment to unused context property

      const responses = intent.responses;
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    }

    const noAnswerIntent = this.intents.find(i => i.tag === 'noanswer');
    if (noAnswerIntent) {
      const responses = noAnswerIntent.responses;
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    }

    return "I'm not sure how to respond to that.";
  }

  public resetContext(): void {
    // Removed reset of unused context property
  }
}
