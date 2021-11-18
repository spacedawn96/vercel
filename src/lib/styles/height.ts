export const customHeigtMediaQuery = (maxHeigt: number) =>
  `@media (max-height: ${maxHeigt}px)`;

export const breakpoints = {
  xlarge: '1200px',
  large: '1024px',
  medium: '768px',
  small: '576px',
};

const heightMedia = {
  custom: customHeigtMediaQuery,
  desktop: customHeigtMediaQuery(922),
  tablet: customHeigtMediaQuery(768),
  phone: customHeigtMediaQuery(576),
};

export default heightMedia;
