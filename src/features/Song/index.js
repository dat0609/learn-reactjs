import React from 'react';
import AlbumList from './components/AlbumList/AlbumList';


function AlbumFeature(props) {

   const albumList = [
      {
         id: 1,
         name: 'Album 123',
         thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/b/2/4/fb24f30cf3d268bff56ff3a0d22677c5.jpg'
            
      },
      {
         id: 2,
         name: 'Album 900',
         thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/b/2/4/fb24f30cf3d268bff56ff3a0d22677c5.jpg'
            
      },
      {
         id: 3,
         name: 'Album 999',
         thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/f/b/2/4/fb24f30cf3d268bff56ff3a0d22677c5.jpg'
            
      }
   ]

   return (
      <div>
         <h2>You might like</h2>
         <AlbumList albumList={albumList}></AlbumList>
      </div>
   );
}

export default AlbumFeature;