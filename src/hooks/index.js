import * as React from 'react'
import { animateScroll as scroll } from "react-scroll"
import { window, document } from 'browser-monads'

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

const useWindowWidth = () => {
  const [ width, setWidth ] = React.useState(0)    
  React.useLayoutEffect(() => {
      const updateWidth = () => {
          setWidth(window.innerWidth)
      }
      window.addEventListener('resize', updateWidth)
      updateWidth()
      return () => window.removeEventListener('resize', updateWidth)
  }, []);
  return width;
};

const useWindowHeight = () => {
  const [ height, setHeight ] = React.useState(0)    
  React.useLayoutEffect(() => {
      const updateHeight = () => {
          setHeight(window.innerHeight)
      }
      window.addEventListener('resize', updateHeight)
      updateHeight()
      return () => window.removeEventListener('resize', updateHeight)
  }, []);
  return height;
};

const scrollTo = (id, position) => {
  if(document.getElementById(id)){
    scroll.scrollTo(document.getElementById(id).offsetHeight + position, {
        duration: 400,
        smooth: true,
      })
  }
}

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  },
  [ref, handler],
  );
};

export { scrollTo, useOnClickOutside, useWindowHeight, useWindowWidth, disableScroll, enableScroll }