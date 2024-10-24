import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const Modal = ({ modalIsOpen, handleModal, selectedImg }) => {
	return (
		<>
			<Dialog open={modalIsOpen} fullWidth={'fullWidth'} maxWidth={'md'}>
				<IconButton
					onClick={handleModal}
					aria-label='close'
					sx={(theme) => ({
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme.palette.grey[500],
					})}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent sx={{display:'flex', justifyContent:'center'}}>
					<img
						width='800px'
						height='auto'
						src={selectedImg.largeImageURL}
						alt={selectedImg.tags}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};

Modal.propTypes = {
	modalIsOpen: PropTypes.bool.isRequired,
	handleModal: PropTypes.func,
	selectedImg: PropTypes.object,
};
export default Modal;
