export const sort = (contacts, fieldSortBy = 'last_name') => {
  return contacts?.sort((a, b) => {
    if (a[fieldSortBy] < b[fieldSortBy]) {
      return -1;
    }
    if (a[fieldSortBy] > b[fieldSortBy]) {
      return 1;
    }
    return 0;
  });
}

export const searchByName = (contacts, searchValue) => {
  return contacts?.filter((contact) => {
    const name = `${contact.first_name} ${contact.last_name}`;
    return name.toLowerCase().includes(searchValue.trim().toLowerCase());
  });
}
