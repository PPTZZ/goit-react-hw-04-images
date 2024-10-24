import axios from 'axios';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import SearchBar from './SearchBar';
import { useState, useEffect } from 'react';
import Modal from './Modal';

const END_POINT = 'https://pixabay.com/api/';
const KEY = '45639968-4ab0c3e34d3afa9a12b28af2f';

const App =()=> {

	const [images,setImages]=useState([])
	const [query,setQuery]=useState('')
	const [modalIsOpen, setModalOpen]=useState(false)
	const [modalImg, setModalImg]=useState('')
	const [isLoading,setIsLoading]=useState(false)
	const [page,setPage]=useState(1)
	const [per_page,setPerPage]=useState(12)

	useEffect(()=>{
		try {
			handleLoader();
			
			setImages([...images,...handleFetch()]);
		} catch (err) {
			console.error(err);
		} finally {
			handleLoader();
		}
	},[query,page])


	const handleFetch=async()=>{
		const response = await axios.get(
			`${END_POINT}?key=${KEY}&q=${query}&safesearch=true&page=${page}&per_page=${per_page}`
		);
		return response.data.hits
	}
	

	const handleLoader = () => {
		setIsLoading(!isLoading)
	};

	const handleModal = () => {
		setModalOpen(!modalIsOpen)
	};

	const handleSearch = (data) => {
		setImages([])
		setPage(1)
		setQuery(data);
	};

	const handleImages = (data) => {
		setImages(data);
	};

	const loadMore = () => {
		setPage(page);
	};

	const handleModalImg = (data) => {
		setModalImg(data)
	};

		return (
			<>
				<SearchBar
					onSearch={handleSearch}
					onHandleImages={handleImages}
					getImages={getImages}
					page={page}
					per_page={per_page}
				/>
				<Loader loading={isLoading} />
				{images.length > 0 ? (
					<ImageGallery
						images={images}
						loadMore={loadMore}
						handleModal={handleModal}
						setModalImg={handleModalImg}
					/>
				) : (
					<h1 style={{textAlign:'center', marginTop:'10px'}}>Use the search bar to find images </h1>
				)}
				<Modal
					selectedImg={modalImg}
					modalIsOpen={modalIsOpen}
					handleModal={handleModal}
				/>
			</>
		);
	}

export default App