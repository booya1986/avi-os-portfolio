// Sound utility functions for AVI-OS audio feedback using Web Audio API

export interface SoundConfig {
  volume?: number;
  pitch?: number;
  duration?: number;
}

class SoundManager {
  private audioContext: AudioContext | null = null;
  private globalVolume: number = 0.15; // Lower default volume for web audio
  private enabled: boolean = true;
  private lastTypingTime: number = 0;
  private typingThrottleMs: number = 50; // Minimum time between typing sounds

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      this.enabled = false;
    }
  }

  private async resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Failed to resume audio context:', error);
      }
    }
  }

  private createTone(frequency: number, duration: number, volume: number, type: OscillatorType = 'sine') {
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    // Create envelope for smoother sound
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.globalVolume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private createClickSound() {
    // Sharp, quick click sound
    this.createTone(800, 0.1, 0.3, 'square');
  }

  private createOpenSound() {
    // Rising tone for opening
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;
    const duration = 0.3;

    oscillator.frequency.setValueAtTime(220, now);
    oscillator.frequency.exponentialRampToValueAtTime(440, now + duration);
    oscillator.type = 'triangle';

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.globalVolume * 0.4, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private createCloseSound() {
    // Falling tone for closing
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;
    const duration = 0.25;

    oscillator.frequency.setValueAtTime(440, now);
    oscillator.frequency.exponentialRampToValueAtTime(220, now + duration);
    oscillator.type = 'triangle';

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.globalVolume * 0.4, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private createHoverSound() {
    // Subtle hover sound
    this.createTone(600, 0.08, 0.15, 'sine');
  }

  private createMinimizeSound() {
    // Descending minimize sound
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;
    const duration = 0.2;

    oscillator.frequency.setValueAtTime(600, now);
    oscillator.frequency.linearRampToValueAtTime(200, now + duration);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.globalVolume * 0.3, now + 0.02);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private createMaximizeSound() {
    // Ascending maximize sound
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;
    const duration = 0.25;

    oscillator.frequency.setValueAtTime(300, now);
    oscillator.frequency.linearRampToValueAtTime(800, now + duration);
    oscillator.type = 'sawtooth';

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.globalVolume * 0.3, now + 0.02);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private createTypingSound() {
    // Realistic typing sound with slight randomization
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;
    const duration = 0.05;

    // Randomize frequency for more natural typing sound
    const baseFreq = 800;
    const randomVariation = (Math.random() - 0.5) * 200;
    const frequency = baseFreq + randomVariation;

    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.type = 'square';

    // Quick attack and release for typing sound
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.globalVolume * 0.08, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private createSpacebarSound() {
    // Different sound for spacebar (lower frequency)
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;
    const duration = 0.08;

    oscillator.frequency.setValueAtTime(400, now);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.globalVolume * 0.1, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  private createBackspaceSound() {
    // Different sound for backspace (higher frequency with slight pitch bend)
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;
    const duration = 0.07;

    oscillator.frequency.setValueAtTime(1200, now);
    oscillator.frequency.linearRampToValueAtTime(900, now + duration);
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.globalVolume * 0.09, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  public async play(soundName: string) {
    if (!this.enabled || !this.audioContext) return;

    await this.resumeAudioContext();

    switch (soundName) {
      case 'click':
        this.createClickSound();
        break;
      case 'open':
        this.createOpenSound();
        break;
      case 'close':
        this.createCloseSound();
        break;
      case 'hover':
        this.createHoverSound();
        break;
      case 'minimize':
        this.createMinimizeSound();
        break;
      case 'maximize':
        this.createMaximizeSound();
        break;
      case 'typing':
        this.createTypingSound();
        break;
      case 'spacebar':
        this.createSpacebarSound();
        break;
      case 'backspace':
        this.createBackspaceSound();
        break;
      default:
        console.warn(`Unknown sound: ${soundName}`);
    }
  }

  public setGlobalVolume(volume: number) {
    this.globalVolume = Math.max(0, Math.min(1, volume));
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public getEnabled(): boolean {
    return this.enabled;
  }

  public playTypingSound(key: string) {
    // Throttle typing sounds to prevent audio overload
    const now = Date.now();
    if (now - this.lastTypingTime < this.typingThrottleMs) {
      return;
    }
    this.lastTypingTime = now;

    // Play different sounds based on key type
    if (key === ' ') {
      this.play('spacebar');
    } else if (key === 'Backspace') {
      this.play('backspace');
    } else if (key.length === 1) { // Regular character
      this.play('typing');
    }
  }
}

// Create global sound manager instance
export const soundManager = new SoundManager();

// Convenience functions for common sounds
export const playClickSound = () => soundManager.play('click');
export const playOpenSound = () => soundManager.play('open');
export const playCloseSound = () => soundManager.play('close');
export const playHoverSound = () => soundManager.play('hover');
export const playMinimizeSound = () => soundManager.play('minimize');
export const playMaximizeSound = () => soundManager.play('maximize');
export const playTypingSound = (key: string) => soundManager.playTypingSound(key);