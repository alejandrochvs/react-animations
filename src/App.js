import React from 'react';
import {useSpring, animated, interpolate} from 'react-spring';
import {useGesture} from 'react-with-gesture';

// import {Motion, spring} from 'react-motion';

import './App.scss';

function App({children}) {
  const [bind, {delta, down}] = useGesture();
  const {x, bg, size} = useSpring({
    x: down ? delta[0] : 0,
    bg: `linear-gradient(120deg, ${delta[0] < 0 ? '#f093fb 0%, #f5576c' : '#96fbc4 0%, #f9f586'} 100%)`,
    size: down ? 1.1 : 1,
    immediate: name => down && name === 'x'
  });
  const avSize = x.interpolate({
    map: Math.abs, range: [50, 300],
    output: ['scale(0.5)', 'scale(1)'],
    extrapolate: 'clamp'
  });

  return (
    <div className="app">
      <section>
        <animated.div {...bind()} className="item" style={{background: bg}}>
          <animated.div className="av" style={{transform: avSize, justifySelf: delta[0] < 0 ? 'end' : 'start'}}/>
          <animated.div
            className="fg"
            style={{transform: interpolate([x, size], (x, s) => `translate3d(${x}px,0,0) scale(${s})`)}}>
            <a href="https://www.react-spring.io/docs/hooks/basics" target="_blank">React-spring</a>
          </animated.div>
        </animated.div>
      </section>
      <section>
        {/*<Motion defaultStyle={{x: 0}} style={{x: spring(10)}}>
          {value => <div>{value.x}</div>}
        </Motion>*/}
      </section>
      <section></section>
    </div>
  );
}

export default App;
