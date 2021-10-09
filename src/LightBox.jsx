import React from 'react';
import styled from 'styled-components';

function LightBox({
  isLightBoxOpen,
  setIsLightBoxOpen,
  photoList,
  displayPhotoData,
  nextPhoto,
  prevPhoto,
}) {
  return (
    <LightBoxMask>
      <PhotoInfoWrap>
        <h3>
          <span>{photoList.indexOf(displayPhotoData) + 1}</span>/
          {photoList.length}
        </h3>
        <div>
          <p>{displayPhotoData.alt_description}</p>
          <span>—</span>
          <a
            href={displayPhotoData.user?.links?.html}
            target="_blank"
            rel="noreferrer"
          >
            {displayPhotoData.user?.username}
          </a>
        </div>
      </PhotoInfoWrap>
      <PhotoBox>
        <a href={displayPhotoData.links?.html} target="_blank" rel="noreferrer">
          <img
            src={displayPhotoData?.urls?.regular}
            alt={displayPhotoData.alt_description}
          />
        </a>
        <CloseBtn onClick={() => setIsLightBoxOpen(!isLightBoxOpen)}>
          &#10005;
        </CloseBtn>
        <LeftBtn onClick={prevPhoto}>&#8592;</LeftBtn>
        <RightBtn onClick={nextPhoto}>&#8594;</RightBtn>
      </PhotoBox>
    </LightBoxMask>
  );
}

export default LightBox;

const LightBoxMask = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 6rem 0;
  overflow-y: scroll;
`;

const PhotoInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24rem;
  margin-right: 4rem;
  color: #fff;

  h3 {
    font-size: 3.6rem;
  }

  h3 span {
    font-size: 7.2rem;
  }

  p {
    font-size: 2.4rem;
    margin-bottom: 2.4rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: 1.6rem;
    font-style: italic;
  }
`;

const PhotoBox = styled.div`
  position: relative;
  width: auto;
  height: 100%;
  border: 1.5rem solid #fff;
  border-radius: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background-color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.6rem;
  text-align: center;
  cursor: pointer;
  z-index: 10;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
    font-size: 2.8rem;
  }
`;

const LeftBtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 4.8rem;
  height: 100%;
  font-size: 5rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const RightBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 4.8rem;
  height: 100%;
  font-size: 5rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;