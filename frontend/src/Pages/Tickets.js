import React, { useEffect, useState } from "react";

export default function Tickets() {
  const [show, setshow] = useState(false);
  const [status, setstatus] = useState({
    default: { value: "Pending", color: "orange-500" },
    Pending: { value: "Pending", color: "orange-500" },
    completed: { value: "Completed", color: "green-500" },
    InProgress: { value: "In Progress", color: "cyan-500" },
    Rejected: { value: "Rejected", color: "red-500" },
  });
  const [TicktList, setTicketList] = useState([]);
  // Function to change the default value
  const changeDefaultStatus = (newValue) => {
    setstatus((prevStatus) => ({
      ...prevStatus,
      default: newValue,
    }));
    setshow(false);
  };
  return (
    <div>
      <div className="projects p-20 bg-white rad-10 m-20">
        <h2 className="mt-0 mb-20 ">Tickets List</h2>
        <div className="responsive-table">
          <table className="fs-15 w-full">
            <thead>
              <tr>
                <td>Ticket N</td>
                <td>Name</td>
                <td>Start Date</td>
                <td>service</td>
                <td>Priority</td>
                <td>affected to</td>
                <td>Message</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {TicktList?.map((ticket) => (
                <tr>
                  <td>{ticket.number}</td>
                  <td>{ticket.name} </td>
                  <td>{ticket.date}</td>
                  <td>{ticket.service}</td>

                  <td>
                    <div
                      className={`label btn-shape bg-${ticket.importance.color} text-white`}>
                      {ticket.importance.value}
                    </div>
                  </td>
                  <td className="w-64">
                    <p className="max-h-36 w-full overflow-y-auto">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                    </p>
                  </td>
                  <td>
                    <span
                      className={`label btn-shape bg-${status.default.color} text-white`}
                      onClick={() => setshow(!show)}>
                      {status.default.value}
                    </span>

                    {show && (
                      <ul className="py-3 ">
                        <li
                          className="mb-3 cursor-pointer"
                          onClick={() =>
                            changeDefaultStatus({
                              value: status.completed.value,
                              color: status.completed.color,
                            })
                          }>
                          <span className="label btn-shape bg-green-500 text-white ">
                            Completed
                          </span>
                        </li>
                        <li
                          className="mb-3 cursor-pointer"
                          onClick={() =>
                            changeDefaultStatus({
                              value: status.InProgress.value,
                              color: status.InProgress.color,
                            })
                          }>
                          <span className="label btn-shape bg-cyan-500 text-white ">
                            In Progress
                          </span>
                        </li>
                        <li
                          className="mb-3 cursor-pointer"
                          onClick={() =>
                            changeDefaultStatus({
                              value: status.Rejected.value,
                              color: status.Rejected.color,
                            })
                          }>
                          <span className="label btn-shape bg-red-500 text-white ">
                            Rejected
                          </span>
                        </li>
                        <li
                          className="mb-3 cursor-pointer"
                          onClick={() =>
                            changeDefaultStatus({
                              value: status.Pending.value,
                              color: status.Pending.color,
                            })
                          }>
                          <span className="label btn-shape bg-orange-500 text-white ">
                            Pending
                          </span>
                        </li>
                      </ul>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
