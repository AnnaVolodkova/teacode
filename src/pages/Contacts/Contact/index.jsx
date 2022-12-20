import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Table, Checkbox } from 'evergreen-ui';

import styles from './styles.module.css';

const Contact = ({ contact, onClick }) => {
  return (
    <Table.Row
      isSelectable
      onSelect={onClick}
    >
      <Table.Cell className={styles.row}>
        <Avatar
          src={contact.avatar}
          name={`${contact.first_name} ${contact.last_name}`}
        />
        <span>
          {`${contact.first_name} ${contact.last_name}`}
        </span>
        <Checkbox checked={contact.isSelected} disabled />
      </Table.Cell>
    </Table.Row>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    avatar: PropTypes.string,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(Contact);
