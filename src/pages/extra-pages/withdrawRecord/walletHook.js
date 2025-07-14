
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const WalletWithdrawHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    setLoading(true)
    try {
      const req = await fetch(`${baseURLProd}GetWalletWithdrawDetails`, {
        method: "GET",
        'Content-type': "application/json"
      })
      const res = await req.json()
      setData(res?.walletWithdrawUserList)
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return {
    data, loading
  }
}

export default WalletWithdrawHook
