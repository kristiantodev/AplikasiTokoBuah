import React, { Component } from 'react';
import "./App.css"
import { Button, Input} from "./component"
import logo from './buah.JPG';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        buah : [
          {
            nama : "Pisang",
            stok : 9,
            harga : 2000
          },
          {
            nama : "Apel",
            stok : 25,
            harga : 3500
          },
          {
            nama : "Anggur",
            stok : 30,
            harga : 5000
          }
        ],
        buahEdit : {},
        act: 0,
        index: "",
        nama: "",
        stok: "",
        harga: ""
    }
    
  }

  hapusBuah = (indexHapus) => {
    if(window.confirm("Apakah anda yakin ingin menghapus data ini ?")){
      
       var arrayBuah = this.state.buah;
       if (indexHapus !== -1) {
          arrayBuah.splice(indexHapus, 1);
          this.setState({buah: arrayBuah});
       }else{
          alert("Gagal dihapus!!");
       }
  
    }
  
  }
  
  getEdit = (index) => {
    this.setState({
      act: 1,
      index: index
    });
    const editBuah=this.state.buah[index];
  
    this.setState({
      buahEdit: editBuah
    })
  
  }

  reset = ()=> {
    this.setState({
      buahEdit :{}
    })
  }

  setValue = el => {
    this.setState({
        [el.target.name]: el.target.value
    })
}

save = (buahObj) => {
  const { nama, stok, harga } = buahObj
  let newBuah = this.state.buah

  var index = this.state.buah.map(function(e) { return e.nama; }).indexOf(nama);
  console.log(index)

  if (this.state.act === 0) {

  if (nama == "" || stok == "" || harga == "") {
    alert("Data Harus Diisi secara lengkap !!");

  }else if(stok < 0){
     alert("Stok tidak boleh negatif!!")
  }else if(harga < 0){
    alert("Harga tidak boleh negatif!!")
  }else if(index >= 0){
    alert("Nama Buah Sudah Ada!!")  

  }else{

    newBuah.push({
        nama, stok, harga
    })

    this.setState({
        buah : newBuah
    })

    alert('Data Berhasil Disimpan..');

  }

}else{
    let index = this.state.index;
    newBuah[index].nama = nama;
    newBuah[index].stok = stok;
    newBuah[index].harga = harga;

    this.setState({
      buah : newBuah,
      act: 0
    })

    alert('Data Berhasil DiUpdate..');
}
  
}

  render() {

    if("nama" in this.state.buahEdit){
      this.setState({
      nama: this.state.buahEdit.nama,
      stok: this.state.buahEdit.stok,
      harga: this.state.buahEdit.harga
          
      })
      this.reset();
  }

    const { nama, stok, harga} = this.state
    return (
      <>

  <div>
  <div className="header">
    APLIKASI PENJUALAN BUAH
  </div>
  <div id="form">
    <div id="header">
      <img src={logo} className="img" height={75} alt="Logo" />
    </div>
    <div id="tengah">   
      <Input type="text" placeholder="Masukan Nama Buah" name="nama" onChange={this.setValue} value={nama} />
      <Input type="number" placeholder="Masukan Stok Buah" name="stok" onChange={this.setValue} value={stok} />
      <Input type="number" placeholder="Masukan Harga Buah" name="harga" onChange={this.setValue} value={harga} />
      <Button className="button" onClick={() => this.save({ nama, stok, harga})}>Simpan</Button>
    </div>
  </div>
  
  <div id="tabel">
    <div id="header">
      <img src={logo} height={75} alt="Logo" />
    </div>
    <table>
      <thead>
        <tr>
          <th width={30}>No.</th>
          <th>Nama Buah</th>
          <th>Stok Buah Tersisa</th>
          <th>Harga Buah</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
                    this.state.buah.map((b, index) => {
                        return (
<tr key={index}>
      <td>{index+1}</td>
       <td>{b.nama}</td>
       <td>{b.stok}</td>
       <td>{b.harga}</td>
       <td>
           <button style={{ backgroundColor : "#DC143C" }} onClick={() =>{this.hapusBuah(index)} }> Hapus</button>
           <button onClick={() =>{this.getEdit(index)} }> Ubah </button>
       </td>
      </tr>                
                          
                        )
                    })
                }
      </tbody>
    </table>
  </div>
  <div className="footer">
    © 2021 - Kristianto (Java Bootcamp)
  </div>
</div>


</>
    );
  }
}

export default App;

