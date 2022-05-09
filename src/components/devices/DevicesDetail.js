import React, { useEffect, useState } from 'react'
import Modal from "../../modal/Modal"
import history from '../../history'
import ax from '../../ax'
import filterIcons from "../../assets/icons/filter.svg"
const DevicesDetail = (props) => {
  const { id } = props.match.params
  const [device, setDevice] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [sorted, setSorted] = useState("userid")
  const [search, setSearch] = useState("")
  const replaceDate = (op) => {
    return new Date(op.date).getFullYear() + "-" + new Date(op.date).getMonth() + "-" + new Date(op.date).getDate()
  }
  useEffect(() => {
    setLoading(true)
    ax.get(`/devices/${id}`).then(res => {
      setDevice(res.data)
    }).catch(err => {
      setError(err)
      console.log(error)
    }).finally(() => setLoading(false))
  }, [error, id])
  const sorting1 = (srt = "userid", data) => {
    const sortedData = data.sort((a, b) => {
      if (a[srt] < b[srt]) return 1
      if (a[srt] > b[srt]) return -1
      return 0
    })
    if (search === "") return sortedData
    return sortedData.filter((dat) => {
      return ((dat.userid && dat.userid.toString().toLowerCase().includes(search))) ||
        (dat.amount && dat.amount.toFixed(2).toString().toLowerCase().includes(search)) ||
        (dat.energy && dat.energy.toString().toLowerCase().includes(search)) ||
        (replaceDate(dat) && replaceDate(dat).toString().toLowerCase().includes(search)) ||
        (dat.duration && dat.duration.toFixed(2).toString().toLowerCase().includes(search))
    })
  }
  const deleteDevice = async (device) => {
    if(window.confirm("Silmek istediğinize emin misiniz ?")){
      await ax.delete(`/devices/${device._id}`).then(res => {
        history.push("/devices")
      }).catch(err => {alert(err)})
    }
  }
  const renderContent = () => {
    return (
      <div className='w-100'>
        {/* silme butonu */}
        <button
          onClick={() => deleteDevice(device)}
          className='position-absolute px-3 rounded'
          style={{ top: 15, left: 15, color: "white", backgroundColor: "red", border: "none" }}>
          Sil
        </button>

        <div className='d-flex flex-column align-items-center w-100'>
          <ul className="nav nav-tabs border-0 mb-2" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link nav-nav active" id="devices-tab" data-bs-toggle="tab" data-bs-target="#devices" type="button" role="tab" aria-controls="devices" aria-selected="true">Cihazlar</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link nav-nav" id="operations-tab" data-bs-toggle="tab" data-bs-target="#operations" type="button" role="tab" aria-controls="operations" aria-selected="false">İşlemler</button>
            </li>

          </ul>
          <div className="tab-content w-100" id="myTabContent">
            <div className="tab-pane fade show active" id="devices" role="tabpanel" aria-labelledby="devices-tab">
              <label className='mb-2 ms-2'>İzin verilen siteler</label>
              <ol className='list-group list-group-numbered '>
                {device.allowedsites && device.allowedsites.map((allow, i) => {
                  return (
                    <li className='list-group-item' key={i}>
                      <label className='fs-6'> {allow} </label>
                    </li>
                  )
                })}
              </ol>
            </div>
            <div className="tab-pane fade" id="operations" role="tabpanel" aria-labelledby="operations-tab">

              <div className="input-group mb-3">
                <input onChange={(e) => setSearch(e.target.value.toLowerCase())} type="text" className="form-control" placeholder="Operasyonlarda Ara" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Ara</button>
              </div>

              <div className='table-responsive '>
                <table className='table borderless'>
                  <thead className='table-dark'>
                    <tr>
                      <th>#</th>
                      <th className=''>
                        <button onClick={() => setSorted("userid")} style={{ backgroundColor: "transparent", color: "white", border: "none", margin: 0, padding: 0 }}>
                          Kullanıcı id
                        </button>
                        <img width={25} src={filterIcons} alt="sort" />
                      </th>
                      <th>
                        <button onClick={() => setSorted("energy")} style={{ backgroundColor: "transparent", color: "white", border: "none", margin: 0, padding: 0 }}>
                          Enerji
                        </button><
                          img width={25} src={filterIcons} alt="sort" />
                      </th>
                      <th>
                        <button onClick={() => setSorted("duration")} style={{ backgroundColor: "transparent", color: "white", border: "none", margin: 0, padding: 0 }}>
                          Süre
                        </button>
                        <img width={25} src={filterIcons} alt="sort" />
                      </th>
                      <th>
                        <button onClick={() => setSorted("amount")} style={{ backgroundColor: "transparent", color: "white", border: "none", margin: 0, padding: 0 }}>
                          Tutar
                        </button>
                        <img width={25} src={filterIcons} alt="sort" />
                      </th>
                      <th>
                        <button onClick={() => setSorted("date")} style={{ backgroundColor: "transparent", color: "white", border: "none", margin: 0, padding: 0 }}>
                          Tarih
                        </button>
                        <img width={25} src={filterIcons} alt="sort" />
                      </th>


                    </tr>
                  </thead>
                  <tbody>
                    {
                      device.operations && sorting1(sorted, device.operations).map((op, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{op.userid}</td>
                            <td>{op.energy}</td>
                            <td>{op.duration.toFixed(2)}</td>
                            <td>{op.amount.toFixed(2)}</td>
                            <td>{replaceDate(op)}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="tab-pane fade" id="states" role="tabpanel" aria-labelledby="states-tab">...</div> */}
          </div>
        </div>
      </div>
    )
  }
  const renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={() => history.goBack()} className='border rounded py-2 px-3 mx-2'>tamam</button>
        <button onClick={() => history.goBack()} className='border rounded py-2 px-3 mx-2'>iptal</button>
      </React.Fragment>
    )
  }
  return (
    <Modal

      title={device && device.deviceid} Cihaza ait Bilgiler
      onDismiss={() => history.goBack()}
      actions={renderActions()}
      content={loading ? <div>Loading</div> : renderContent()}
    />
  )
}


export default DevicesDetail