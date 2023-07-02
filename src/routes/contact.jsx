import { Form, useLoaderData } from "react-router-dom";
import { getContact  } from "../contact";

export async function loader({params}) {
  const contact = await getContact(params.contactId)   

  return { contact }
}

function Contact() {
    //state
    //Design 1
//   const contact = {
//     first: "Your",
//     last: "Name",
//     avatar: "https://placekitten.com/g/200/200",
//     twitter: "your_handle",
//     notes: "Some notes",
//     favorite: true
//   }

    //Design 2
    const { contact } = useLoaderData()

  function onsubmit(event) {
     event.preventDefault();
  }

  return (
    <div id="contact">
     <div>
      <img key={contact.avatar} src={ contact.avatar || null} alt="pic" />
     </div>
     <div>
      <h1>
        {
         contact.first || contact.last ? (
          <>{contact.first} {contact.last}</>
         ) : (
          <i>No Name</i>
         )
        }
        <Favorite contact={contact} />
      </h1>
      {contact.twitter && (
        <p>
            <a href={`https://twitter.com/${contact.twitter}` }>{contact.twitter}</a>
        </p>
      )}
      {contact.notes && <p>{contact.notes}</p>}
      <div>
        <Form action="edit" >
            <button type="submit">Edit</button>
        </Form>
        <Form onSubmit={onsubmit} action="destory" method="post">
            <button type="submit">Delete</button>
        </Form>
      </div>
     </div>
    </div>
  )
}

function Favorite({ contact }) {
    let favorite = contact.favorite;

    return(
        <Form method="post">
            <button name="favorite" value={favorite ? "false" : "true"} aria-label={favorite ? "Remove from fav" : "Add to fav"} >
                {favorite ? "x" : "*"}
            </button>
        </Form>
    )
}

export default Contact