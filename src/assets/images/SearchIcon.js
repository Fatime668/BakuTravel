import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgSearchIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 23 24"
    {...props}>
    <Path
    //   stroke="#494949"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m22 22.5-5.075-5.075m2.742-6.592a9.333 9.333 0 1 1-18.667 0 9.333 9.333 0 0 1 18.667 0Z"
    />
  </Svg>
);
export default SvgSearchIcon;
