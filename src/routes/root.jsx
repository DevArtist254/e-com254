import React from 'react'
import { Outlet, NavLink, useLoaderData, Form, useNavigation } from 'react-router-dom'
import { getContacts, createContact } from "../contact";

export async function loader() {
  const contacts = await getContacts()

  return { contacts }
}

export async function action() {
  const contact = await createContact();

  return { contact }
}

function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();
  
  return (
    <>
        <div id='sidebar'>
        <h1>React Router Contacts</h1>
         <div>
          <form id='search-form' role="search">
           <input id='q' aria-label='Search contacts' placeholder='Search' type='search' name='q' />
           <div id='search-spinner' aria-hidden hidden={true} />
           <div className='sr-only' aria-live='polite'></div>
          </form>
          <Form method='post'>
           <button type='submit'>New</button>
          </Form>
         </div>
         <nav>
           {/* <ul>
            <li>
              <Link to={`/contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`/contacts/2`}>Your Friend</Link>
            </li>
           </ul> */}
           {contacts.length ? (
            <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
               <NavLink
                className={({isActive, isPending}) => {
                  // eslint-disable-next-line no-unused-expressions
                  isActive ? "active" : isPending ? "pending" : ""
                }}
                to={`contacts/${contact.id}`} >
                {contact.first || contact.last ? (
                  <>{contact.first} {contact.last}</>
                ) : (
                  <i>No name</i>
                )}
                {contact.favorite && <span>*</span>}
               </NavLink>
              </li>
            ))}
           </ul>
           ) : (
            <p>
              <i>No Contacts</i>
            </p>
           )}
           
         </nav>
        </div>
        <div id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        } 
        >
          <Outlet />
        </div>
    </>
  )
}

export default Root