import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './index.scss';

const Detail = () => {
  const { id } = useParams()
  const url = `http://localhost:5000/api/v1/products/${id}`
  const [product, setProduct] = useState([])

  useEffect(() => {
    getProductById()
  })

  const getProductById = () => {
    axios.get(url)
      .then((response) => {
        setProduct(response.data)
      })
  }

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody >
          <tr>
            <td>ID</td>
            <td>: {product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {product.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;