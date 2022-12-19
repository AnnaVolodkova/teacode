import { useState, useMemo } from 'react';
import { Spinner, Table } from 'evergreen-ui';

import useDebounce from "hooks/useDebounce";
import usePagination from "hooks/usePagination";
import useItemsWithSelectValue from "hooks/useItemsWithSelectValue";

import useContacts from 'resources/contact/hooks/useContacts';

import * as contactHelpers from 'resources/contact/contact.helpers';

import Contact from './Contact';

import styles from './styles.module.css';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');

  const { isLoading: isFetchedContactsLoading, data: fetchedContacts } = useContacts();

  const {
    itemsWithSelectValue: contactsWithSelectValue,
    handleItemSelectDeselect: handleContactSelectDeselect,
  } = useItemsWithSelectValue({
    items: fetchedContacts,
    allSelectedByDefault: false,
  })

  const selectedContactIds = contactsWithSelectValue?.filter((c) => !!c.isSelected).map((c) => c.id);

  const handleContactClick = (contact) => {
    handleContactSelectDeselect(contact);
    console.log('IDs of selected contacts', [...selectedContactIds, contact.id]);
  };

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const contactsToDisplay = useMemo(() => {
    if (debouncedSearchValue) {
      return contactHelpers.searchByName(contactsWithSelectValue, debouncedSearchValue);
    }

    return contactsWithSelectValue;
  }, [contactsWithSelectValue, debouncedSearchValue]);

  const { pageData: contactsPerPage, Pagination } = usePagination({
    perPage: 5,
    data: contactsToDisplay,
  });

  if (isFetchedContactsLoading) {
    return null;
  }

  return (
    <div>
      <header>Contacts</header>

      <main className={styles.content}>
        {isFetchedContactsLoading ? (
          <Spinner />
        ) : (
          <>
            <Table overflowY="auto">
              <Table.Head>
                <Table.SearchHeaderCell
                  value={searchValue}
                  onChange={setSearchValue}
                />
              </Table.Head>
              <Table.Body>
                {contactsPerPage?.length ? contactsPerPage.map((contact) => (
                  <Contact
                    key={contact.id}
                    contact={contact}
                    onClick={() => handleContactClick(contact)}
                  />
                )) : (
                  <Table.Row>
                    <Table.TextCell>
                      No contacts found
                    </Table.TextCell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
            {Pagination && <Pagination />}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
