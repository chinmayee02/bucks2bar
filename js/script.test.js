// FILE: js/scripts.test.js

describe('Username Validation Regex', () => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;

    test('should validate a username with at least 1 capital letter, 1 special character, 1 number, and at least 8 characters', () => {
        const validUsername = 'Password1!';
        expect(regex.test(validUsername)).toBe(true);
    });

    test('should fail if the username is less than 8 characters', () => {
        const shortUsername = 'Pass1!';
        expect(regex.test(shortUsername)).toBe(false);
    });

    test('should fail if the username does not contain a capital letter', () => {
        const noCapital = 'password1!';
        expect(regex.test(noCapital)).toBe(false);
    });

    test('should fail if the username does not contain a special character', () => {
        const noSpecialChar = 'Password1';
        expect(regex.test(noSpecialChar)).toBe(false);
    });

    test('should fail if the username does not contain a number', () => {
        const noNumber = 'Password!';
        expect(regex.test(noNumber)).toBe(false);
    });

    test('should fail if the username contains invalid characters', () => {
        const invalidChars = 'Password1!<>';
        expect(regex.test(invalidChars)).toBe(false);
    });

    test('should validate a username with multiple special characters, numbers, and capital letters', () => {
        const complexUsername = 'P@ssw0rd!123';
        expect(regex.test(complexUsername)).toBe(true);
    });
});