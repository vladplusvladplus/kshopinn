import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import domtoimage from 'dom-to-image';
import { useDispatch, useSelector } from 'react-redux';

export default function RightSection(props) {
  const { inner1Data } = useSelector((state) => state.inner1);
  const { inner3Data } = useSelector((state) => state.inner3);
  const { ipInfo } = useSelector((state) => state.ip);

  const ipdata = ipInfo;
  const [show, setShow] = useState(false);
  const [namewarn, setNamewarn] = useState(false);
  const [phonewarn, setPhonewarn] = useState(false);
  const [uploadbutton, setUploadbutton] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const fileInputRef = useRef(null);

  const router = useRouter();
  const { asPath } = router;
  let searchurl = asPath;
  searchurl = searchurl.substring(0, searchurl.length - 1);
  let parts = searchurl.split('/');

  const dispatch = useDispatch();
  useEffect(() => {
    const fetching = async () => {
      const { fetchIpData } = await import('@/Redux/actions/ipActions');

      dispatch(fetchIpData());
      parts = parts[1] ? parts[1].replace(/-/g, ' ') : '';

      if (parts.length >= 3) setUploadbutton(true);
      else {
        if (inner3Data != null) setUploadbutton(true);
        else setUploadbutton(false);
      }
      if (inner1Data != null) setUploadbutton(false);
    };
    fetching();
  }, [dispatch, inner1Data, inner3Data]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedFiles.length + files.length <= 4) {
      setSelectedFiles([...selectedFiles, ...files]);
      setFileNames([...fileNames, ...files.map((file) => file.name)]);
    } else {
      alert('You can select at most 4 files.');
      fileInputRef.current.value = null;
    }
  };

  const handleFileDelete = (fileName) => {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== fileName));
    setFileNames(fileNames.filter((name) => name !== fileName));
  };

  useEffect(() => {
    if (selectedFiles.length > 4) {
      alert('You can select at most 4 files.');
      fileInputRef.current.value = null;
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (props.data !== null && props.data !== undefined) {
      setUploadbutton(true);
      setGap(15);
    } else setGap(5);
  }, [props]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (ee) => {
    const { name, value } = ee.target;
    if (name === 'name' && value !== '' && !/^[A-Za-z ]+$/.test(value)) {
      ee.target.classList.add('invalid');
      setNamewarn(true);
      return;
    } else {
      ee.target.classList.remove('invalid');
      setNamewarn(false);
    }
    if (name === 'phone' && value !== '' && !/^[\d+\- ]+$/.test(value)) {
      ee.target.classList.add('invalid');
      setPhonewarn(true);
      return;
    } else {
      ee.target.classList.remove('invalid');
      setPhonewarn(false);
    }
    setFormData({ ...formData, [name]: value });
  };

  function warning() {
    alert('You can select at most 4 files.');
  }

  const [gap, setGap] = useState();
  useEffect(() => {
    uploadbutton ? setGap(10) : setGap(18);
  }, [uploadbutton]);

  const dateTime = new Date();
  const tableRef = useRef(null);
  const dateString = dateTime.toLocaleString();
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(`${window.location.origin}${asPath}`);
  }, [asPath]);

  const handleUpload = async () => {
    try {
      const formdata = new FormData();
      const dataUrl = await domtoimage.toPng(tableRef.current);
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      formdata.append('name', formData.name);
      formdata.append('email', formData.email);
      formdata.append('phone', formData.phone);
      formdata.append('country', ipdata.country);
      formdata.append('IP', ipdata.ip);
      formdata.append('url', `${window.location.origin}${asPath}`);
      formdata.append('message', formData.message);
      formdata.append('date', dateString);
      selectedFiles.forEach((file) => {
        formdata.append('files', file);
      });

      const response = await axios.post('/api/sendEmail', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        router.push('/thank-you');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
        setSelectedFiles([]);
        setFileNames([]);
      } else {
        console.error('Error submitting form:', response.data.message);
        alert(response.data.message);
      }

      formdata.delete('files');
      const datasend = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: ipdata.country,
        IP: ipdata.ip,
        url: `${window.location.origin}${asPath}`,
        message: formData.message,
        date: dateString
      };
      const formdataa = new FormData();
      selectedFiles.forEach((file, index) => {
        formdataa.append('files.file', file, file.name);
      });

      formdataa.append('files.table', blob, `${randomNumber}.jpg`);
      formdataa.append('data', JSON.stringify(datasend));
      await fetch(process.env.NEXT_PUBLIC_mainurl + '/api/forms', {
        method: 'POST',
        body: formdataa
      })
        .then((res) => {
          for (const key of formdataa.keys()) {
            formdataa.delete(key);
          }
        })
        .catch((error) => {
          console.error('AxiosError:', error);
        });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div
      className={`w-[100%] gap-[${gap}px] z-0 justify-between shadow-lg bg-[#eeeded] rounded-[15px] flex flex-col items-center shadow-[#514e4e]`}
    >
      <div className="absolute h-[800px] left-[-999999999999px] bg-white text-black">
        <div
          style={{
            padding: '30px',
            borderStyle: 'solid',
            borderColor: '#f60',
            borderWidth: '1px',
            background: 'white'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '200px',
              marginBottom: '0px',
              background: 'white'
            }}
          >
            <div style={{ color: '#000', lineHeight: '25px' }}>
              Dear Admin,
              <br />
              You have a new enquiry.
              <br />
              Please see details:
            </div>
          </div>
          <table
            ref={tableRef}
            style={{
              borderCollapse: 'collapse',
              border: '1px solid black',
              minWidth: '500px',
              background: 'white'
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    width: '40px'
                  }}
                >
                  Name
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {formData.name}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    width: '40px'
                  }}
                >
                  Email
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {formData.email}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    width: '40px'
                  }}
                >
                  Phone
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {formData.phone}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    width: '40px'
                  }}
                >
                  Message
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {formData.message}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
