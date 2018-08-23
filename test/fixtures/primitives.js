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
