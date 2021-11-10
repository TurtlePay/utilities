// Copyright (c) 2018-2020, The TurtlePay Developers
//
// Please see the included LICENSE file for more information.

import { ModeOfOperation, utils as AESUtils } from 'aes-js';
import { createHmac } from 'crypto';

/**
 * AES encryption/decryption wrapper
 */
export default class AES {
    private readonly m_key: Buffer;

    /**
     * Constructs a new instance of the wrapper
     * @param password the password for encryption/decryption
     */
    constructor (password: string) {
        this.m_key = createHmac('sha256', password).digest();
    }

    /**
     * The HMAC key used for encryption/decryption
     */
    public get key (): Buffer {
        return this.m_key;
    }

    /**
     * Encrypts the given data into a hexadecimal string
     * @param data the data to encrypt
     */
    public async encrypt<T> (data: T): Promise<string> {
        let _data: string;

        if (typeof data === 'string') {
            _data = data;
        } else {
            _data = JSON.stringify(data);
        }

        const bytes = AESUtils.utf8.toBytes(_data);

        // eslint-disable-next-line new-cap
        const aesContext = new ModeOfOperation.ctr(this.key);

        const encryptedBytes = aesContext.encrypt(bytes);

        return AESUtils.hex.fromBytes(encryptedBytes);
    }

    /**
     * Decrypts the given encrypted hex string into the original data
     * @param encrypted the hexadecimal form of the encrypted bytes
     */
    public async decrypt<T> (encrypted: string): Promise<T> {
        const encryptedBytes = AESUtils.hex.toBytes(encrypted);

        // eslint-disable-next-line new-cap
        const aesContext = new ModeOfOperation.ctr(this.key);

        const bytes = aesContext.decrypt(encryptedBytes);

        const _data = AESUtils.utf8.fromBytes(bytes);

        return JSON.parse(_data);
    }
}
