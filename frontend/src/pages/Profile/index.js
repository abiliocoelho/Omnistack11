import React, {useState, useEffect} from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

import api from '../../services/api'
import Logo from '../../assets/logo.svg'
import './styles.css';

export default function Profile() {
  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')
  const [incidents, setIncidents] = useState([])
  const history = useHistory()

  useEffect(()=>{
    async function getIncidents(){
      const response = await api.get('/profile', {headers: {authorization: ongId} })
      setIncidents(response.data)
    }
    getIncidents()
  },[ongId])

  async function handleDeleteIncident(id){
try {
  await api.delete(`/incidents/${id}`,{headers: {authorization: ongId} })
  setIncidents(incidents.filter(incident => incident.id !== id))
} catch (error) {
  alert("Erro ao deletar caso, tente novamente.")
}
  }

  async function handleLogout(){
    localStorage.clear()
    history.push("/")

  }
  return (
    <div className="profile-container">
      <header>
      <img src={Logo} alt="Be The Hero"/>
      <span>Bem vinda, {ongName}</span>
      <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
      <button onClick={handleLogout}>
      <FiPower size={18} color="#e02041"/>
      </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident =>(
          <li key={incident.id}>
          <strong>Caso:</strong>
        <p>{incident.title}</p>
          <strong>Descrição:</strong>
          <p>{incident.description}</p>
          <strong>Valor:</strong>
          <p>{Intl.NumberFormat('pt-BR', {style: "currency", currency: "BRL"}).format(incident.value)}</p>
          <button type="button" onClick={()=>handleDeleteIncident(incident.id)}>
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
