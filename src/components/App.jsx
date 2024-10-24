import axios from 'axios';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import SearchBar from './SearchBar';
import { Component } from 'react';
import Modal from './Modal';

const END_POINT = 'https://pixabay.com/api/';
// eslint-disable-next-line react-refresh/only-export-components
const KEY = '45639968-4ab0c3e34d3afa9a12b28af2f';

export default class App extends Component {
	async componentDidUpdate(prevProps, prevState) {
		if (
			prevState.filter !== this.state.filter ||
			prevState.page !== this.state.page
		) {
			try {
				this.handleLoader();
				const response = await axios.get(
					`${END_POINT}?key=${KEY}&q=${this.state.filter}&safesearch=true&page=${this.state.page}&per_page=${this.state.per_page}`
				);
				this.setState({
					images: [...this.state.images, ...response.data.hits],
				});
			} catch (err) {
				console.error(err);
			} finally {
				this.handleLoader();
			}
		}
	}

	state = {
		images: [],
		filter: '',
		hasError: false,
		modalIsOpen: false,
		modalImg: '',
		isLoading: false,
		page: 1,
		per_page: 12,
	};

	handleLoader = () => {
		this.setState((prevState) => ({ isLoading: !prevState.isLoading }));
	};

	handleModal = () => {
		this.setState((prevState) => ({ modalIsOpen: !prevState.modalIsOpen }));
	};

	handleSearch = (data) => {
		this.setState({ images: [] });
		this.setState({ page: 1 });
		this.setState({ filter: data });
	};

	handleImages = (data) => {
		this.setState({ images: data });
	};

	loadMore = () => {
		this.setState((prevState) => ({ page: prevState.page + 1 }));
	};

	setModalImg = (data) => {
		this.setState({ modalImg: data });
	};

	render() {
		return (
			<>
				<SearchBar
					onSearch={this.handleSearch}
					onHandleImages={this.handleImages}
					getImages={this.getImages}
					page={this.state.page}
					per_page={this.state.per_page}
				/>
				<Loader loading={this.state.isLoading} />
				{this.state.images.length > 0 ? (
					<ImageGallery
						images={this.state.images}
						loadMore={this.loadMore}
						handleModal={this.handleModal}
						setModalImg={this.setModalImg}
					/>
				) : (
					<h1 style={{textAlign:'center', marginTop:'10px'}}>Use the search bar to find images </h1>
				)}
				<Modal
					selectedImg={this.state.modalImg}
					modalIsOpen={this.state.modalIsOpen}
					handleModal={this.handleModal}
				/>
			</>
		);
	}
}
