import React,{useState,useEffect} from 'react'
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda'
import useCriptoMoneda from '../hooks/useCriptomoneda'
import axios from 'axios'
import Error from './Error'
const Boton = styled.input `
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66adfe;
    border:none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &: hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`
const Formulario = ({setMoneda, setcripto}) => {

    const[listaCripto, setListaCripto] = useState([]);
    const [error, setError]= useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'}
    ]
    // utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);
    // utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptoMoneda('Elige tu criptomoenda', '', listaCripto);

    useEffect(()=>{
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url)
            setListaCripto(resultado.data.Data);
        }
        consultarAPI()
    }, [])

    const cotizarMoneda = e =>{
        e.preventDefault();

        if(moneda==='' || criptomoneda === ''){
            setError(true);
            return;
        }

        setError(false);
        setMoneda(moneda);
        setcripto(criptomoneda);
    }

    return (
        <form onSubmit={cotizarMoneda}>
            { error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
        <SelectMonedas/>
        <SelectCripto/>
        <Boton type="submit" value="calcular"/>   
        </form>
    );
}
export default Formulario;