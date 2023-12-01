import React from "react";
import "./JobsPost.css";
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { useNavigate } from "react-router-dom";
function JobsPost({ jobStrings, props }) {
    const navigate = useNavigate();
    const handleOnClickView = (id) => {
        console.log(id);
        navigate("/postedJobProfile", { state: { jobStringId: id } });
      };
    const handleProfile = (id) => {
        console.log(id);
        navigate("/hr/sendProfile", { state: { jobStringId: id } });
    };
    // Check if jobStrings is an object and has properties
    if (typeof jobStrings === "object" && Object.keys(jobStrings).length > 0) {
        // Convert the object properties into an array
        const jobsArray = Object.values(jobStrings);
        console.log(jobsArray)

        return (

            <div>

                {jobsArray.map((job) => (
                    <div key={job.jobStringId} className="jobsPostCard">
                        <div className="jobTitle">
                            <span>{job.clientName}</span>
                            <span>Job vacancies # {job.totalPosition}</span>
                            <label>Sample Resume</label>
                            <button>
                                <FileDownloadRoundedIcon />
                                <span className="buttonText" ><a
                                    className="dResume"
                                    href={job.sampleResume
                                    }
                                >Download Resume</a></span>
                            </button>
                        </div>
                        <div className="jobDescription">
                            <div className="jobDescription-card">
                                <span>Job Descriptions :</span>
                                <div className="description_divider"></div>
                                <div class="description-scroll-container">
                                    <div class="description">
                                        {job.jd.split('.').map((sentence, index) => (
                                            <p key={index}>
                                                {/* Add a dot symbol before each sentence */}
                                                {index === 0 ? '• ' : '  • '}
                                                {sentence.trim()}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="budget">
                            <div className="budgetCard">
                                <div className="budgerCardRow1">
                                    <span className="dateStatus"> Open </span>
                                    <span className="date">{job.openDate}</span>
                                </div>
                                <div className="budgetCard-divider"></div>
                                <div className="budgerCardRow2">
                                    <span className="dateStatus"> Close </span>
                                    <span className="date">{job.closeDate}</span>
                                </div>
                                <div className="budgetCard-divider"></div>
                                <div className="budgerCardRow3">
                                    <h4> Budget </h4>
                                    <span>{job.budget}</span>
                                </div>
                            </div>
                        </div>
                        <div className="taggedEmployees">
                            <div className="taggedEmployees-card">
                                <h6>Tagged Employees</h6>
                                <div className="taggedEmpRow">
                                    <span>Employee Name</span>
                                    <span>Employee ID</span>
                                </div>
                                <div className="taggdeEmp-divider"></div>
                                <div className="taggedEmployees-scroll-container">
                                    <div class="taggedEmployeesList">
                                        {job.taggedEmployees.map((employee) => (
                                            <div key={employee.empId} className="listRow">
                                                <span className="name">{employee.employeeName}</span>
                                                <span className="id">{employee.lancesoftId}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ticketTag">
                            <span className="ticketNumber">
                                <h6>
                                    Ticket No #
                                    <span>{job.jobStringTicket}</span>
                                </h6>
                            </span>
                            <span>
                                <button className="profileButtons" onClick={(e) => {
                                    e.stopPropagation();
                                    handleProfile(props?.data?.jobStringId);
                                    //console.log("emp1");
                                }}>
                                    <span>Create Profiles</span>
                                </button>
                                <button className="profileButtons"  onClick={(e) => {
      e.stopPropagation();
      handleOnClickView(job.jobStringId);
      //console.log("emp1");
    }}>
                                    <span>View Profiles</span>
                                </button>
                            </span>
                        </div>
                    </div>

                ))
                }
            </div>);
    }
    else {
        return <div>No jobs to display.</div>;
    }
}

export default JobsPost;
