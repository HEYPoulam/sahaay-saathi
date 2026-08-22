class SilentDuressCodec {
  constructor(options = {}) {
    this.duressInvertSuffix = options.duressInvertSuffix || '99';
    this.tapThresholdMs = options.tapThresholdMs || 1200;
  }

  /**
   * Evaluates PIN authentication for silent duress trigger.
   * If regular PIN is 1234, entering 123499 authorizes fake dismissal
   * while triggering the silent SOS event.
   */
  evaluatePIN(inputPin, truePin) {
    if (inputPin === truePin) {
      return {
        action: 'NORMAL_DISMISSAL',
        dispatchSilentRescue: false,
        displayDecoyScreen: false
      };
    }

    if (inputPin === `${truePin}${this.duressInvertSuffix}`) {
      return {
        action: 'SILENT_DURESS_TRIGGERED',
        dispatchSilentRescue: true,
        displayDecoyScreen: true,
        triageCode: 'CODE_SILENT_HOSTAGE'
      };
    }

    return {
      action: 'INVALID_PIN',
      dispatchSilentRescue: false,
      displayDecoyScreen: false
    };
  }

  /**
   * Analyzes hardware tap timestamps for SOS patterns.
   */
  evaluateTapCadence(timestamps = []) {
    if (timestamps.length < 3) {
      return {
        isDuressPattern: false
      };
    }

    const intervals = [];

    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(
        timestamps[i] - timestamps[i - 1]
      );
    }

    const isRapidCadence =
      intervals.every(
        interval =>
          interval <= this.tapThresholdMs
      );

    return {
      isDuressPattern:
        isRapidCadence &&
        timestamps.length >= 3,

      detectedTaps:
        timestamps.length,

      silentDispatchPayload:
        isRapidCadence
          ? {
              priority: 'MAXIMUM_COVERT',
              dispatchType: 'TACTICAL_RESPONSE'
            }
          : null
    };
  }
}

module.exports = SilentDuressCodec;
