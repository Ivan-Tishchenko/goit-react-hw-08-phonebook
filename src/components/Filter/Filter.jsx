import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';

export const Filter = props => {
  const dispatch = useDispatch();

  const handleInput = ({ currentTarget: { value } }) => {
    dispatch(setFilter(value.trim()));
  };
  return (
    <>
      <label htmlFor="finder">Find contacts by name</label>
      <input
        onInput={handleInput}
        type="text"
        name="filter"
        id="finder"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </>
  );
};

Filter.propTypes = {
  handleInput: PropTypes.func,
};
