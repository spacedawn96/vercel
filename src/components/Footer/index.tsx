import React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';

const FooterTap = styled.div`
  .body {
    background-color: #fff;
    margin: 0;
  }
  .patterns {
    height: 20rem;
    ${media.custom(1000)} {
      height: 15rem;
    }
    ${media.custom(450)} {
      height: 10rem;
    }
  }
  svg text {
    font-family: Lora;
    letter-spacing: 10px;
    stroke: #ffa5d8;
    font-size: 150px;
    font-weight: 700;
    stroke-width: 3;
    animation: textAnimate 5s infinite alternate;
    ${media.custom(1000)} {
      font-size: 100px;
    }
    ${media.custom(700)} {
      font-size: 80px;
    }
    ${media.custom(550)} {
      font-size: 60px;
    }
    ${media.custom(450)} {
      font-size: 50px;
    }
    ${media.custom(450)} {
      font-size: 40px;
    }
  }
  @keyframes textAnimate {
    0% {
      stroke-dasharray: 0 50%;
      stroke-dashoffset: 20%;
      fill: hsl(189, 68%, 75%);
    }
    100% {
      stroke-dasharray: 50% 0;
      stroke-dashoffstet: -20%;
      fill: hsla(189, 68%, 75%, 0%);
    }
  }
`;

export type FooterProps = {};

function Footer(props: FooterProps) {
  return (
    <FooterTap>
      <div className="body">
        <div className="patterns">
          <svg width="100%" height="100%">
            <defs>
              {/* <pattern
                id="polka-dots"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse">
                <circle fill="#be9ddf" cx="25" cy="25" r="3" />
              </pattern> */}
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"></rect>
            <text x="50%" y="70%" textAnchor="middle">
              WoongBlog
            </text>
          </svg>
        </div>
      </div>
    </FooterTap>
  );
}

export default Footer;
