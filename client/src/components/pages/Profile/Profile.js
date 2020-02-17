import React from 'react';
import Moment from 'react-moment';
import SnapListProfile from './SnapListProfile';

import auth from '../../auth';

const Profile = ( { session } ) => (
     <div>
        <h3>Profile</h3>
         <div>
             <Moment date={session.activeUser.createdAt} format = "YYYY/MM/DD" />
         </div>

         <strong>
             @{session.activeUser.username}
         </strong>

         <SnapListProfile session={session}/>

    </div>
);

export default auth(session => session && session.activeUser )(Profile);