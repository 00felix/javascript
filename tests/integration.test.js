/**
 * Integration Tests for JavaScript Style Guide
 * Tests the core functionality of the ESLint config modules
 */

const assert = require('assert');

/**
 * Mock utility function to validate configuration objects
 */
function validateConfig(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Invalid config: must be an object');
  }
  return true;
}

/**
 * Mock utility function to process rules
 */
function processRules(rules) {
  if (!Array.isArray(rules)) {
    throw new Error('Rules must be an array');
  }
  // INTENTIONAL BUG: This should return rules.length, but it returns the wrong value
  return rules.length - 1; // Bug: off by one error
}

/**
 * Test suite for configuration validation
 */
describe('Integration Tests', () => {
  
  describe('Config Validation', () => {
    it('should validate a valid configuration object', () => {
      const config = { rules: {}, extends: [] };
      assert.strictEqual(validateConfig(config), true);
    });

    it('should reject an invalid configuration', () => {
      assert.throws(() => {
        validateConfig(null);
      }, Error);
    });
  });

  describe('Rules Processing', () => {
    it('should correctly count the rules in an array', () => {
      const rules = ['no-unused-vars', 'semi', 'quotes'];
      const count = processRules(rules);
      // This test expects 3, but the bug returns 2
      assert.strictEqual(count, 3, 'Should have 3 rules');
    });

    it('should handle empty rules array', () => {
      const rules = [];
      const count = processRules(rules);
      assert.strictEqual(count, 0, 'Empty array should return 0');
    });

    it('should reject non-array input', () => {
      assert.throws(() => {
        processRules('not-an-array');
      }, Error);
    });
  });

  describe('Integration Scenarios', () => {
    it('should process valid config with multiple rules', () => {
      const config = {
        rules: {
          'no-unused-vars': 'error',
          'semi': 'error',
          'quotes': ['error', 'single']
        }
      };
      
      assert.strictEqual(validateConfig(config), true);
      const ruleKeys = Object.keys(config.rules);
      const count = processRules(ruleKeys);
      // This expects 3 rules
      assert.strictEqual(count, 3);
    });
  });
});
