import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

const greeterAddress = '0xb5ED1bD8EfB8326D881417ab3e55874AB8D7f407'; // rinkeby address

function App() {
  const [greeting, setGreetingValue] = useState('');
  const [displayedGreeting, setDisplayedGreeting] = useState('');

  const requestAccount = async () => {
    // requests account info from metamask wallet
    await window.ethereum.request({ method: 'eth_requestAccounts' }); // prompts user to connect
  };

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== 'undefined') {
      // if metamask installed...
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const newGreeting = await contract.greet();
        setDisplayedGreeting(newGreeting)
      } catch (err) {
        alert(err)
      }
    }
  };

  const setGreeting = async () => {
    if (!greeting) return; // checks if user has entered a greeting
    if (typeof window.ethereum !== 'undefined') {
      // makes sure user is connected
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); // user account is the signer
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting); // call `setGreeting` function
      setGreetingValue('');
      await transaction.wait(); // wait for the tx to be mined
      fetchGreeting(); // logs out the new value
    }
  };

  return (
    <div className='App'>
      <br/>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <h1>The current greeting set is: {displayedGreeting}</h1>
      <br/>
      <button onClick={setGreeting}>Set Greeting</button>
      <input
        onChange={(e) => setGreetingValue(e.target.value)} // when (event of) user is typing, local greeting value will be updated live
        placeholder='pls greet me?'
        value={greeting}
      />
    </div>
  );
}

export default App;
