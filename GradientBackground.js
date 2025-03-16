import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

const GradientBackground = () => (
  <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
    <Defs>
      <LinearGradient id="gradient" x1="100%" y1="100%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#6fc3f7" />
        <Stop offset="100%" stopColor="#c2fdff" />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
  </Svg>
);

export default GradientBackground;
