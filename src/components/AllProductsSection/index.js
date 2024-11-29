import {Component} from 'react'
import Cookies from 'js-cookie'
import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
  }

  getProducts = async () => {
      const url = "https://apis.ccbp.in/products"
      const jwtToken = Cookies.get('jwt_token')
      const option = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, option)
      if (response.ok === true){
        const fetchedData = await response.json()
        const updatedData = fetchedData.products.map(product => ({
          brand:product.brand,
          id:product.id,
          imageUrl:product.image_url,
          price:product.price,
          rating:product.rating,
          title:product.title,
        }))
        this.setState({
          productsList: updatedData,
        })
      }
  }

  componentDidMount(){
    this.getProducts()
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
