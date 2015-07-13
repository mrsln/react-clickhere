// A simple React component for helping to attract attention by drawing
// a pulsing circle on the children. It can be used for teaching users
// how to use your app.
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class ClickHere extends React.Component {

  static propsTypes = {
    // smallest radius of the circle
    min: React.PropTypes.number,

    // biggest radius of the circle
    max: React.PropTypes.number,

    // whether to show the circle
    show: React.PropTypes.bool,

    // callback on click on the children
    onClick: React.PropTypes.func,
  }

  static defaultProps = {
    min: 10,
    max: 40,
    show: true,
    onClick: function() {},
  }

  constructor(props) {
    super(props);

    this.state = {
      // current size of the circle
      size: this.props.min,

      // the state of the animation (shrinking or growing)
      direction: -1,
    };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.state.size >= this.props.max) {
        this.setState({direction: -1});
      } else if (this.state.size <= this.props.min) {
        this.setState({direction: 1});
      }
      let size = this.state.size + this.state.direction;
      this.setState({size});
    }, 20);
  }

  render() {
    let delta = Math.floor((this.props.max - this.state.size) / 2)-10;

    // TODO: color, width, left position could be in props
    let style = StyleSheet.create({
      pointer: {
        display: this.props.show ? 'block' : 'none',
        width: this.state.size,
        height: this.state.size,
        position: 'absolute',
        left: 20+delta,
        top: delta,
        border: '2px solid red',
        borderRadius: this.state.size,
      },
      wrapper: {
        display: 'inline-block',
        position: 'relative',
      }
    });

    return (
      <div style={style.wrapper} onClick={this.props.onClick}>
        <div style={style.pointer}/>
        {this.props.children}
      </div>
    );
  }

};
