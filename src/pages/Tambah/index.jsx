import axios from 'axios'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import Input from '../../components/Input'
import './index.scss';

const Tambah = () => {

  const url = 'http://localhost:5000/api/v1/products'
  const history = useHistory()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [status, setStatus] = useState()
  const [error, setError] = useState([])

  const validation = () => {
    let formIsValid = true

    if (!name) {
      formIsValid = false
      error.push('nama tidak boleh kosong')
    }

    if (price < 1000000 || undefined) {
      formIsValid = false
      error.push('Minimal harga Rp. 1.000.000')
    }

    if (!stock) {
      formIsValid = false
      error.push('stock tidak boleh kosong')
    }

    return formIsValid
  }

  const saveChanges = async (e) => {
    e.preventDefault()
    try {
      if (validation()) {
        await axios.post(url, {
          name, price, stock, status
        })

        alert(`Berhasil menambahkan ${name} ke dalam list produk`)
        history.push('/')
      } else {
        alert(error[0])
        setError([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={saveChanges}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)} />
          <Input name="status" type="checkbox" label="Active" checked
            value={status}
            onChange={(e) => setStatus(e.target.value)} />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;