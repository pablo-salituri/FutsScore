import { firebaseApp } from "../Components/Firebase/credentials";
import {getFirestore, doc, updateDoc} from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

export default function updatePrices(originalArray, action, percentage) {
  
    
    // Por facilidad, la DB tiene los precios en String, asi que hay que parsearlos antes y después de modificarlos
    function arrayParser(array, output) {
        return array.map(elem => ({
            ...elem,
            data: {
                ...elem.data,
                Price: output === 'toNumber' ? parseFloat(elem.data.Price) : elem.data.Price.toString(),
            },
        }))
    }

    //Redondear al múltiplo de 100 superior
    function roundToNearest100(num) {
        return Math.ceil(num / 100) * 100;
    }
    
    // Aumentar o reducir los precios en el arreglo según el porcentaje dado
    function adjustPrices(arr, action, percentage) {
        if (action !== 'Aumentar' && action !== 'Reducir') {
            console.error("La acción debe ser 'Aumentar' o 'Reducir'.");
            return;
        }
    
        arr.forEach(item => {
            if (action === 'Aumentar') {
                item.data.Price += item.data.Price * percentage / 100;
            } else if (action === 'Reducir') {
                item.data.Price -= item.data.Price * percentage / 100;
            }
            item.data.Price = roundToNearest100(item.data.Price);
        });
    
        return arr;
    }

    const newNumberArray = arrayParser(originalArray, 'toNumber')
    const adjustedArray = adjustPrices(newNumberArray, action, percentage)
    const newStringArray = arrayParser(adjustedArray, 'toString')

    newStringArray.map((elem, index) => {
        const uid = elem.id
        const newPrice = elem.data.Price
        const docRef = doc(firestore, "Cards", uid);
        updateDoc(docRef, {Price:newPrice})
            .then(() => {
                console.log(`${index+1} Updated In Firestore`);
            })
            .catch((/* error */) => {
                console.log(`Error in uid ${uid}`);
            });
    })

}