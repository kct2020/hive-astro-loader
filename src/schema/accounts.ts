export type Account = {
  id: string;
  name: string;
  created: Date;
  wallet: Wallet;
  postCount: number;
  profile: Profile;
};

export type Profile = {
  name: string;
  about: string;
  coverImage: string;
  profileImage: string;
  website: string;
  location: string;
};

export type Wallet = {
  hive: {
    liquid: Money;
    frozen: Money;
  };
  hbd: {
    liquid: Money;
    frozen: Money;
  };
};

export interface MoneyInterface {
  currency: string;
  amount: string;
  precision: number;

  asFloat(): number;
}

export class Money implements MoneyInterface {
  currency: string;
  amount: string;
  precision: number;

  constructor(currency: string, amount: string, precision: number) {
    this.currency = currency;
    this.amount = parseFloat(amount).toFixed(precision).toString();
    this.precision = precision;
  }

  asFloat(): number {
    return parseFloat(this.amount);
  }
}
