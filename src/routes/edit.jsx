import { Form, useLoaderData, redirect } from "react-router-dom"
import { updateContact } from "../contact";

export async function action({params, request}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData)
    await updateContact(params.contactId, updates)

    return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
    const { contact } = useLoaderData()

  return (
    <Form method="post" id="contact-form">
        <p>
            <span>Name</span>
            <input placeholder="first" aria-label="first name" type='text' name="first" defaultValue={contact.first} />
            <input placeholder="last" aria-label="last name" type='text' name="last" defaultValue={contact.last} />
        </p>
        <label>
            <span>Twitter</span>
            <input placeholder="@jack" type='text' name="twitter" defaultValue={contact.twitter} />
        </label>
        <label>
            <span>Avatar URL</span>
            <input placeholder="https://example.com/avatar.jpg" aria-label="Avatar URL" type='text' name="avatar" defaultValue={contact.avatar} />
        </label>
        <label>
            <span>Notes</span>
            <textarea rows={6} defaultValue={contact.notes} name="notes" />
        </label>
        <p>
            <button type="submit">Save</button>
            <button type="button">Cancel</button>
        </p>
    </Form>
  )
}
