import { Box, Button, ImageList, ImageListItem, Stack } from '@mui/material';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, loadMore,handleModal,setModalImg }) => {
	const handleClick = (e) => {
    const selectedImg = images.find((image)=>image.webformatURL === e.target.src)
		setModalImg(selectedImg)
    handleModal()
	};

	return (
		<Stack spacing={4} direction='column'>
			<Box sx={{ width: '98vw', height: 'calc(100% - 90px)' }}>
				<ImageList
					sx={{
						p: '5px',
						width: '100%',
						gridTemplateColumns:
							'repeat(auto-fill,minmax(280px, 1fr))!important',
						overflow: 'hidden',
					}}
				>
					{images.map((image) => (
						<ImageListItem
							onClick={handleClick}
							sx={{
								transition: '.2s',
								'&:hover': {
									cursor: 'pointer',
									scale: '1.05',
									zIndex: '1',
								},
							}}
							key={image.id}
							title={image.tags}
							data-large={image.largeImageURl}
						>
							<img
								src={image.webformatURL}
								alt={image.tags}
								data-large={image.largeImageURl}
							/>
						</ImageListItem>
					))}
				</ImageList>
			</Box>
			<Button
				variant='contained'
				sx={{
					width:200,
          alignSelf:'center'
				}}
				onClick={loadMore}
			>
				Load more images
			</Button>
		</Stack>
	);
};

ImageGallery.propTypes = {
	images: PropTypes.array,
	loadMore: PropTypes.func,
	handleModal: PropTypes.func,
	setModalImg: PropTypes.func,
};
export default ImageGallery;
