import { Component } from 'react'
import PropTypes from 'prop-types'

export default class MyComponent extends Component {
  static propTypes = {
    /**
     * Description foo.
     */
    foo: PropTypes.arrayOf(PropTypes.shape({
      /**
       * Description bar
       */
      bar: PropTypes.string,
      /**
       * Description baz
       */
      baz: PropTypes.bool
    }))
  }

  static defaultProps = {
    foo: [ {
      bar: 'test bar',
      baz: 'test baz'
    } ]
  }

  render: () => { }
}
