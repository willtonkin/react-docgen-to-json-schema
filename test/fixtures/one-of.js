import { Component } from 'react'
import PropTypes from 'prop-types'

export default class MyComponent extends Component {
  static propTypes = {
    /**
     * Description foo.
     */
    foo: PropTypes.oneOf([
      'red',
      "blue", // eslint-disable-line
      'green'
    ])
  }

  static defaultProps = {
    foo: 'red'
  }

  render: () => { }
}
