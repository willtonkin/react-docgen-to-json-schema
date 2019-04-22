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
    ]),

    /**
     * Description bar.
     */
    bar: PropTypes.oneOf([
      'green',
      42,
      null
    ])
  }

  static defaultProps = {
    foo: 'red'
  }

  render: () => { }
}
