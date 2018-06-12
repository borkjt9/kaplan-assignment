import React from 'react';

export const downArrowSrc = 'https://firebasestorage.googleapis.com/v0/b/kaplan-assignment.appspot.com/o/down-arrow.svg?alt=media&token=730f6ee2-1a50-4c95-bbcc-5bba3076ab68';
export const horArrowSrc = 'https://firebasestorage.googleapis.com/v0/b/kaplan-assignment.appspot.com/o/horizontal-arrows.svg?alt=media&token=c4ea3d7b-5327-429b-9909-3b26f946c24e';
export const upArrowSrc = 'https://firebasestorage.googleapis.com/v0/b/kaplan-assignment.appspot.com/o/up-arrow.svg?alt=media&token=981a6af0-f37d-44b8-aa11-e734a8c1bec6';
export const dragPreviewSrc1 = 'https://firebasestorage.googleapis.com/v0/b/kaplan-assignment.appspot.com/o/preview-img.svg?alt=media&token=dbb729b0-6697-4e68-9498-bbb7847bb029';
export const dragPreviewSrc2 = 'https://firebasestorage.googleapis.com/v0/b/kaplan-assignment.appspot.com/o/preview-img%402x.png?alt=media&token=955f3420-683f-4b03-a786-df6f4d7918c0';
export const dragPreviewSrc3 = 'https://firebasestorage.googleapis.com/v0/b/kaplan-assignment.appspot.com/o/preview-img%403x.png?alt=media&token=f27da915-ef99-4f76-b2c8-3f4bd5e83805'
const preloadIMGs = () => (
  <div style={{ display: 'None' }} className="image-loader">
    <img alt="blurred preview when you drag a answer across screen" src={dragPreviewSrc1} />
    <img alt="horizontal arrows" src={horArrowSrc} />
    <img alt="down arrow"src={downArrowSrc} />
    <img alt="up arrow" src={upArrowSrc} />
  </div>
);

export default preloadIMGs;
