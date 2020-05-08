# Bucketify
Bucketify is a JavaScript data manipulator that divides across a set of buckets of equal size.

## Installation
### Node.js
```sh
npm install --save bucketify
```

### Browser
Download the minified browser version bucketify.min.js
``` html
<script src="bucketify.min.js"></script>
```

## API
### `Bucketify({list,getProperty,minRange,maxRange,maxBuckets,bucketSize)`
 - `list`: Array of number, strings, objects, etc. to be grouped
 - `getProperty`:  *(Optional if `list` elements are numbers)* A function that, when passed an element from `list`, returns a number.
 - `minRange`: *(Optional)* The minimum value for a bucket to accept. Will be overwritten if `list` contains values less than `minRange`.
 - `maxRange`: *(Optional)* The maximum value for a bucket to accept. Will be overwritten if `list` contains values greater than `maxRange`.
 - `maxBuckets`: *(Optional)* The maximum number of buckets.  If set,`maxBuckets` must be greater than zero. Cannot be set along with `bucketSize`.
 - `bucketSize`: *(Optional)* The size of each bucket. If set,`bucketSize` must be greater than zero. Cannot be set along with `maxBuckets`.

### `Bucketify.add(element)`

 - `element`: Element to be added to Bucketify instance

## License

ISC License (ISC)

Copyright 2020 Vinay Pillai

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
THE SOFTWARE.