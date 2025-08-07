import { Loader } from 'astro/loaders';

declare function hiveBlogLoader(author: string): Loader;

declare function hiveAccountsLoader(username: string | string[]): Loader;

type Communities = {
    id: string;
    name: string;
};

type Post = {
    id: string;
    author: string;
    title: string;
    description: string;
    created: Date;
    updated?: Date;
    community?: Communities;
    category: string;
    tags: string[];
    image?: string;
    canonical: string;
    content: string;
    meta: {
        app: string;
        format: string;
    };
};

type Account = {
    id: string;
    name: string;
    created: Date;
    wallet: Wallet;
    postCount: number;
    profile: Profile;
};
type Profile = {
    name: string;
    about: string;
    coverImage: string;
    profileImage: string;
    website: string;
    location: string;
};
type Wallet = {
    hive: {
        liquid: Money;
        frozen: Money;
    };
    hbd: {
        liquid: Money;
        frozen: Money;
    };
};
interface MoneyInterface {
    currency: string;
    amount: string;
    precision: number;
    asFloat(): number;
}
declare class Money implements MoneyInterface {
    currency: string;
    amount: string;
    precision: number;
    constructor(currency: string, amount: string, precision: number);
    asFloat(): number;
}

export { type Account, type Communities, Money, type Post, type Wallet, hiveAccountsLoader, hiveBlogLoader };
