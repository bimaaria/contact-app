import Link from "next/link";

export function ContactTable({ contacts }: any) {
  return (
    <table className="border w-full">
      <thead>
        <tr>
          <th className="border border-black rounded-md">#</th>
          <th className="border border-black rounded-md">Name</th>
          <th className="border border-black rounded-md">Phone</th>
          <th className="border border-black rounded-md hidden md:table-cell">
            Email
          </th>
        </tr>
      </thead>
      <tbody>
        {contacts?.map((contact: any, index: any) => (
          <tr key={contact.id}>
            <td className="border border-black rounded-md px-2 py-1">
              {index + 1}
            </td>
            <td className="border border-black rounded-md px-2 py-1">
              <Link
                href={`/contacts/${contact.id}`}
                className="underline text-blue-600"
              >
                {contact.name}
              </Link>
            </td>
            <td className="border border-black rounded-md px-2 py-1 text-ellipsis overflow-hidden">
              {contact.phone}
            </td>
            <td className="border border-black rounded-md px-2 py-1 hidden md:table-cell">
              {contact.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
