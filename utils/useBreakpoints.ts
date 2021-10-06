import { useBreakpoints, breakpointsBootstrapV5 } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsBootstrapV5)
const isDesktop = breakpoints.greater('lg')
const isMobile = breakpoints.smaller('sm')
const isTablet = breakpoints.between('md', 'lg')

export default () => {
  return { breakpoints, isDesktop, isMobile, isTablet }
}
