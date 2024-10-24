import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = ({ loading }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%)',
      }}>
      <ThreeCircles
        visible={loading}
        height='100'
        width='100'
        color='#1976d2'
        ariaLabel='three-circles-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </Box>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
};
export default Loader;
