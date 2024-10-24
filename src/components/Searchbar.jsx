import { Component } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, InputAdornment, TextField } from '@mui/material';

export default class SearchBar extends Component {
  state = {
    searchWord: '',
  };

  handleKeydown=(e)=> {
    if(e.code !== 'Enter'){
      return
    }
    this.setState({searchWord:''});
    this.setState({searchWord:e.target.value});
    
  }
  componentDidUpdate(prevProps,prevState){
    if (prevState.searchWord !== this.state.searchWord){
      this.props.onSearch(this.state.searchWord)
    }
  }

  render() {
    return (
      <AppBar
        position='static'
        sx={{ height: 70, alignItems: 'center', justifyContent: 'center' }}>
        <TextField
          onKeyDown={this.handleKeydown}
          variant='outlined'
          placeholder='Search'
          sx={{
            width: 250,
            '& .MuiOutlinedInput-root': {
              color: 'text.primary',
              backgroundColor: '#fff',
              fontWeight: 'bold',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#2e2e2e',
                borderWidth: '2px',
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </AppBar>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  page: PropTypes.number,
  per_page: PropTypes.number,
  getImages: PropTypes.func,
  onHandleImages: PropTypes.func,
};
