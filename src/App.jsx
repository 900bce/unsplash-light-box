import React, { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import useFetch from './FetchData';
import LightBox from './LightBox';
import Pagination from './Pagination';
import { ActionTypes } from './action-types';

const initialState = {
  currentPage: 1,
  photoList: [],
  isLightBoxOpen: false,
  displayPhotoData: {},
};

function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SetCurrentPage:
      return { ...state, currentPage: action.page };
    case ActionTypes.SetPhotoList:
      return { ...state, photoList: action.payload };
    case ActionTypes.SetIsLightBoxOpen:
      return { ...state, isLightBoxOpen: action.payload };
    case ActionTypes.SetDisplayPhotoData:
      return {
        ...state,
        displayPhotoData: state.photoList
          ? state.photoList[action.payload]
          : {},
      };
    default:
      break;
  }
}

function UnsplashLightBox() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clientId = process.env.REACT_APP_UNSPLASH_CLIENT_ID;
  const apiUrl = `https://api.unsplash.com/photos?client_id=${clientId}&page=${state.currentPage}&per_page=9`;
  const apiResponse = useFetch({ apiUrl });

  useEffect(() => {
    dispatch({ type: ActionTypes.SetPhotoList, payload: apiResponse });
  }, [apiResponse]);

  const onPhotoClick = (index) => {
    dispatch({ type: ActionTypes.SetDisplayPhotoData, payload: index });
    dispatch({
      type: ActionTypes.SetIsLightBoxOpen,
      payload: true,
    });
  };

  const pagecChange = (page) => {
    dispatch({ type: ActionTypes.SetCurrentPage, page });
  };

  const nextPhoto = () => {
    if (!state.displayPhotoData || !state.photoList) {
      return;
    }
    const current = state.photoList.indexOf(state.displayPhotoData);
    if (current === state.photoList.length - 1) {
      dispatch({ type: ActionTypes.SetDisplayPhotoData, payload: 0 });
      return;
    }
    dispatch({ type: ActionTypes.SetDisplayPhotoData, payload: current + 1 });
  };

  const prevPhoto = () => {
    if (!state.displayPhotoData || !state.photoList) {
      return;
    }
    const current = state.photoList.indexOf(state.displayPhotoData);
    if (current === 0) {
      dispatch({
        type: ActionTypes.SetDisplayPhotoData,
        payload: state.photoList.length - 1,
      });
      return;
    }
    dispatch({
      type: ActionTypes.SetDisplayPhotoData,
      payload: current - 1,
    });
  };

  return (
    <>
      <Container>
        <Title>
          Unsplash
          <br /> latest photos
        </Title>
        <div>
          <PicturesContainer>
            {state.photoList &&
              state.photoList.map((data, index) => (
                <PictureBox key={data.id} onClick={() => onPhotoClick(index)}>
                  <img src={data?.urls?.thumb} alt={data.alt_description} />
                </PictureBox>
              ))}
          </PicturesContainer>
          <Pagination
            currentPage={state.currentPage}
            pagecChange={pagecChange}></Pagination>
        </div>
      </Container>
      {state.isLightBoxOpen && (
        <LightBox
          isLightBoxOpen={state.isLightBoxOpen}
          setIsLightBoxOpen={() =>
            dispatch({
              type: ActionTypes.SetIsLightBoxOpen,
              payload: !state.isLightBoxOpen,
            })
          }
          photoList={state.photoList || []}
          displayPhotoData={state.displayPhotoData || {}}
          nextPhoto={nextPhoto}
          prevPhoto={prevPhoto}
        />
      )}
    </>
  );
}

export default UnsplashLightBox;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 13rem 7rem 13rem 8.5rem;
`;

const Title = styled.div`
  position: relative;
  font-size: 7.2rem;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  text-decoration: underline;
  writing-mode: vertical-rl;
  margin-right: 10rem;
  text-transform: uppercase;

  &::before {
    position: absolute;
    top: -13rem;
    left: 0;
    content: '';
    width: 90%;
    height: 1.6rem;
    background-color: #000;
  }
`;

const PicturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 85.5rem;
  height: 85.5rem;
`;

const PictureBox = styled.div`
  margin: 1.5rem;
  width: 25.5rem;
  height: 25.5rem;
  transition: 0.3s;

  &:hover {
    transform: translate(-0.5rem, -0.5rem);
    box-shadow: 1.5rem 1.5rem 0 #000;
    cursor: zoom-in;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
