[![nest badge](https://nest.land/badge-block.svg)](https://nest.land/package/batch_gcd)

# batchGCD

A Deno module allowing you to check one aspect of RSA key security.

By providing a list of RSA moduli (reading moduli from keys will be added once I or someone else makes an ASN.1 parser for Deno) you can check if any one of them shares at least one prime with any other key from the list.

Having keys share primes is quite bad from the security perspective and indicates a problem with your random number generator that should be fixed immidietly.

Some sources about the danger of batch gcd and tests ran agains large key databases:

-   https://dl.acm.org/doi/10.5555/2362793.2362828
-   https://info.keyfactor.com/factoring-rsa-keys-in-the-iot-era
-   https://eprint.iacr.org/2012/064.pdf
-   https://smartfacts.cr.yp.to/smartfacts-20130916.pdf
-   https://eprint.iacr.org/2016/515.pdf
-   https://research.kudelskisecurity.com/2018/10/16/reaping-and-breaking-keys-at-scale-when-crypto-meets-big-data/
-   https://protonmail.com/blog/batch-gcd/
-   https://facthacks.cr.yp.to/batchgcd.html

# Usage

1. Import `batchGcd` and optionally `isSafe` from the module:
    ```ts
    import {
        batchGcd,
        isSafe,
    } from "https://deno.land/x/batch_gcd@v1.0.0/mod.ts";
    ```
2. Prepare a list of numbers or most likely bigints (rsa moduli are usually far above 32 bit JS integer size)
3. Run your list through batchGcd:
    ```ts
    const batchResult = batchGcd(yourList);
    ```
4. check if any number exceeds 1 - you can use the included `isSafe` function:
    ```ts
    const safe = isSafe(batchResult);
    ```
