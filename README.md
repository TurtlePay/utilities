# TurtlePay® Utilities Library

![Prerequisite](https://img.shields.io/badge/node-%3E%3D12-blue.svg) [![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/TurtlePay/utilities#readme) [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/TurtlePay/utilities/graphs/commit-activity) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/TurtlePay/utilities/blob/master/LICENSE) [![Twitter: TurtlePay](https://img.shields.io/twitter/follow/TurtlePay.svg?style=social)](https://twitter.com/TurtlePay)

[![NPM](https://nodeico.herokuapp.com/@turtlepay/utilities.svg)](https://npmjs.com/package/@turtlepay/utilities)

#### Master Build Status
[![Build Status](https://github.com/turtlepay/utilities/workflows/CI%20Build%20Tests/badge.svg?branch=master)](https://github.com/turtlepay/utilities/actions)

#### Development Build Status
[![Build Status](https://github.com/turtlepay/utilities/workflows/CI%20Build%20Tests/badge.svg?branch=development)](https://github.com/turtlepay/utilities/actions)

## Overview

Provides an easy to use HTTP/s Client interface that is meant to be extended from

## Prerequisites

- node >= 12

## Documentation

Full library documentation is available at [https://utilities.turtlepay.dev](https://utilities.turtlepay.dev)

## Install

### Using Yarn

```sh
yarn add @turtlepay/utilities
```

### Using NPM

```sh
npm install @turtlepay/utilities
```

## Usage

```typescript
import { AES, PEM } from '@turtlepay/utilities';

(async() => {
    const pem = new PEM()
    
    const keys = await pem.generateKeys();
    
    const sig = await pem.sign({test: 'data'}, keys.privateKey);

    console.log(await pem.verify({test: 'data'}, keys.publicKey, sig));
})

(async() => {
    const aes = new AES('password');

    const secret = await aes.encrypt({test: 'data'});

    const data = await aes.decrypt<{test: string}>(secret);

    console.log(data);
})
```

## Run tests

```sh
yarn test
```

## Author

👤 **TurtlePay® Development Team**

* Twitter: [@TurtlePay](https://twitter.com/TurtlePay)
* Github: [@TurtlePay](https://github.com/TurtlePay)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/TurtlePay/utilities/issues).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2020 [TurtlePay® Development Team](https://github.com/TurtlePay).

This project is [MIT](https://github.com/TurtlePay/utilities/blob/master/LICENSE) licensed.
