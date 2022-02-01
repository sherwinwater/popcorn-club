import React, { useEffect } from 'react';
import Card from '../CardRow/Card';
import styles from './CardGrid.module.css';

const CardGrid = ({
  group,
  // selectedItem,
  order,
  isAscend,
  data,
  isFetching,
  isError,
}) => {
  // isAscend
  // title: true,
  // releaseDate: false,
  // rating: false,
  const { title, releaseDate, rating } = isAscend;

  let targetData;
  if (group === 'tvseasons' || group === 'search' || group === 'searchTV') {
    targetData = data;
  } else {
    const sortedData = data?.sort((a, b) => {
      let targetDataA;
      let targetDataB;

      if (order === 'Title') {
        targetDataA = a.original_title ? a.original_title : a.original_name;
        targetDataB = b.original_title ? b.original_title : b.original_name;

        if (title) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }

      if (order === 'Release Date') {
        targetDataA = a.release_date ? a.release_date : a.first_air_date;
        targetDataB = b.release_date ? b.release_date : b.first_air_date;

        if (releaseDate) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }

      if (order === 'Rating') {
        targetDataA = a.vote_average;
        targetDataB = b.vote_average;

        if (rating) {
          return targetDataA < targetDataB ? -1 : 1;
        } else {
          return targetDataA < targetDataB ? 1 : -1;
        }
      }
    });

    targetData = sortedData;
  }
  // useEffect(() => {

  // }, [group, selectedItem, isAscend]);

  const renderShows = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No data.</p>;
    }

    return targetData?.map((item, i) => {
      return (
        <div key={i} className={styles.grid}>
          <Card group={group} data={item} cname="grid" />
        </div>
      );
    });
  };

  return renderShows();
};

export default CardGrid;
