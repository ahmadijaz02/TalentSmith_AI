import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Gemini API Key Manager
 * Automatically loads all API keys from environment variables
 * and provides rotation/fallback functionality
 */

export class GeminiKeyManager {
  private apiKeys: string[] = [];
  private currentKeyIndex = 0;
  private keyUsageCount: Map<string, number> = new Map();

  constructor() {
    this.loadApiKeys();
  }

  /**
   * Automatically loads all GEMINI_API_KEY_* environment variables
   */
  private loadApiKeys() {
    const keys: string[] = [];
    let index = 1;

    // Keep checking for GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc.
    while (true) {
      const key = process.env[`GEMINI_API_KEY_${index}`];
      if (!key || key.trim() === '') {
        break; // Stop when we don't find a key
      }
      keys.push(key.trim());
      index++;
    }

    // Fallback to single GEMINI_API_KEY if no numbered keys found
    if (keys.length === 0) {
      const fallbackKey = process.env.GEMINI_API_KEY;
      if (fallbackKey && fallbackKey.trim() !== '') {
        keys.push(fallbackKey.trim());
      }
    }

    this.apiKeys = keys;
    console.log(`✅ Loaded ${this.apiKeys.length} Gemini API key(s)`);
  }

  /**
   * Get the current API key
   */
  getCurrentKey(): string {
    if (this.apiKeys.length === 0) {
      throw new Error("No Gemini API keys configured. Please add GEMINI_API_KEY_1, GEMINI_API_KEY_2, etc. to your .env file");
    }
    return this.apiKeys[this.currentKeyIndex];
  }

  /**
   * Get GoogleGenerativeAI instance with current key
   */
  getClient(): GoogleGenerativeAI {
    return new GoogleGenerativeAI(this.getCurrentKey());
  }

  /**
   * Rotate to the next API key
   */
  rotateKey() {
    if (this.apiKeys.length <= 1) {
      console.warn("⚠️ Only one API key available, cannot rotate");
      return;
    }

    const previousIndex = this.currentKeyIndex;
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    console.log(`🔄 Rotated from key ${previousIndex + 1} to key ${this.currentKeyIndex + 1}`);
  }

  /**
   * Record usage for the current key
   */
  recordUsage() {
    const key = this.getCurrentKey();
    const count = this.keyUsageCount.get(key) || 0;
    this.keyUsageCount.set(key, count + 1);
  }

  /**
   * Get total number of available keys
   */
  getKeyCount(): number {
    return this.apiKeys.length;
  }

  /**
   * Get current key index (1-based for display)
   */
  getCurrentKeyNumber(): number {
    return this.currentKeyIndex + 1;
  }

  /**
   * Get usage statistics
   */
  getUsageStats() {
    const stats: Record<number, number> = {};
    this.apiKeys.forEach((key, index) => {
      stats[index + 1] = this.keyUsageCount.get(key) || 0;
    });
    return stats;
  }
}

/**
 * Generate content with automatic key rotation on rate limit errors
 */
export async function generateWithFallback(
  keyManager: GeminiKeyManager,
  modelName: string,
  prompt: string,
  generationConfig?: Record<string, unknown>
): Promise<{ text: string; keyUsed: number }> {
  const maxAttempts = keyManager.getKeyCount();
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const client = keyManager.getClient();
      const model = client.getGenerativeModel({
        model: modelName,
        generationConfig,
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // Record successful usage
      keyManager.recordUsage();

      return {
        text,
        keyUsed: keyManager.getCurrentKeyNumber(),
      };
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      lastError = err;
      const errorMessage = err.message;

      console.error(`❌ Error with key ${keyManager.getCurrentKeyNumber()}: ${errorMessage}`);

      // If this is the last attempt, throw the error
      if (attempt >= maxAttempts - 1) {
        throw err;
      }

      // Try next key for any error (rate limit, quota, or other API errors)
      console.warn(`🔄 Trying next API key...`);
      keyManager.rotateKey();
      continue;
    }
  }

  // If we've exhausted all keys
  throw new Error(
    `All ${maxAttempts} API keys have been exhausted or failed. Last error: ${lastError?.message}`
  );
}

// Create a singleton instance
export const geminiKeyManager = new GeminiKeyManager();
