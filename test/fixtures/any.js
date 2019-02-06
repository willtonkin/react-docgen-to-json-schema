import { Component } from 'react'
import PropTypes from 'prop-types'

export default class MyComponent extends Component {
  static propTypes = {
    /**
     * Description foo.
     */
    foo: PropTypes.any
  }

  static defaultProps = {
    foo: 'test'
  }

  render: () => { }
}
