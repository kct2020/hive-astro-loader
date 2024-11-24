import { z } from "astro/zod";
import { Money } from "~/schema/accounts.ts";
import type { DynamicGlobalProperties } from "@hiveio/dhive";

export function typeToZ<T>() {
  return z.custom<T>(() => true) as z.ZodType<T>;
}

export function balanceToMoney(
  balance: string,
  precision: number
): Money | null {
  const [amount, currency] = balance.split(" ");
  if (!amount || !currency) {
    throw new Error(`Invalid balance: ${balance}`);
  }
  return new Money(currency, amount, precision);
}

export const vestsToHive = (
  vests: string,
  params: DynamicGlobalProperties
): Money => {
  const [v] = vests.split(" ");
  const [totalFund] = (params.total_vesting_fund_hive as string).split(" ");
  const [totalShares] = (params.total_vesting_shares as string).split(" ");
  const hive =
    (parseFloat(v!) * parseFloat(totalFund!)) / parseFloat(totalShares!);
  return new Money("HIVE", hive.toString(), 3);
};
