'use strict'

const safeEval = require('notevil')

/**
 * Converts a single JSON object extracted by react-docgen to JSON Schema.
 *
 * @name reactDocgenToJSONSchema
 * @type function
 *
 * @param {object} input - JSON object documenting a single component.
 *
 * @return {object}
 */
module.exports = (input) => {
  const {
    props = { },
    displayName
  } = input

  const {
    properties,
    required
  } = getSchemaProperties(props)

  const jsonSchema = {
    title: displayName,
    type: 'object',
    properties
  }

  if (required.length) {
    jsonSchema.required = required
  }

  return jsonSchema
}

// Extract JSON Schema style properties from react-docgen props.
const getSchemaProperties = (props) => {
  const required = []

  const properties = Object.keys(props).reduce((result, key) => {
    const original = props[key]

    // Skip props that are not defined with a propType
    if (!original.type) {
      return result
    }

    // Skip props that have '@ignore' in description (eg. in material-ui)

    if (original.description && original.description.indexOf('@ignore') > -1) {
      return result
    }

    if (original.required) {
      required.push(key)
    }

    const value = getPropertyForProp(original)

    if (value) {
      result[key] = value
    }

    return result
  }, {})

  return {
    properties,
    required
  }
}

const reduceShapeToProps = (shapes) =>
  Object.keys(shapes).reduce((result, key) => {
    result[key] = { type: shapes[key] }

    return result
  }, {})

// Convert a property extracted by react-docgen to a JSON Schema property.
const getPropertyForProp = ({
  type = { name: '' },
  description,
  defaultValue
}) => {
  const result = {
    type: type.name
  }

  if (description) {
    result.description = description
  }

  if (type.name === 'enum') {
    // Only process enums if they're arrays. Don't process them if they are
    // references to an object.
    if (typeof type.value === 'object') {
      result.enum = type.value.reduce((collector, item) => {

        try {
          const value = safeEval(item.value)

          if (typeof item.value === 'object') {
            collector.push({
              value
            })
          } else {
            collector.push(value)
          }
        } catch (e) {
          console.log("could not evalulate value", e);
          return collector
        }

        return collector
      }, [])

      result.type = typeof result.enum[0]
      for (const value of result.enum) {
        if (typeof value !== typeof result.enum[0]) {
          console.log('Mixed enum must have consistent types, falling back to \`object\`');
          result.type = 'object';
        }
      }
    } else {
      // Assume a string if not an object. This is because JS is loosely typed,
      // so we can normally get away with using a string.
      result.type = 'string'
    }
  } else if (type.name === 'union') {
    // Without parsing all schemas together then no ability to inter-reference one-
    // another through `"$ref": "#path/to/my/JsonSchemaType"`
    result.anyOf = type.value.map((subType) => getPropertyForProp({ type: subType }))
    delete result.type
  } else if (type.name === 'arrayOf') {
    result.type = 'array'
    result.items = getPropertyForProp({ type: type.value })
  } else if (type.name === 'shape') {
    result.type = 'object'

    const {
      properties,
      required
    } = getSchemaProperties(reduceShapeToProps(type.value))

    result.properties = properties
    if (required.length) {
      result.required = required
    }
  } else if (type.name === 'node') {
    result.type = 'object'
  } else if (type.name === 'bool') {
    result.type = 'boolean'
  } else if (type.name === 'func') {
    return
  }

  if (defaultValue) {
    if (defaultValue.value.trim().indexOf('<') === 0) {
      console.log("JSX default values not currently supported, skipping");
      return result;
    }

    try {
      result.default = safeEval(defaultValue.value);
    } catch (e) {
      console.log("could not evalulate defaultValue", e);
    }
  }

  return result
}
