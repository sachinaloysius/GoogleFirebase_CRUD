import React, { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc,updateDoc ,deleteDoc} from "firebase/firestore";
import { collection, addDoc , query, where, getDocs} from "firebase/firestore";  
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db,storage} from "./FirebaseConfig";
export default function UserPage() {
  const redirect = useNavigate();
  const [username, setUsername] = useState("");
  const[name,setName]=useState('')
  const[phonenumber,setPhonenumber]=useState('')
  const[email,setEmail]=useState('')
  const[userphoto,setUserPhoto]=useState('')
  const[userFeild,setUserFeild]=useState('')
  const[userFavColour,setUserFavColour]=useState('')
  const[listuserDetails,setListUserDetails]=useState([])
  const[ID,setID]=useState('')
 
 console.log(listuserDetails);
  
  

  useEffect(() => {
    getusername();
    getUserData()
  }, []);
  const logout = () => {
    sessionStorage.clear("uid");
    redirect("/");
  };

 

  const getusername = async () => {
    const docRef = doc(db, "user", "gsZGm95MpsVtjerCjjP2vvlhuw63");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUsername(docSnap.data().email);
    } else {
      console.log("No such document!");
    }
  };

  const postuserData = async () => {
    if(ID===''){
        const metadata = {
      contentType: 'image/jpg'
    };
    const storageRef = ref(storage, 'images/' + userphoto.name);
    const uploadTask = uploadBytesResumable(storageRef, userphoto, metadata);

    const url= await getDownloadURL(storageRef)
  
    const docRef = await addDoc(collection(db, "UserDetails"), {
      name: name,
      phonenumber: phonenumber,
      email: email,
      userFeild: userFeild,
      userFavColour: userFavColour,
      userphoto:url
    });
    getUserData()
    alert('Data Saved');
  } else{
    try {
      const userRef = doc(db, 'UserDetails', ID);
      // Prepare the updated data
      const updatedData = {
        name: name,
        phonenumber: phonenumber,
        email: email,
      };
  
      // Update the document in Firestore
      await updateDoc(userRef, updatedData);
      
      alert('Data Updated Successfully');
      getUserData()
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }
    }
  
  const getUserData = async () => {
    const Quee = query(collection(db, "UserDetails")); // Close parentheses for query function call
    const querySnapshot = await getDocs(Quee);
    const ToStore = [];
    querySnapshot.forEach((doc) => {
      ToStore.push({ id: doc.id, data: doc.data() }); // Push an object containing id and data into nhffh array
    });
    setListUserDetails(ToStore)
  };


  const UpdateUserState=async(id)=>{
    setID(id)
    const docRef = doc(db, "UserDetails",id)
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setName(docSnap.data().name);
      setPhonenumber(docSnap.data().phonenumber)
      setEmail(docSnap.data().email)
      setUserFeild(docSnap.data().userFeild)
      setUserFavColour(docSnap.data().userFavColour)
    } else {
      console.log("No such document!");
    }
  };
     
  const DeleteUserData=async(id)=>{
    await deleteDoc(doc(db, "UserDetails",id));
    getUserData()
  }
  
 
  

  return (
    <>
      <div >Hello {username}
         <br />
      <button onClick={logout}>Log Out</button>
     
      <div className="Edit Item" style={{display:"flex",flexDirection:'column'}}>
        <input type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)} value={name}/>
        
        <input type="text"  placeholder="Enter Phone Number" onChange={(e)=>setPhonenumber(e.target.value)} value={phonenumber}/>
        <input type="text"  placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input type="file" onChange={(e)=>setUserPhoto(e.target.files[0])} />
        <div>
          <input type="radio"  value='IT'  onChange={(e)=>setUserFeild(e.target.value)}/>IT
          <input type="radio" value='Commerce'  onChange={(e)=>setUserFeild(e.target.value)}/>Commerce
          <input type="radio"  value='Science' onChange={(e)=>setUserFeild(e.target.value)}/>Science
        </div>
        <div>
          <select name="" id="" onChange={(e)=>setUserFavColour(e.target.value)}> 
          <option value="">Select Your Fav Colour</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
          </select>
        </div>
        <div><button onClick={postuserData}>Submit</button> <button>Reset</button></div>
      </div>
      <div style={{marginTop:'50px'}}>
        <table style={{border:'1px solid'}}>
          <tr>
            <td style={{border:'1px solid'}}>srlno</td>
            <td style={{border:'1px solid'}}>User Name</td>
            <td style={{border:'1px solid'}}>User Phonenumber</td>
            <td style={{border:'1px solid'}}>User Email</td>
            <td style={{border:'1px solid'}}>User Photo</td>
            <td style={{border:'1px solid'}}>User Background</td>
            <td style={{border:'1px solid'}}>User Fav Colour</td>
            <td style={{border:'1px solid'}}>Actions</td>
            <td style={{border:'1px solid'}}>Actions</td>
          </tr>
          {listuserDetails.map((row,key)=>(
          <tr>
            <td style={{border:'1px soild'}}>{key+1}</td>
            <td style={{border:'1px soild'}}>{row.data.name}</td>
            <td style={{border:'1px soild'}}>{row.data.phonenumber}</td>
            <td style={{border:'1px soild'}}>{row.data.email}</td>
            <td style={{border:'1px soild'}}><img src={row.data.userphoto} width='100px' /> </td>
            <td style={{border:'1px soild'}}>{row.data.userFeild}</td>
            <td style={{border:'1px soild'}}>{row.data.userFavColour}</td>
            <td> <button onClick={()=>UpdateUserState(row.id)}>Edit</button></td>
            <td> <button onClick={()=>DeleteUserData(row.id)}>Delete</button></td>
          </tr> 
        ))}
        </table>
      </div>
      </div>
   
    </>
  );
}
