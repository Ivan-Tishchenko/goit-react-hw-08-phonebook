import PropTypes from 'prop-types';
import css from './Section.module.css';

const Section = props => {
  return (
    <section className={css.section}>
      <h2>{props.title}</h2>
      {props.children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string,
};

export default Section;
