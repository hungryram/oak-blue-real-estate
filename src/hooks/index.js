import { animateScroll as scroll } from "react-scroll"

const scrollTo = (id) => {
  console.log(id)
  if(document.getElementById(id)){
    scroll.scrollTo(document.getElementById(id).offsetHeight + 100, {
        duration: 400,
        smooth: true,
      })
  }
}

export { scrollTo }