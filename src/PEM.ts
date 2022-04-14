// Copyright (c) 2018-2022, The TurtlePay Developers
//
// Please see the included LICENSE file for more information.

import {createHash, createSign, createVerify} from 'crypto';
import * as pem from 'pem';

/**
 * PEM wrapper for generating key pairs, signing and verifying
 */
export default class PEM {
    private readonly m_algorithm: string;
    private readonly m_keySize: number;

    /**
     * Creates a new instance of the wrapper
     *
     * @param algorithm the digest algorithm to use
     * @param keySize the size of the keys in bits
     */
    constructor(algorithm = 'sha256', keySize = 2048) {
        this.m_algorithm = algorithm;

        this.m_keySize = keySize;
    }

    /**
     * The digest algorithm used
     */
    public get algorithm(): string {
        return this.m_algorithm;
    }

    /**
     * The size of the keys in bits
     */
    public get keySize(): number {
        return this.m_keySize;
    }

    /**
     * Generates a message digest from the given message
     *
     * @param message the message for which we will generate the digest
     * @param encoding the returned encoding scheme for the digest
     */
    public async digest<T>(message: T, encoding: 'hex' | 'base64' = 'hex'): Promise<string> {
        let _message: string;

        if (typeof message === 'string') {
            _message = message;
        } else {
            _message = JSON.stringify(message);
        }

        return createHash(this.algorithm)
            .update(_message)
            .digest(encoding);
    }

    /**
     * Generates a new private & public key pair
     */
    public async generateKeys(): Promise<{ privateKey: string, publicKey: string }> {
        return new Promise((resolve, reject) => {
            pem.createPrivateKey(this.keySize, (error, privateKey) => {
                if (error) {
                    return reject(error);
                }

                pem.getPublicKey(privateKey.key, (error, publicKey) => {
                    if (error) {
                        return reject(error);
                    }

                    try {
                        return resolve({
                            privateKey: Buffer.from(privateKey.key).toString('hex'),
                            publicKey: Buffer.from(publicKey.publicKey).toString('hex')
                        });
                    } catch (error) {
                        return reject(error);
                    }
                });
            });
        });
    }

    /**
     * Sign a message using the supplied private key
     *
     * @param message the message to sign
     * @param privateKey the private key to use in signing
     */
    public async sign<T>(message: T, privateKey: string): Promise<string> {
        const digest = await this.digest(message);

        const pk = Buffer.from(privateKey, 'hex').toString();

        const signingContext = createSign(this.algorithm);

        signingContext.update(digest);

        signingContext.end();

        return signingContext.sign(pk).toString('hex');
    }

    /**
     * Verifies a signature
     *
     * @param message the message that was signed
     * @param publicKey the public key of the private key that signed
     * @param signature the signature
     */
    public async verify<T>(message: T, publicKey: string, signature: string): Promise<boolean> {
        const digest = await this.digest(message);

        const pk = Buffer.from(publicKey, 'hex').toString();

        const sig = Buffer.from(signature, 'hex');

        const verificationContex = createVerify(this.algorithm);

        verificationContex.update(digest);

        verificationContex.end();

        return verificationContex.verify(pk, sig);
    }
}
