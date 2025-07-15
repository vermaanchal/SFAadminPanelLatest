import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const AgentcallRecordshook = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const req = await fetch(`${baseURLProd}GetAgentCallRecords`, {
        method: "GET",
        'Content-type': "application/json"
      })
      const res = await req.json()
      setLoading(false)
      setData(res.callRecords)
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
    data, loading,
  }
}

export default AgentcallRecordshook

