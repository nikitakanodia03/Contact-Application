import React , {useRef} from "react";
import {Link} from "react-router-dom"
import ContactCard from "./ContactCard";

const ContactList = (props) => {

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const inputEl = useRef("");
    
    // const contacts = [
    //     {
    //         id : "1",
    //         name : "nikita",
    //         email : "nk1@gmail.com",
    //     },
    // ];

    // const renderContactList = contacts.map((contact)=>{
    //     return (
    //         <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} />
    //     );        
    // });
    
    const renderContactList = props.contacts.map((contact)=>{
        return (
            <ContactCard clickHandler={deleteContactHandler} contact={contact}></ContactCard>
        );
        
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }

    return (
        <div className="main">

            <h2>Contact List</h2>

            <Link to="/add">
                <button className="ui button blue right">Add Contact</button>
            </Link>

            <div className="ui search">
                <div className="ui icon input">
                    <input 
                        ref = {inputEl}
                        type="text" 
                        placeholder="Search Contacts" 
                        className="prompt" 
                        value={props.term} 
                        onChange={getSearchTerm} 
                    />

                    <i className="search icon" ></i>
                </div>
            </div>

            <div className="ui celled list"> {renderContactList.length > 0  ? renderContactList : "No contacts found"} </div>
        </div>
    );
};

export default ContactList;