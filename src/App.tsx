import { useState } from 'react';
import { Navbar } from './components/Navbar';
import airtelData from './json/airtel_prepaid.json';
import viData from './json/vi_prepaid.json';
import jioData from './json/jio_prepaid.json';
import allData from './json/mega_comparison.json';

type Data = {
  plan_price: number;
  validity: number;
  price_per_day: number;
  monthly_expense: number;
  data_per_day: number;
  total_data: number;
  extras: string;
  carrier: string;
  hero_unlimited?: string;
  unlimited_five_g?: string;
};

function App() {
  const operators = ['All', 'Jio', 'Airtel', 'Vi'];

  const [selectedOperator, setSelectedOperator] = useState('all');

  let data = [];

  switch (selectedOperator) {
    case 'all':
      data = allData as unknown as Array<Data>;
      break;
    case 'jio':
      data = jioData as unknown as Array<Data>;
      break;
    case 'airtel':
      data = airtelData as unknown as Array<Data>;
      break;
    case 'vi':
      data = viData as unknown as Array<Data>;
      break;
    default:
      data = allData as unknown as Array<Data>;
      break;
  }

  return (
    <>
      <Navbar />
      <section className='controls'>
        <div className='container'>
          <div className='dropdown'>
            <label htmlFor='options'>Select an operator</label>
            <select
              id='options'
              name='options'
              onChange={(val) => setSelectedOperator(val.currentTarget.value)}
              value={selectedOperator}
            >
              {operators.map((operator) => {
                return (
                  <option value={operator.toLowerCase()}>{operator}</option>
                );
              })}
            </select>
          </div>
        </div>
      </section>
      <section style={{ marginTop: '10px' }} className='card-container'>
        {data.map((data) => {
          return (
            <div className='card'>
              <div className='card-content'>
                <h2 className='card-title'>{data.carrier}</h2>
                <p className='card-text'>Plan Price: {data.plan_price}₹</p>
                <p className='card-text'>Validity: {data.validity} Days</p>
                {data.total_data ? (
                  <p className='card-text'>
                    Total Data:{' '}
                    {data.total_data ? `${data.total_data}GB` : 'N/A'}
                  </p>
                ) : null}
                {data.data_per_day ? (
                  <p className='card-text'>
                    Data Per Day:{' '}
                    {data.data_per_day
                      ? `${Number(data.data_per_day).toFixed(2)}GB`
                      : 'N/A'}
                  </p>
                ) : null}
                <p className='card-text'>Extras: {data.extras || 'N/A'}</p>
                {data.unlimited_five_g && (
                  <p className='card-text'>
                    Unlimited 5G: {data.unlimited_five_g || 'N/A'}
                  </p>
                )}
                {data.hero_unlimited && (
                  <p className='card-text'>
                    Hero Unlimited: {data.hero_unlimited || 'N/A'}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
