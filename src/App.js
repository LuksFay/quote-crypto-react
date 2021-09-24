import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled';
import imagen from './criptomundo.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner'

const Cotenedor = styled.div `
  max-width:900px;
  margin: 0 auto;
  @media(min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap:2rem
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;
function App() {

  const [moneda, setMoneda] = useState('');
  const [cripto, setcripto] =  useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState({

  })
  useEffect(()=>{
    const cotizarCriptomoneda = async () =>{
      if(moneda==='') return;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
    const resultado = await axios.get(url);

    setCargando(true);


    setTimeout(()=>{
      setCargando(false);


      setResultado(resultado.data.DISPLAY[cripto][moneda])
    },3000)


    }
    cotizarCriptomoneda()
  }, [moneda, cripto]);

  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>




  return (
    <Cotenedor>
      <div>
    <Imagen src={imagen} alt="Imagen Cripto"/>
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>

        <Formulario setMoneda={setMoneda}  setcripto={setcripto}/>

        {componente}
      </div>
    </Cotenedor>    
  );
}

export default App;
