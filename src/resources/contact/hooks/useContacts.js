import { useQuery } from 'react-query';

import { sort } from '../contact.helpers';

const CONTACTS_URL = 'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json';

const getContacts = async () => {
  const response = await fetch(CONTACTS_URL);

  const contacts = JSON.parse(await response.text());

  return sort(contacts);
};

export default function useContacts(queryOptions) {
  return useQuery('contacts', getContacts, queryOptions);
}
