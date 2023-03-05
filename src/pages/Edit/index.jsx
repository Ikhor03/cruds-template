import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Input from "../../components/Input";

const Edit = () => {
  const { id } = useParams()
  const url = `http://localhost:5000/api/v1/products/${id}`
  const history = useHistory()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState()
  const [status, setStatus] = useState()

  useEffect(() => {
    getProductById()
  }, [])

  const getProductById = () => {
    axios.get(url)
      .then((response) => {
        setName(response.data.name)
        setPrice(response.data.price)
        setStock(response.data.stock)
        setStatus(response.data.status)
      })
      .catch(err => err)
  }

  const saveChange = (e) => {
    e.preventDefault()
    axios.put(url, { name, price, stock, status })
      .then(() => {
        history.push('/')
        alert(`Perubahan berhasil disimpan`)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={saveChange}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}

          />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" 
            value={price}
            onChange={(e) => { setPrice(e.target.value) }}
          />
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" 
            value={stock}
            onChange={(e) => { setStock(e.target.value) }}
          />
          <Input name="status" type="checkbox" label="Active" 
            value={status}
            onChange={(e) => { setStatus(e.target.value) }}
          />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;