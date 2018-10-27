import { Component } from 'react'
import PropTypes from 'prop-types'

export default class MyComponent extends Component {
  static propTypes = {
    /**
     * Description foo.
     */
    foo: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ one: PropTypes.number, two: PropTypes.string })
    ])
  }

  static defaultProps = {
    foo: ['test']
  }

  render: () => { }
}
