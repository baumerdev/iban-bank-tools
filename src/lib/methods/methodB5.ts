/*!
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

import { paddedAccountNumber } from "../helper";
import { Result } from "../types";

import method00 from "./method00";
import { method01Core } from "./method01";

export default (number: string): Result => {
  const paddedNumber = paddedAccountNumber(number);

  if (method01Core(number, [7, 3, 1, 7, 3, 1, 7, 3, 1]) === Result.VALID) {
    return Result.VALID;
  }
  if (paddedNumber.match(/^[89]/)) {
    return Result.INVALID;
  }

  return method00(number);
};
