import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AddEmployee from "./pages/addEmployee/AddEmployee";
import EditEmployee from "./pages/addEmployee/EditEmployee";
import PrivateRoutes from "./routes/PrivateRoutes";
// import PromoteEmployee from "./pages/promoteEmployee/PromoteEmployee";
import ExitEmployee from "./pages/exitEmployee/ExitEmployee";
import Finance from "./components/finance/Finance";
import ClientDomestic from "./pages/clientDomestic/ClientDomestic";
import InternalDomestic from "./pages/internalDomestic/InternalDomestic";
import ClientInternational from "./pages/clientinternational/ClientInternational";
import InternalInternational from "./pages/internalInternational/InternalInternational";
import MD from "./pages/md/MD";
import Manager from "./pages/manager/Manager";
import AddClientDetails from "./pages/addClientDetails/AddClientDetails";
import Lead from "./pages/lead/Lead";
import { GeneralManager } from "./pages/generalmanager/GeneralManager";
import { Ch } from "./pages/ch/Ch";
import AddClientNames from "./pages/addClientNames/AddClientNames";
import Register from "./pages/register/Register";
import AddDepartment from "./pages/addDepartment/AddDepartment";
import { AddSubDepartment } from "./pages/addSubDepartment/AddSubDepartment";
import { AddDesignation } from "./pages/addDesignation/AddDesignation";
import { AddEmpType } from "./pages/addEmpType/AddEmpType";
import { AddAddressType } from "./pages/addAddressType/AddAddressType";
import UpdateSupervisor from "./pages/updateSupervisor/UpdateSupervisor";
import { UpdateDesignation } from "./pages/updateDesignation/UpdateDesignation";
import Home from "./pages/home/Home";
import TransferEmployee from "./pages/transferEmployee/TransferEmployee";
import ReleaseRequest from "./pages/releaseRequest/ReleaseRequest";
import EditClientDetails from "./pages/editClientDetails/EditClientDetails";
import Subordinatesupervisior from "./components/subordinatesupervisior/Subordinatesupervisior";
// import DemoteEmployee from "./pages/demoteEmployee/DemoteEmployee";
import AbscondEmployee from "./pages/abscondEmployee/AbscondEmployee";
import ModelComponent from "./modelComponent/ModelComponent";
import EmployeeProfile from "./pages/employeeProfile/EmployeeProfile";
import DeleteEmployee from "./pages/deleteEmployee/DeleteEmployee";
import DataTable from "./components/dataTable/DataTable";
import AddAllowance from "./pages/AddAllowance/AddAllowance";

import TerminateEmployee from "./pages/terminateEmployee/TerminateEmployee";

import PromoteDemote from "./pages/promoteDemote/PromoteDemote";
import ChangePassword from "./pages/changePassword/ChangePassword";

import AssignResponsibilites from "./pages/assignResponsibilites/AssignResponsibilites";

import Recruiters from "./components/Recruiter/Recruiters";
import AllJobs from "./pages/recruiter/AllJobs";
import Jobs from "./pages/jobNotifications/Jobs";
import PostedJobProfiles from "./pages/postedJobProfile/PostedJobProfiles";
import Updatesalary from "./pages/updatesalary/Updatesalary";

import Technology from "./pages/Technology/Technology";
import JobProfiles from "./pages/jobProfiles/JobProfiles";
import TaggedJobs from "./pages/taggedJobs/TaggedJobs";
import SendProfiles from "./pages/sendProfile/SendProfiles";
import GetViewProfiles from "./pages/getViewProfile/GetViewProfiles";

