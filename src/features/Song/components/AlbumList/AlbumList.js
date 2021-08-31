import PropTypes from 'prop-types';
import React from 'react';
import Album from '../Album/Album';

AlbumList.propTypes = {
   albumList: PropTypes.array.isRequired,
};

function AlbumList(props) {

   const {albumList} = props;

   var element = albumList.map(album => (
      <li key={album.id}><Album album={album}/></li>
   ))

   return (
      <div>
         <ul className="album-list" >
            {element}
         </ul>
      </div>
   );
}

export default AlbumList;