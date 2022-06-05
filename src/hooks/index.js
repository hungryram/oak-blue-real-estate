import * as React from 'react'
import { animateScroll as scroll } from "react-scroll"
import { window, document } from 'browser-monads'

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

export { scrollTo, useOnClickOutside, useWindowHeight, useWindowWidth }