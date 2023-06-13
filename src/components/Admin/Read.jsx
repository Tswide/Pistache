import {db} from '../../Firebase'
import { ref, onValue} from "firebase/database";

const Read = () => {
    const starCountRef = set(ref(db, `menu/${titre}`));
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      updateStarCount(postElement, data);
    });

    return (
        <div>{data}</div>
    )
}

export default Read