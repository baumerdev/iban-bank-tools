/**
 * ibantools-germany
 * Copyright (C) 2022-2024 Markus Baumer <markus@baumer.dev>
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

import { paddedAccountNumber } from "../helper";
import { Result } from "../types";

import { method06CheckDigit, method06Result } from "./method06";

export default (number: string): Result => {
  const paddedNumber = paddedAccountNumber(number);
  const { calculatedCheckDigit, givenCheckDigit } = method06CheckDigit(
    paddedNumber.slice(0, 7),
    [2, 3, 4, 5, 6, 7],
  );

  if (calculatedCheckDigit === 1 && number.slice(4, 5) === number.slice(5, 6)) {
    return "VALID";
  }

  return method06Result(givenCheckDigit, calculatedCheckDigit);
};
