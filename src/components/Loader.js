
import { Spinner } from "react-bootstrap"
const Loader = ({ load = true }) => {
  return (
    <>
      {console.log('im in', load)}
      {{ load }
        &&
        <div className="loader" style={{ zIndex: '10000' }}>
          <Spinner style={{ zIndex: '10000' }} animation="grow" variant="primary" />
          <Spinner style={{ zIndex: '10000' }} animation="grow" variant="secondary" />
          <Spinner style={{ zIndex: '10000' }} animation="grow" variant="success" />
          <Spinner style={{ zIndex: '10000' }} animation="grow" variant="danger" />
          <Spinner style={{ zIndex: '10000' }} animation="grow" variant="warning" />
          <Spinner style={{ zIndex: '10000' }} animation="grow" variant="info" />
          <Spinner style={{ zIndex: '10000' }} animation="grow" variant="light" />
          <Spinner style={{ zIndex: '10000' }} animation="grow" variant="dark" />
        </div>
      }
    </>
  )
}

export default Loader;