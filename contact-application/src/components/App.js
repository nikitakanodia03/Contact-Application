import React , {useState , useEffect} from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import api from "../api/contacts"
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import { v4 as uuidv4 } from 'uuid'
uuidv4();

function App() {
  // const contacts = [
  //   {
  //     id : "1",
  //     name : "nikita",
  //     email : "nk1@gmail.com",
  //   },
  //   {
  //     id : "2", 
  //     name : "rohit",
  //     email : "rohit@gmail.com"
  //   },
  // ];


  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts , setContacts] = useState([]); 
  const [searchTerm , setSearchTerm] = useState("");
  const [searchResults , setSearchResults] = useState([]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== ""){
      const newContactList = contacts.filter( (contact) => {
        return Object.values(contact)
              .join(" ")
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  const retrieveContacts = () => {
    // const response = await api.get("/contacts");
    // return response;
    return contacts;
  };

  const updateContactHandler =  (contact) => {
    // const response = await api.put(`/contact/${contact.id}` , contact); 
    // const {id} = response.data;
    // setContacts( contacts.map( (contact) => {
    //   return contact.id===id ? {...response.data} : contact;
    // } ) );
    setContacts(contacts);
  };

  const addContactHandler =  (contact) => {
    // console.log(contact);
    // const request = { id : uuidv4() , ...contact} 
    // const response = await api.post("/contacts" , request)
    // setContacts([...contacts, response.data]);
    setContacts([...contacts, {id:uuidv4() , ...contact}]); //LOCAL STORAGE
  };

  const removeContactHandler =  (id) => {
    // await api.delete(`/contacts/${id}`); //WHEN USING API
    const newContactList = contacts.filter((contact)=>{
      return contact.id !== id;
    });
    setContacts(newContactList);
  }

  useEffect(()=>{
    const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)); 
    if (retrieveContacts) setContacts(retrieveContacts);
    // const getAllContacts = async () => {
    //   const allContacts = await retrieveContacts();
    //   if (allContacts) setContacts(allContacts);
    // };
    // getAllContacts();
  }, [] );

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY , JSON.stringify(contacts)); 
  }, [contacts]);

  return (
    <div className="ui container">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/add" 
              render={ (props) => 
                  <AddContact {...props} addContactHandler={addContactHandler}/>
              }
          />

          <Route path="/" 
              render={ (props) => 
                <ContactList
                  {...props}
                  contacts={ searchTerm.length < 1 ? contacts : searchResults}
                  getContactId={removeContactHandler} 
                  term = {searchTerm} 
                  searchKeyword = {searchHandler}
                  />
              }
          />

          <Route path="/contact/:id" component={<ContactDetail/>}/>

          <Route path="/edit" 
              render={ (props) => 
                  <EditContact {...props} updateContactHandler={updateContactHandler}/>
              }
          />

          {/* <Route path="/add" component={ () => {
                  <AddContact addContactHandler={addContactHandler}/>
              }}
          /> */}

          {/* <Route path="/" exact 
              component={ () => {
                  <ContactList 
                      contacts={contacts} 
                      getContactId={removeContactHandler}
                  />
              }} 
            /> */}
        </Routes>
      </BrowserRouter>
        
        {/* <Header />
        <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
    </div>
  );

}

export default App;
