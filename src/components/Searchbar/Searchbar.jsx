import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchBtn,
  SearchBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = e => {
    setSearchQuery(e.target.value);
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.warning("Whoops, can't be empty!");
    }

    onSubmit(searchQuery);

    resetForm();
  };

  const resetForm = () => {
    setSearchQuery('');
  };

  return (
    <Header>
      <SearchForm onSubmit={onFormSubmit}>
        <SearchBtn type="submit">
          <SearchBtnLabel>Search</SearchBtnLabel>
        </SearchBtn>

        <SearchFormInput
          onChange={onInputChange}
          value={searchQuery}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
