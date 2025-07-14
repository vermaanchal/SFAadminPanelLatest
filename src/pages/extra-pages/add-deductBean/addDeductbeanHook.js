import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const AddDeductBeanHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newSearchData, setNewSearchData] = useState([])
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true)

  //---------------fetch data---------------//
  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}Add_DeductBeansUserDetails`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminId: '' }),
      });

      const res = await req.json();
      setLoading(false)
      setData(res.addDeductCoinList);
      setFilter(res.addDeductCoinList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select files to upload');
      return;
    }

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('file', file);
    }

    try {
      if (selectedFiles.length > 0) {
        const response = await fetch(`${baseURLProd}ExcelUpload`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        toast.success(data.message)
        setSelectedFiles("")
        fetchData()
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };
  //--------------------filter------------------//
  useEffect(() => {
    const fetchSearchResults = async () => {
      console.log("fun call");
      if (search && search.length >= 7) {
        const uniqueResults = data.filter((item, index, self) =>
          index === self.findIndex(t => t.userId.toLowerCase() === item.userId.toLowerCase())
        ).filter((item) =>
          item.userId.toLowerCase().includes(search.toLowerCase())
        );

        // setFilter(uniqueResults);
        let aggregatedResults = [];
        try {
          console.log("search validation")
          // for (const row of uniqueResults) {
          // if (row.userId) {
          if (search) {
            const req = await fetch(`${baseURLProd}SearchByUserIdBean`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ userId: search })
            });
            const result = await req.json();
            aggregatedResults.push(result);
          }
          // }
          setNewSearchData(aggregatedResults);
          setShow(true)
        } catch (error) {
          console.log(error)
          setShow(true)
        }
      } else {
        setShow(false);
        setFilter(data);
        setNewSearchData([]);
      }
    };
  if (search && search.length <=7 ) {
    console.log(search);
      const d_filter = data.filter((item)=> item.userId.toLowerCase().includes(search.toLowerCase()) ||  item.name.toLowerCase().includes(search.toLowerCase()))
      console.log("d_filter",d_filter);
     setNewSearchData(d_filter);
  }else{
    fetchSearchResults();
  }
  }, [search, data]);


  //----------------download CSV file-----------------//
  const downloadCSV = () => {
    // Format the data for CSV
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(filter[0]).join(','),
        ...filter.map((row) => Object.values(row).join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "add/deductBean.csv");
    document.body.appendChild(link);
    link.click();
  };

  //-------------select value--------------------

  const handleChange = (e, userId) => {
    const { value } = e.target;
    const validNumberPattern = /^[0-9]*$/;

    // Check if the value contains a plus sign
    if (/[+]/.test(value)) {
      window.alert("Bean Value should not contain a + sign");
      return;
    }
    // Check if the value is a valid number
    if (!validNumberPattern.test(value)) {
      window.alert("Bean Value should be a number only");
      return;
    }

    // Check if the value is 0
    if (parseInt(value, 10) === 0) {
      window.alert("Bean Value should be greater than 0");
      return;
    }

    // Check if the value is a number and doesn't exceed 50 million
    if (!isNaN(value)) {
      const numericValue = parseInt(value, 10);
      if (numericValue > 50000000) {
        window.alert("Bean Value can't exceed 50 Million");
        return;
      }

      // Update the new data if all validations pass
      const newData = newSearchData.map(item => {
        if (item.userId === userId) {
          return { ...item, amount: value };
        }
        return item;
      });

      setFilter(newData);
      setNewSearchData(newData);
    }
  };

  //---------------add beans-------------//
  const handleSubmit = async () => {
    try {
      for (const row of filter) {
        if (!row.userId || !row.amount) {
          alert('please enter the Bean Value');
          return;
        }
        if (row.amount === 0) {
          alert('Bean Value cannot be zero.');
          return;
        }
        if (row.amount > 50000000) {
          alert('Bean Value cannot exceed 50 million.');
          return;
        }
      }
      if (window.confirm("Are you sure to add beans")) {
        for (const row of filter) {
          if (row.userId && row.amount) {
            await fetch(`${baseURLProd}AddBean`, {
              method: 'POST',
              body: JSON.stringify({ userId: row.userId, beanAmount: row.amount }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
        }
        toast.success("Beans Added successfully");
        setSearch("")
        fetchData();
      }
    } catch (error) {
      console.error('Error adding beans coins:', error);
    }
  }

  //---------------add beans-------------//
  const handleDeductBean = async () => {
    try {
      for (const row of filter) {
        if (!row.userId || !row.amount) {
          alert('please enter the Bean amount');
          return;
        }
        const amount = Number(row.amount);
        const availableBeans = Number(row.availableBeans);

        if (amount > availableBeans) {
          alert('Entered amount should not be more than available Beans.');
          return;
        }
      }
      if (window.confirm("Are you sure to deduct beans")) {
        for (const row of filter) {
          if (row.userId && row.amount) {
            await fetch(`${baseURLProd}DeductBean`, {
              method: 'POST',
              body: JSON.stringify({ userId: row.userId, beanAmount: row.amount }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
        }
        toast.success("Beans deducted successfully");
        setSearch("")
        fetchData();
      }
    } catch (error) {
      console.error('Error adding beans coins:', error);
    }
  }
  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };
  return {
    filter, search, setSearch, downloadCSV, setFilter, handleSubmit, handleReset, data, show,
    selectedFiles, handleFileChange, handleUpload, handleChange, handleDeductBean, newSearchData, loading
  }
}

export default AddDeductBeanHook
