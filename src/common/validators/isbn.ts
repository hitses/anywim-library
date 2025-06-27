/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

export class ISBNValidator {
  // Normaliza el ISBN eliminando espacios y guiones
  static normalize(isbn: string): string {
    return isbn.replace(/[\s-]/g, '').toUpperCase();
  }

  // Verifica si un ISBN es válido (ISBN-10 o ISBN-13)
  static validateISBN(input: string): boolean {
    const isbn = this.normalize(input);

    if (isbn.length === 10) return this.validateISBN10(isbn);
    if (isbn.length === 13) return this.validateISBN13(isbn);

    return false;
  }

  // Valida un ISBN-10, incluyendo el cálculo del dígito de control
  static validateISBN10(isbn10: string): boolean {
    if (!/^\d{9}[\dX]$/.test(isbn10)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += (i + 1) * parseInt(isbn10[i], 10);
    }

    const checkChar = isbn10[9];
    const checkValue = checkChar === 'X' ? 10 : parseInt(checkChar, 10);

    sum += 10 * checkValue;

    return sum % 11 === 0;
  }

  // Valida un ISBN-13, incluyendo el cálculo del dígito de control
  static validateISBN13(isbn13: string): boolean {
    if (!/^\d{13}$/.test(isbn13)) return false;

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(isbn13[i], 10);

      sum += i % 2 === 0 ? digit : digit * 3;
    }

    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    const providedCheckDigit = parseInt(isbn13[12], 10);

    return calculatedCheckDigit === providedCheckDigit;
  }
}

@ValidatorConstraint({ async: false })
export class IsValidIsbnConstraint implements ValidatorConstraintInterface {
  validate(isbn: string, args: ValidationArguments): boolean {
    return ISBNValidator.validateISBN(isbn);
  }

  defaultMessage(args: ValidationArguments): string {
    return 'The ISBN "$ value" is invalid. Must be a correct ISBN-10 or ISBN-13.';
  }
}

// Decorador: @IsValidIsbn()
export function IsValidIsbn(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidIsbnConstraint,
    });
  };
}
