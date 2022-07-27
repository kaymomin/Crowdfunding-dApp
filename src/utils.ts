//helper functions to convert wei into matic

import type { BigNumberish } from "ethers";
import { BigNumber, utils } from "ethers";

/**
 * Return the `value` converted to BigNumber.
 *
 * @param value string value preferred.
 * @return BigNumber value
 */
export function toBN(value: BigNumberish): BigNumber {
  return BigNumber.from(value);
}

/**
 * Return the `gasPrice` converted to gwei.
 * formatUnits(value: BigNumberish, unitName?: BigNumberish | undefined): string
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param gasPrice BigNumberish value to be converted, preferred is BigNumber.
 * @return string value
 */
export function toGwei(gasPrice: BigNumberish): string {
  return utils.formatUnits(gasPrice, "gwei");
}

/**
 * Return the `value` converted to BigNumber wei.
 * parseUnits(value: string, unitName?: BigNumberish | undefined): BigNumber
 * BigNumberish -> string, BytesLike, BigNumber, number or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value the string value to be converted.
 * @param decimals decimal value or BigNumberish.
 * @return BigNumber value or undefined.
 */
export function toWei(value: string, decimals: number = 18): BigNumber {
  return utils.parseUnits(value, decimals);
}
/**
 * Return the `value` converted to string from wei.
 * formatUnits(value: BigNumberish, unitName?: BigNumberish | undefined): string
 * BigNumberish -> string, BigNumber, number, BytesLike or BigInt.`https://docs.ethers.io/v5/api/utils/bignumber/#BigNumberish`
 *
 * @param value BigNumberish value to be converted, preferred is BigNumber.
 * @param decimals decimal value or BigNumberish.
 * @return string value.
 */
export function fromWei(value: BigNumberish, decimals: number = 18): string {
  return utils.formatUnits(value, decimals);
}

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export default function isZero(hexNumberString: string) {
  return /^0x0*$/.test(hexNumberString);
}