import UpdateInterviewStatus from "./pages/updateInterviewProfile/UpdateInterviewStatus";
import GetInterviewStatus from "./pages/getInterviewStatus/GetInterviewStatus";
import ViewProfiles from "./pages/viewProfile/ViewProfiles";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="transferEmployee"
            element={
              <PrivateRoutes>
                <TransferEmployee />
              </PrivateRoutes>
            }
          />

          <Route
            path="releaseRequest"
            element={
              <PrivateRoutes>
                <ReleaseRequest />
              </PrivateRoutes>
            }
          />

          <Route path="/hr">
            <Route
              index
              element={
                <PrivateRoutes>
                  <Dashboard />
                </PrivateRoutes>
              }
            />

            <Route
              path="datatable"
              element={
                <PrivateRoutes>
                  <DataTable />
                </PrivateRoutes>
              }
            />
            <Route
              path="register"
              element={
                <PrivateRoutes>
                  <Register />
                </PrivateRoutes>
              }
            />
            <Route
              path="addEmployee"
              element={
                <PrivateRoutes>
                  <AddEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="editEmployee"
              element={
                <PrivateRoutes>
                  <EditEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="employeeProfile"
              element={
                <PrivateRoutes>
                  <EmployeeProfile />
                </PrivateRoutes>
              }
            />
            <Route
              path="deleteEmployee"
              element={
                <PrivateRoutes>
                  <DeleteEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="Recruiters"
              element={
                <PrivateRoutes>
                  <Recruiters />
                </PrivateRoutes>
              }
            />
            <Route
              path="taggedJobs"
              element={
                <PrivateRoutes>
                  <TaggedJobs />
                </PrivateRoutes>
              }
            />
            <Route
              path="sendProfile"
              element={
                <PrivateRoutes>
                  <SendProfiles />
                </PrivateRoutes>
              }
            />
            <Route
              path="getViewProfile"
              element={
                <PrivateRoutes>
                  <ViewProfiles />
                </PrivateRoutes>
              }
            />
            <Route
              path="getInterviewStatus"
              element={
                <PrivateRoutes>
                  <GetInterviewStatus />
                </PrivateRoutes>
              }
            />
            <Route
              path="addDepartment"
              element={
                <PrivateRoutes>
                  <AddDepartment />
                </PrivateRoutes>
              }
            />
            <Route
              path="addSubDepartment"
              element={
                <PrivateRoutes>
                  <AddSubDepartment />
                </PrivateRoutes>
              }
            />
            <Route
              path="addDesignation"
              element={
                <PrivateRoutes>
                  <AddDesignation />
                </PrivateRoutes>
              }
            />

            <Route
              path="addAddressType"
              element={
                <PrivateRoutes>
                  <AddAddressType />
                </PrivateRoutes>
              }
            />
            <Route
              path="technology"
              element={
                <PrivateRoutes>
                  <Technology />
                </PrivateRoutes>
              }
            />
            <Route
              path="updateDesignation"
              element={
                <PrivateRoutes>
                  <UpdateDesignation />
                </PrivateRoutes>
              }
            />
            <Route
              path="addEmpType"
              element={
                <PrivateRoutes>
                  <AddEmpType />
                </PrivateRoutes>
              }
            />
            {/* <Route
              path="promoteEmployee"
              element={
                <PrivateRoutes>
                  <PromoteEmployee />
                </PrivateRoutes>
              }
            /> */}

            <Route
              path="AbscondEmployee"
              element={
                <PrivateRoutes>
                  <AbscondEmployee />
                </PrivateRoutes>
              }
            />
            {/* <Route
              path="demoteEmployee"
              element={
                <PrivateRoutes>
                  <DemoteEmployee />
                </PrivateRoutes>
              }
            /> */}
            <Route
              path="promoteDemote"
              element={
                <PrivateRoutes>
                  <PromoteDemote />
                </PrivateRoutes>
              }
            />

            <Route
              path="terminateEmployee"
              element={
                <PrivateRoutes>
                  <TerminateEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="updatesalary"
              element={
                <PrivateRoutes>
                  <Updatesalary />
                </PrivateRoutes>
              }
            />

            <Route
              path="AddAllowance"
              element={
                <PrivateRoutes>
                  <AddAllowance />
                </PrivateRoutes>
              }
            />

            <Route
              path="assignResponsibilities"
              element={
                <PrivateRoutes>
                  <AssignResponsibilites />
                </PrivateRoutes>
              }
            />

            <Route
              path="subordinatesupervisior"
              element={
                <PrivateRoutes>
                  <Subordinatesupervisior />
                </PrivateRoutes>
              }
            />
            <Route
              path="exitEmployee"
              element={
                <PrivateRoutes>
                  <ExitEmployee />
                </PrivateRoutes>
              }
            />
            <Route
              path="updateSupervisorId"
              element={
                <PrivateRoutes>
                  <UpdateSupervisor />
                </PrivateRoutes>
              }
            />
          </Route>
          <Route path="/finance">
            <Route
              index
              element={
                <PrivateRoutes>
                  <Finance />
                </PrivateRoutes>
              }
            />
            <Route
              path="clientDomestic"
              element={
                <PrivateRoutes>
                  <ClientDomestic />
                </PrivateRoutes>
              }
            />
            <Route
              path="internalDomestic"
              element={
                <PrivateRoutes>
                  <InternalDomestic />
                </PrivateRoutes>
              }
            />
            <Route
              path="clientInternational"
              element={
                <PrivateRoutes>
                  <ClientInternational />
                </PrivateRoutes>
              }
            />
            <Route
              path="internalInternational"
              element={
                <PrivateRoutes>
                  <InternalInternational />
                </PrivateRoutes>
              }
            />
          </Route>
          <Route path="modelComponent">
            <Route
              index
              element={
                <PrivateRoutes>
                  <ModelComponent />
                </PrivateRoutes>
              }
            />
          </Route>

          <Route
            path="/md"
            element={
              <PrivateRoutes>
                <MD />
              </PrivateRoutes>
            }
          />
          <Route
            path="/vicepresident"
            element={
              <PrivateRoutes>
                <MD />
              </PrivateRoutes>
            }
          />
          <Route path="/manager">
            <Route
              index
              element={
                <PrivateRoutes>
                  <Manager />
                </PrivateRoutes>
              }
            />
            <Route
              path="addClientDetails"
              element={
                <PrivateRoutes>
                  <AddClientDetails />
                </PrivateRoutes>
              }
            />
            <Route
              path="addClientNames"
              element={
                <PrivateRoutes>
                  <AddClientNames />
                </PrivateRoutes>
              }
            />
            <Route
              path="editClientDetails"
              element={
                <PrivateRoutes>
                  <EditClientDetails />
                </PrivateRoutes>
              }
            />
          </Route>
          <Route
            path="/lead"
            element={
              <PrivateRoutes>
                <Lead />
              </PrivateRoutes>
            }
          />
          <Route
            path="/general_manager"
            element={
              <PrivateRoutes>
                <GeneralManager />
              </PrivateRoutes>
            }
          />
          <Route
            path="/changePassword"
            element={
              <PrivateRoutes>
                <ChangePassword />
              </PrivateRoutes>
            }
          />
          <Route
            path="/ch"
            element={
              <PrivateRoutes>
                <Ch />
              </PrivateRoutes>
            }
          />
          <Route
            path="/recruiter"
            element={
              <PrivateRoutes>
                <AllJobs />
              </PrivateRoutes>
            }
          />
          <Route
            path="/postedJobProfile"
            element={
              <PrivateRoutes>
                <PostedJobProfiles />
              </PrivateRoutes>
            }
          />
          {/* <Route
            path="/jobProfiles"
            element={
              <PrivateRoutes>
                <JobProfiles/>
              </PrivateRoutes>
            }
          /> */}
          <Route
            path="recruiter"
            element={
              <PrivateRoutes>
                <AllJobs />
              </PrivateRoutes>
            }
          />
          <Route
            path="updateInterviewProfile"
            element={
              <PrivateRoutes>
                <UpdateInterviewStatus />
              </PrivateRoutes>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
