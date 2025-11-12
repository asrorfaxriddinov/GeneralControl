import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path, Circle as SvgCircle } from 'react-native-svg';

// SvgCircle ni animatsiyalash uchun kerak
const AnimatedSvgCircle = Animated.createAnimatedComponent(SvgCircle);

interface FlowLineProps {
  length?: number;
  bendPoint?: number;
  color?: string;
  style?: any;
}

const FlowLine: React.FC<FlowLineProps> = ({
  length = 300,
  bendPoint = 200,
  color = '#6EC207',
  style,
}) => {
  const bend = Math.min(bendPoint, length);
  const tail = length - bend;
  const totalLength = bend + tail;

  const anim = useRef(new Animated.Value(0)).current;

  const cx = useRef(new Animated.Value(0)).current;
  const cy = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animatsiyani boshlash
    Animated.loop(
      Animated.timing(anim, {
        toValue: totalLength,
        duration: 2000,
        useNativeDriver: false, // SVG bilan ishlashda true bo'lmaydi
      })
    ).start();

    const listenerId = anim.addListener(({ value }) => {
      if (value <= bend) {
        cx.setValue(value);
        cy.setValue(0);
      } else {
        cx.setValue(bend);
        cy.setValue(value - bend);
      }
    });

    return () => {
      anim.removeListener(listenerId);
    };
  }, [anim, bend, tail]);
return (
  <Svg
    height={tail + 20} // oldin tail + 30 edi, lekin bu yetarli bo‘lmaydi har doim
    width={bend + 20}
    style={[{ position: 'absolute' }, style]}
  >
    {/* L-shaklidagi chiziq */}
    <Path
      d={`M10,10 H${bend + 10} V${tail + 10}`}
      stroke={color}
      strokeWidth={4}
      strokeDasharray="10,5"
      fill="none"
    />

    {/* Oqim animatsiyalangan nuqtasi */}
    <AnimatedSvgCircle
      cx={Animated.add(cx, new Animated.Value(10))}
      cy={Animated.add(cy, new Animated.Value(10))}
      r="6"
      fill={color}
    />
  </Svg>
);

};

export default FlowLine;
