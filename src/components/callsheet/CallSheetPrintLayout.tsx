import { CallSheetData } from "../CallSheetGenerator";

interface Props {
  data: CallSheetData;
}

const CallSheetPrintLayout = ({ data }: Props) => {
  return (
    <div className="hidden print:block print-layout">
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }
          
          /* Remove browser-generated headers and footers */
          @page {
            margin: 0.5in 0.5in 0.5in 0.5in;
          }
          
          html, body {
            margin: 0;
            padding: 0;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .print-layout {
            display: block !important;
            color: black;
            background: white;
          }
          
          .print-header {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            gap: 1rem;
            border: 2px solid black;
            padding: 0.5rem;
            margin-bottom: 1rem;
          }
          
          .print-box {
            border: 1px solid black;
            padding: 0.5rem;
          }
          
          .print-section {
            margin-top: 1rem;
            border: 1px solid black;
          }
          
          .print-title {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
          }
          
          .print-table {
            width: 100%;
            border-collapse: collapse;
          }
          
          .print-table th,
          .print-table td {
            border: 1px solid black;
            padding: 4px;
            font-size: 10px;
          }
          
          .print-table th {
            background: #f0f0f0;
            font-weight: bold;
          }
        }
      `}</style>

      {/* Header Section */}
      <div className="print-header">
        {/* Left Box */}
        <div className="print-box">
          {data.productionLogo && (
            <img src={data.productionLogo} alt="Production Logo" style={{ width: '100px', marginBottom: '0.5rem' }} />
          )}
          {data.productionAddress && (
            <div style={{ fontSize: '10px', marginBottom: '0.5rem' }}>{data.productionAddress}</div>
          )}
          <div style={{ fontSize: '10px' }}>
            {data.crewContacts.map((crew, idx) => (
              <div key={idx}>
                <strong>{crew.position}:</strong> {crew.name} {crew.phone}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Box */}
        <div className="print-box text-center">
          <div className="print-title">{data.movieName}</div>
          <div style={{ fontSize: '14px', margin: '0.5rem 0' }}>
            Shoot Day: <strong>{data.shootDay}</strong>
          </div>
          <div style={{ fontSize: '12px' }}>General Crew Call</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{data.generalCrewCall}</div>
          {data.productionNotes && (
            <div style={{ fontSize: '10px', marginTop: '0.5rem' }}>{data.productionNotes}</div>
          )}
        </div>

        {/* Right Box */}
        <div className="print-box">
          <div style={{ fontSize: '10px', marginBottom: '0.5rem' }}>
            <strong>Date:</strong> {new Date(data.shootDate).toLocaleDateString()}
          </div>
          <div style={{ fontSize: '10px', marginBottom: '0.5rem' }}>
            <strong>Weather</strong>
            {data.maxTemp && <div>High: {data.maxTemp}°{data.tempUnit}</div>}
            {data.minTemp && <div>Low: {data.minTemp}°{data.tempUnit}</div>}
            {data.sunrise && <div>Sunrise: {data.sunrise}</div>}
            {data.sunset && <div>Sunset: {data.sunset}</div>}
          </div>
          <div style={{ fontSize: '10px' }}>
            {data.callTimes.map((ct, idx) => (
              <div key={idx}><strong>{ct.name}:</strong> {ct.time}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Schedule Section */}
      {data.schedule.length > 0 && (
        <div className="print-section">
          <div style={{ padding: '0.25rem', background: '#f0f0f0', fontWeight: 'bold' }}>Schedule</div>
          <table className="print-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Scene</th>
                <th>Description</th>
                <th>D/N</th>
                <th>Cast</th>
                <th>Location</th>
                <th>Pages</th>
              </tr>
            </thead>
            <tbody>
              {data.schedule.map((item: any) => (
                <tr key={item.id}>
                  {item.type === 'scene' ? (
                    <>
                      <td>{item.time}</td>
                      <td>{item.sceneNo}</td>
                      <td>{item.description}</td>
                      <td>{item.dn}</td>
                      <td>{item.cast}</td>
                      <td>{item.location}</td>
                      <td>{item.pages}</td>
                    </>
                  ) : item.type === 'banner' ? (
                    <td colSpan={7} style={{ background: '#e0e0e0', fontWeight: 'bold' }}>
                      {item.time} - {item.bannerText}
                    </td>
                  ) : (
                    <td colSpan={7} style={{ fontStyle: 'italic' }}>
                      Company Move at {item.time}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Talent Section */}
      {data.talent.length > 0 && (
        <div className="print-section">
          <div style={{ padding: '0.25rem', background: '#f0f0f0', fontWeight: 'bold' }}>Talent</div>
          <table className="print-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Makeup</th>
                <th>Call Time</th>
                <th>Contact</th>
                <th>SWF</th>
              </tr>
            </thead>
            <tbody>
              {data.talent.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.castId}</td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>{item.makeup}</td>
                  <td>{item.callTime}</td>
                  <td>{item.contact}</td>
                  <td>{item.swf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Locations Section */}
      {data.locations.length > 0 && (
        <div className="print-section">
          <div style={{ padding: '0.25rem', background: '#f0f0f0', fontWeight: 'bold' }}>Locations</div>
          <table className="print-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Set Location</th>
                <th>Parking & Notes</th>
                <th>Nearest Hospital</th>
              </tr>
            </thead>
            <tbody>
              {data.locations.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.number}</td>
                  <td>{item.setLocation}</td>
                  <td>{item.parkingNotes}</td>
                  <td>{item.nearestHospital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Department Notes Section */}
      {data.departmentNotes.length > 0 && (
        <div className="print-section">
          <div style={{ padding: '0.25rem', background: '#f0f0f0', fontWeight: 'bold' }}>Department Notes</div>
          <table className="print-table">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Department</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.departmentNotes.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.department}</td>
                  <td>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Advance Schedule Section */}
      {data.advanceSchedule.length > 0 && (
        <div className="print-section">
          <div style={{ padding: '0.25rem', background: '#f0f0f0', fontWeight: 'bold' }}>Advance Schedule</div>
          <table className="print-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Scene</th>
                <th>Description</th>
                <th>D/N</th>
                <th>Cast</th>
                <th>Location</th>
                <th>Pages</th>
              </tr>
            </thead>
            <tbody>
              {data.advanceSchedule.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.time}</td>
                  <td>{item.sceneNo}</td>
                  <td>{item.description}</td>
                  <td>{item.dn}</td>
                  <td>{item.cast}</td>
                  <td>{item.location}</td>
                  <td>{item.pages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Radio Channels Section */}
      {data.radioChannels.length > 0 && (
        <div className="print-section">
          <div style={{ padding: '0.25rem', background: '#f0f0f0', fontWeight: 'bold' }}>Radio Channels</div>
          <div style={{ padding: '0.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {data.radioChannels.map((item: any) => (
              <div key={item.id} style={{ fontSize: '10px' }}>
                <strong>{item.number}:</strong> {item.department}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallSheetPrintLayout;
