import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const BankDetailHook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    setLoading(true)
    try {
      const req = await fetch(`${baseURLProd}GetBankWithdrawDetails`, {
        method: "GET",
        'Content-type': "application/json"
      })
      const res = await req.json()
      // console.log("res data", res);
      setLoading(false)
      setData(res.bankWithdrawUserList)
    } catch (error) {
      console.log(error)
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

export default BankDetailHook
