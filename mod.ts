function gcd(a: number | bigint, b: number | bigint): number | bigint {
    if (typeof a !== typeof b) {
        a = BigInt(a);
        b = BigInt(b);
    }
    if (b == 0) return a;
    // @ts-ignore TS doesn't understand that this will force both to be a bigint if one of them is not
    else return gcd(b, a % b);
}

function prodIteration(X: number[] | bigint[]): number[] | bigint[] {
    let i = 0;
    const result = [];
    const fallback = typeof X[X.length - 1] === "bigint" ? 1n : 1;
    while (i < X.length) {
        // @ts-ignore TS doesn't understand that this will use a bigint if X is a bigint array
        result.push(X[i++] * (X[i++] ?? fallback));
    }
    return result;
}

function productTree(X: number[] | bigint[]): number[][] | bigint[][] {
    const result = [X];
    while (X.length > 1) {
        X = prodIteration(X);
        result.push(X);
    }
    // @ts-ignore TS doesn't understand that this will use bigints if X is a bigint array
    return result;
}

function reminders(
    R: number[] | bigint[],
    X: number[] | bigint[]
): number[] | bigint[] {
    const result: number[] | bigint[] = [];
    const pow: number | bigint = typeof X[0] === "bigint" ? 2n : 2;
    const floor =
        typeof X[0] === "bigint"
            ? (x: number) => BigInt(Math.floor(x))
            : Math.floor;
    for (let i = 0; i < X.length; i++) {
        // @ts-ignore TS doesn't understand that this will use a bigint if X is a bigint array
        result.push(R[floor(i / 2) % X[i] ** pow]);
    }
    return result;
}

/**
 * Check which numbers share a prime with any other integer in the sequence.
 * Value above 1 means a number has at least one shared prime - which in the case of encryption keys can be potential vulnerability
 * @param N - list of numbers to test (rsa moduli for example)
 * @returns gcd with the rest of the list for each number in the list
 */
export function batchGcd(N: number[] | bigint[]) {
    const products: number[][] | bigint[][] = productTree(N),
        result: number[] | bigint[] = [];
    let R: number[] | bigint[] = products.pop() as number[],
        X: number[] | bigint[] = [];
    while (products.length > 0) {
        X = products.pop() as number[] | bigint[];
        R = reminders(R, X);
    }
    for (let i = 0; i < R.length; i++) {
        // @ts-ignore TS doesn't understand that this will use bigints if R and X are bigint arrays
        result.push(gcd(R[i] / X[i], X[i]));
    }
    return result;
}

/**
 * Check if resulting batch is safe
 * @param batch - batchGcd results
 * @returns true if no number exceeds 1, false otherwise
 */
export function isSafe(batch: number[] | bigint[]): boolean {
    for (const value of batch) {
        if (value > 1) return false;
    }
    return true;
}
