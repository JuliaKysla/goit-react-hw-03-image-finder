import React from "react"; 
import { Searchbar } from "../searchbar/Searchbar";
import { ImageGallery } from "../imageGallery/ImageGallery";
import s from "./App.module.css"
import Loader from "components/loader/Loader";
import Button from "components/buttom/Button";
import { fetchImages } from "../../services/api";

export class App extends React.Component {

state = {
images: [],
totalHits:0,
loading: false,
error: null,
query:'',
page:1,

}


async componentDidMount() {
  try {
    this.setState({ loading: true });
    const {hits, totalHits} = await fetchImages()
    this.setState({images: hits, totalHits: totalHits})
  } catch (error) {
    this.setState({error})
  }finally {
    this.setState({ loading: false });
  }
}

async componentDidUpdate(prevProps, prevState) {
const {query, page} = this.state;

if(prevState.page !== page || prevState.query !== query) {
  try {
    this.setState({ loading: true });
    const {hits, totalHits} = this.state.query ? await fetchImages({
      page: this.state.page, 
      query: this.state.query}) 
      : await fetchImages({page: this.state.page});
    this.setState(prev => ({images: [...prev.images, ...hits], totalHits: totalHits}))
  } catch (error) {
    this.setState({error})
  } finally {
    this.setState({ loading: false });
  }
}
}


handleSetQuery = query => {

this.setState({query: query, images:[], page: 1})
}
handleLoadMore = () => {
  this.setState(prev => ({page: prev.page +1}))
}



    render() {
      const { images, loading, totalHits } = this.state;
      return (
        <div className={s.App}>
          <Searchbar handleSetQuery={this.handleSetQuery} />
          <ImageGallery images={images} />
          {loading && !images.length &&<Loader />}
          {images.length > 0 && images.length < totalHits ? (
            <Button onLoadMore={this.handleLoadMore} />
          ) : null}
        </div>
      );
    }
  }
