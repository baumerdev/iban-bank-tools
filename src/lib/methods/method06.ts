/**
 * ibantools-germany
 * Copyright (C) 2022 Markus Baumer <markus@baumer.dev>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.

 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
  calculateSum,
  getDigits,
  moduloDifference,
  weightDigitsRTL,
} from "../helper";
import { Result } from "../types";

export const method06CheckDigit = (
  number: string,
  weights: number[],
  modulo = 11
): { calculatedCheckDigit: number; givenCheckDigit: number } => {
  const digits = getDigits(number);
  const givenCheckDigit = digits.pop() as number; // Check digit is last digit

  const weightedDigits = weightDigitsRTL(digits, weights);
  const sum = calculateSum(weightedDigits);
  const calculatedCheckDigit = moduloDifference(sum, modulo, modulo);

  return { calculatedCheckDigit, givenCheckDigit };
};

export const method06Result = (
  givenCheckDigit: number,
  calculatedCheckDigit: number,
  diff10CheckDigit = 0,
  diff11CheckDigit = 0
): Result => {
  if (calculatedCheckDigit === 10) {
    if (givenCheckDigit === diff10CheckDigit) {
      return Result.VALID;
    }

    return Result.INVALID;
  }

  if (calculatedCheckDigit === 11) {
    if (givenCheckDigit === diff11CheckDigit) {
      return Result.VALID;
    }

    return Result.INVALID;
  }

  if (givenCheckDigit === calculatedCheckDigit) {
    return Result.VALID;
  }

  return Result.INVALID;
};

export const method06Core = (
  number: string,
  weights: number[],
  diff10CheckDigit = 0,
  diff11CheckDigit = 0,
  modulo = 11
): Result => {
  const { calculatedCheckDigit, givenCheckDigit } = method06CheckDigit(
    number,
    weights,
    modulo
  );

  return method06Result(
    givenCheckDigit,
    calculatedCheckDigit,
    diff10CheckDigit,
    diff11CheckDigit
  );
};

export default (number: string): Result =>
  method06Core(number, [2, 3, 4, 5, 6, 7, 2, 3, 4]);