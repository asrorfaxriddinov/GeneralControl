import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path, Circle as SvgCircle } from 'react-native-svg';

const AnimatedSvgCircle = Animated.createAnimatedComponent(SvgCircle);

interface FlowLine3Props {
  v1?: number; // birinchi vertikal uzunlik
  h?: number;  // gorizontal uzunlik
  v2?: number; // ikkinchi vertikal uzunlik
  color?: string;
  style?: any;
}

const FlowLine3: React.FC<FlowLine3Props> = ({
  v1 = 200,
  h = 300,
  v2 = 100,
  color = '#6EC207',
  style,
}) => {
  const totalLength = v1 + h + v2;

  const anim = useRef(new Animated.Value(0)).current;
  const cx = useRef(new Animated.Value(0)).current;
  const cy = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: totalLength,
        duration: 3000,
        useNativeDriver: false,
      })
    ).start();

    const listenerId = anim.addListener(({ value }) => {
      if (value <= v1) {
        cx.setValue(10);
        cy.setValue(value + 10);
      } else if (value <= v1 + h) {
        cx.setValue((value - v1) + 10);
        cy.setValue(v1 + 10);
      } else {
        cx.setValue(h + 10);
        cy.setValue((value - v1 - h) + v1 + 10);
      }
    });

    return () => {
      anim.removeListener(listenerId);
    };
  }, [anim, v1, h, v2]);

  return (
    <Svg
      height={v1 + v2 + 40}
      width={h + 40}
      style={[{ position: 'absolute' }, style]}
    >
      {/* 3-burilishli chiziq */}
      <Path
        d={`M10,10 V${v1 + 10} H${h + 10} V${v1 + v2 + 10}`}
        stroke={color}
        strokeWidth={4}
        strokeDasharray="10,5"
        fill="none"
      />
      <AnimatedSvgCircle
        cx={cx}
        cy={cy}
        r="6"
        fill={color}
      />
    </Svg>
  );
};

export default FlowLine3;
