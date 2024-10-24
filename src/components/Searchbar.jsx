import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, InputAdornment, TextField } from '@mui/material';

const SearchBar = ({ onSearch }) => {
	const [searchWord, setSearchWord] = useState('');

	useEffect(() => {
		onSearch(searchWord);
	}, [searchWord]);

	const handleKeydown = (e) => {
		if (e.code !== 'Enter') {
			return;
		}
		setSearchWord(e.target.value);
	};

	return (
		<AppBar
			position='static'
			sx={{ height: 70, alignItems: 'center', justifyContent: 'center' }}
		>
			<TextField
				onKeyDown={handleKeydown}
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
};

SearchBar.propTypes = {
	onSearch: PropTypes.func,
	onHandleImages: PropTypes.func,
};

export default SearchBar