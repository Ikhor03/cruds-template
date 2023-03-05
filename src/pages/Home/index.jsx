import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './index.scss';

const Home = () => {
  const url = 'http://localhost:5000/api/v1/products'

  const [products, setProducts] = useState([])
  const [searcValue, setSearchValue] = useState('')

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    axios.get(url)
      .then((response) => {
        setProducts(response.data)
      })
  }

  const deleteProduct = (id, name) => {
    axios.delete(`${url}/${id}`)
      .then(() => {
        getProducts()
        alert(`berhasil menghapus ${name}`)
      })
      .catch((err) => console.log(err))
  }

  const searchHandle = (product) => {
    let isFound = product.name.toLowerCase().includes(searcValue.toLowerCase())
    if (!isFound) return "hide"
  }

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..."
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right ">Price</th>
            <th className="text-right">stock</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, index) => {
              return (
                <tr key={product._id} className={searchHandle(product)}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td className="text-right">{product.price}</td>
                  <td className="text-right">{product.stock}</td>
                  <td className="text-center">
                    <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
                    <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product._id, product.name)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home;