# react-docgen-to-json-schema

> Converts [react-docgen]((https://github.com/reactjs/react-docgen)) output to [JSON Schema](http://json-schema.org).

[![NPM](https://img.shields.io/npm/v/react-docgen-to-json-schema.svg)](https://www.npmjs.com/package/react-docgen-to-json-schema) [![Build Status](https://travis-ci.com/hydrateio/react-docgen-to-json-schema.svg?branch=master)](https://travis-ci.com/hydrateio/react-docgen-to-json-schema) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

This module requires `node >= 4`.

```bash
npm install --save react-docgen-to-json-schema
```

## Usage

Take this example React component.

```js
import { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * General component description.
 */
export default class MyComponent extends Component {
  static propTypes = {
    /**
     * Description foo.
     */
    foo: PropTypes.number.isRequired,

    /**
     * Description bar.
     *
     * - markdown list-item 1
     * - markdown list-item 2
     */
    bar: PropTypes.string,

    /**
     * Description baz.
     */
    baz: PropTypes.bool
  }

  static defaultProps = {
    bar: 'bar'
  }

  render: () => { }
}
```

`react-docgen` generates the following JSON:

```js
{
  "description": "General component description.",
  "displayName": "MyComponent",
  "methods": [],
  "props": {
    "foo": {
      "type": {
        "name": "number"
      },
      "required": true,
      "description": "Description foo."
    },
    "bar": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": "Description bar.\n\n- markdown list-item 1\n- markdown list-item 2",
      "defaultValue": {
        "value": "'bar'",
        "computed": false
      }
    },
    "baz": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": "Description baz."
    }
  }
}
```

`react-docgen-to-json-schema` takes in this JSON and converts it to the following JSON Schema:

```js
{
  "title": "MyComponent",
  "type": "object",
  "properties": {
    "foo": {
      "type": "number",
      "description": "Description foo."
    },
    "bar": {
      "type": "string",
      "description": "Description bar.\n\n- markdown list-item 1\n- markdown list-item 2"
    },
    "baz": {
      "type": "boolean",
      "description": "Description baz."
    }
  },
  "required": [
    "foo"
  ]
}
```

## API

**TODO**

## Status

- [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [x] PropTypes.array
- [x] PropTypes.bool
- [ ] PropTypes.func
- [x] PropTypes.number
- [x] PropTypes.object
- [x] PropTypes.string
- [ ] PropTypes.symbol
- [ ] PropTypes.node
- [ ] PropTypes.element
- [ ] PropTypes.instanceOf
- [x] PropTypes.oneOf (enums)
- [ ] PropTypes.oneOfType (unions)
- [x] PropTypes.arrayOf
- [ ] PropTypes.objectOf
- [x] PropTypes.shape
- [ ] PropTypes.any
- [x] PropTypes isRequired
- [ ] PropTypes custom function
- [x] PropTypes default values

## Related

- [JSON Schema](http://json-schema.org) - Official JSON Schema spec.
- [React Docgen](https://github.com/reactjs/react-docgen) - Extracts docs from React source files.

## License

MIT © [Hydrate](https://github.com/hydrateio)
