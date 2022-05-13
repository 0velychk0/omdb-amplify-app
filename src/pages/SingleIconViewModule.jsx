import React from 'react';

const SingleIconViewModule = ({ info }) => (
  <div>
    {(() => {
      if (info.Poster != null && info.Poster.startsWith('http')) {
        return (
          <img
            key={info.imdbID}
            alt="poster"
            className="icon-image"
            src={info.Poster}
          />
        )
      } else {
        return (
          <>
            <li>Title: {info.Title}</li>
            <li>Year: {info.Year}</li>
            <li>Type: {info.Type}</li>
          </>
        )
      }
    })()}
  </div>
);

export default SingleIconViewModule;
