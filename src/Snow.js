import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { oneOf, shape, string } from 'prop-types';
import { lightSnowflakes, mediumSnowflakes } from '../config/snowflakeStrategies';
import Snowflake from './Snowflake';

const windowHeight = Dimensions.get('window').height + (Dimensions.get('window').height * .1);

export default class Snow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snowflakes: this.generateSnowflakes() || []
    }
  }

  generateSnowflakes() {
    let snowflakes = []
    for (let i = 0; i < 25; i++) {
      const size = Math.floor(Math.random() * (32 - 26 + 1)) + 26;
      let offset, fallDelay, shakeDelay, amplitude
      fallDelay = (Math.floor(Math.random() * 81 - 0 + 1) + 0) * 100;
      if (i % 2 === 0) {
        amplitude = Math.floor(Math.random() * 75 - 60 + 1) + 60;
        
      } else {
        amplitude = Math.floor(Math.random() * 90 - 75 + 1) + 75;
      }
      if (i % 3 === 0) {
        offset = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
        shakeDelay = Math.floor(Math.random() * 13) * 100;
      } else {
        if (i % 3 === 1) {
          offset = Math.floor(Math.random() * (12 - 5 + 1)) + 5;
          shakeDelay = (Math.floor(Math.random() * 27 - 14 + 1) + 14) * 100;
        } 
        else {
          offset = Math.floor(Math.random() * (18 - 6 + 1)) + 6;
          shakeDelay = (Math.floor(Math.random() * 41 - 28 + 1) + 28) * 100;
        }
      }
      if (offset < 10) {
        offset = '0' + offset;
      }

      const nextSnowflake = {
            glyph: '❆',
            size: size,
            offset: `${offset}%`,
            fallDelay: i === 0 ? i : fallDelay,
            shakeDelay: shakeDelay,
            amplitude: amplitude
      }
      snowflakes.push(nextSnowflake)
    }
    return snowflakes;
  }

  render() {
    const { snowfall, snowflakesStyle, fallTimeMax } = this.props;
    // const snowflakes = snowfall === 'medium' ? mediumSnowflakes : lightSnowflakes;
    const snowflakes = this.state.snowflakes;

    return (
      <View style={styles.view} pointerEvents="none">
        {
          snowflakes.map((snowflake, i) => {
            const { glyph, size, offset, fallDelay, shakeDelay, amplitude } = snowflake;
            return (
              <Snowflake
                key={`snowflake-${i}`}
                glyph={glyph}
                size={size}
                offset={offset}
                fallDelay={fallDelay}
                shakeDelay={shakeDelay}
                style={snowflakesStyle}
                fallTimeMax={fallTimeMax || 0}
                amplitude={amplitude || 60}
              />
            );
          })
        }
      </View>
    );
  }
}

Snow.propTypes = {
  snowfall: oneOf(['light', 'medium']),
  snowflakesStyle: shape({
    color: string,
  }),
};

Snow.defaultProps = {
  snowfall: 'light',
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    zIndex: 9999,
    elevation: 9999,
    position: 'absolute',
    top: 0,
    left: -30,
    width: Dimensions.get('window').width + 30,
    height: windowHeight,
    backgroundColor: 'transparent'
  }
});
