import firebase from "./firebase";
import { useCollectionData, useCollection } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";


export function Admin() {
    const firestore = firebase.firestore();

    const auth = firebase.auth();

    const vehilcesRef = firestore.collection('vehicles');
    const query = vehilcesRef.limit(25);
    const [vehicles] = useCollection(query, {idField: 'id'});

    const testRef = doc(firestore, "vehicles", "scooter");

    //const { uid } = auth.currentUser;
    const changePrice = async (e) => {
        /*e.preventDefault();

        await vehilcesRef.add({
          type: "testtype",
          price: 10,
        })*/
        await updateDoc(testRef, {
            price: 17
          });
      }
    return(
        <div>
            admin
            {vehicles && vehicles.docs.map(v => <div key={v.id}>{v.id} {v.data().price} </div>)}
            <button onClick={changePrice}> change price</button>
        </div>
    )
}